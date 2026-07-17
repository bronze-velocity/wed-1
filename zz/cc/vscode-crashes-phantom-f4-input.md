---
name: VS Code crashes + phantom `^[OS` input
date: 2026-07-17
---

# What's happening

The mystery characters in your terminal — `^[OS^[OS^[OS...` — are **not random**. They are the ANSI escape sequence for the **F4 key**:

| Escape sequence | Key |
|---|---|
| `ESC O P` (`^[OP`) | F1 |
| `ESC O Q` (`^[OQ`) | F2 |
| `ESC O R` (`^[OR`) | F3 |
| **`ESC O S` (`^[OS`)** | **F4** |

`^[` is the ESC character (0x1B). So your system is receiving **F4 keypresses on repeat**, thousands of times, from somewhere.

## Why this crashes VS Code windows

Standalone F4 in VS Code is mostly harmless (it's bound to "Find next reference" in some contexts). **But if any modifier ever combines with the storm:**

- **Alt+F4** → closes the focused window (Linux/Windows convention). Whichever VS Code window has focus disappears.
- **Ctrl+F4** → closes the current editor tab.

Even without a modifier, ~1000 F4 events per second will overwhelm the input event loop, freeze the renderer, and Electron will hard-crash the window. This also explains why *multiple* VS Code windows die — whichever one takes focus next inherits the storm.

The `claude` CLI just happens to print the raw bytes because the terminal is in a mode where it doesn't interpret them as a keybinding — so you *see* the evidence there. VS Code silently consumes them.

---

# Diagnosis: find the source

Run these one at a time and watch which one shows the storm.

### 1. Confirm it's really F4

```bash
# In a fresh terminal, run:
showkey -a
# Then wait 10 seconds without touching the keyboard.
# If you see a flood of "^[OS" — confirmed F4 spam.
# Ctrl+D to exit.
```

### 2. Run the debug script (best single command)

`zz/cc/debug-f4-storm.sh` runs three monitors in parallel for 60 seconds and writes a correlated log to `/tmp/f4-storm-<timestamp>.log`:

1. **`libinput debug-events`** — logs every `KEY_F4` event *with the device that produced it*. This is the single most useful signal: if `event7 = "Logitech K380"` fires 90% of the F4s, you know exactly what to unplug.
2. **Process-spawn watcher** — polls `ps` 5×/sec and logs any new process. If terminals or file-manager windows spawn during an F4 burst, the storm is being *interpreted* by a GUI app (e.g. Nautilus opens a terminal at the current folder on F4).
3. **uinput snapshot** — lists processes with `/dev/uinput` open (they can synthesize keys), plus a `ps aux` grep for `xdotool | ydotool | autokey | keyd | xkeysnail | input-remapper | solaar | wtype | dotool`.

Run it:

```bash
sudo zz/cc/debug-f4-storm.sh 60     # 60-second capture
```

If the log shows F4s coming from a virtual/uinput device rather than a real keyboard, the process holding `/dev/uinput` is your culprit.

### 3. Manual hardware/software split (if the script isn't conclusive)

**Unplug all external input devices** (USB keyboard, USB dongles for wireless keyboards/mice, gaming controllers, MIDI devices, drawing tablets, Stream Deck, foot pedals, barcode scanners).

- If the storm **stops** → one of those devices has a stuck F4 or is misconfigured.
- If it **continues** → it's the built-in laptop keyboard or a software source.

### 4. The "terminal auto-opened" clue

If a terminal or file-manager window appears on its own during an F4 burst, that's diagnostic: **F4 in GNOME Files (Nautilus) is bound to "Open Terminal Here."** So the sequence is:

1. Nautilus window is open at some folder (in the reported case: `~/Documents/code/mix/system-apps`).
2. F4 storm fires while Nautilus has focus.
3. Each F4 opens a new terminal at that folder.

This *confirms* the F4 storm is real (not just a display artifact) and tells you Nautilus was the focused window at that moment. It does **not** tell you the source of the F4s — the debug script does.

### 3. If external device: bisect

Plug them back in one at a time, waiting 30 seconds each. The one that restarts the storm is your culprit.

Common offenders:
- Cheap USB KVM switches — often send phantom function keys during handoff.
- Wireless keyboard with dying batteries — the keyboard controller can get stuck.
- Streamdeck / macropad with a misconfigured profile firing F4 repeatedly.
- Game controller mapped to keyboard via Steam Input / AntiMicroX / xboxdrv.

### 4. If internal keyboard: check for stuck key at the hardware level

```bash
sudo evtest
# Pick your keyboard device number.
# Watch output for repeating KEY_F4 events with no key press.
# Ctrl+C to exit.
```

If `evtest` shows F4 events firing on their own, it's the physical keyboard — most likely liquid damage, debris under the F4 key, or a failing membrane/scissor mechanism.

### 5. If internal keyboard: check for software source

```bash
# List processes that inject synthetic key events via uinput:
lsof /dev/uinput 2>/dev/null
# and:
ls -la /proc/*/fd 2>/dev/null | grep uinput
```

Common software culprits:
- **xdotool / ydotool** running in a loop from a script or cron job.
- **AutoKey** with a broken hotkey definition.
- **Solaar** (Logitech Unifying receiver manager) with a bad profile.
- **Input Remapper / xkeysnail / keyd** — check their configs for a mapping that loops back on itself.
- A **Steam** controller profile still active in the background.

Check for these processes:

```bash
ps aux | grep -Ei 'xdotool|ydotool|autokey|xkeysnail|keyd|input-remapper|solaar'
```

---

# Immediate mitigations (while you diagnose)

### A. Kill the modifier-combined variant so windows stop closing

Disable Alt+F4 in VS Code so an F4 storm can't nuke a window even if Alt gets held:

Add to `~/.config/Code/User/keybindings.json`:

```json
[
  { "key": "alt+f4", "command": "-workbench.action.closeWindow" },
  { "key": "ctrl+f4", "command": "-workbench.action.closeActiveEditor" },
  { "key": "f4", "command": "-editor.action.marker.next" }
]
```

This won't fix the root cause, but it stops the crash symptom.

### B. Remap F4 to nothing at the OS level

If you're on X11:

```bash
xmodmap -e "keycode 70 = NoSymbol"
# (keycode 70 is F4 on most Linux keyboards; verify with `xev`)
```

On Wayland, use your compositor's keybinding config (GNOME: `gsettings`, KDE: System Settings → Shortcuts, Sway: `input` block).

Persist across reboots by putting the `xmodmap` line in `~/.xprofile`.

### C. Nuclear option if it's the built-in keyboard

Physically disable just the F4 key by unloading its scancode:

```bash
# Find F4's scancode:
sudo evtest   # press F4 once, note the scancode (usually 0x3E or 62)
# Then, permanently unmap it:
echo 'evdev:atkbd' | sudo tee /etc/udev/hwdb.d/90-f4-disable.hwdb
# ...with a proper KEYBOARD_KEY_3E=reserved entry.
```

(Only do this if you've confirmed it's the internal keyboard AND you don't need F4.)

---

# Recommended order of operations

1. Run `showkey -a` — confirm it's F4.
2. Unplug all external USB input devices — see if it stops.
3. If it stops: bisect USB devices to find the culprit; replace/reflash/reset it.
4. If it continues: `sudo evtest` on the built-in keyboard.
5. If `evtest` shows phantom F4s: the physical key is the problem — clean it, or apply mitigation B/C.
6. If `evtest` is clean: something in userspace is injecting. Check the `ps aux` list above.
7. Regardless of root cause: apply mitigation **A** (the VS Code keybinding override) now so windows stop dying while you investigate.

---

# Why the `claude` CLI itself is fine

The escape sequence appears in your terminal *before* the `claude` prompt because the shell prints whatever bytes arrive on stdin. `claude` is not the source and not affected — closing that terminal and opening a new one won't help, because the input is arriving at the OS level, not from Claude Code.
