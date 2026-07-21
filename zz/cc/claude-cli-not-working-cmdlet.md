# Fix: `claude` is not recognized as a cmdlet

PowerShell couldn't find the `claude` executable. On this machine it turned out to be **already installed** — so the error was a stale terminal, not a missing install.

## 1. Confirm whether it's installed

```powershell
Get-Command claude -ErrorAction SilentlyContinue
where.exe claude
```

On this machine this prints — it **is** installed and on PATH:

```
CommandType     Name          Source
-----------     ----          ------
ExternalScript  claude.ps1    C:\Users\ENVY1\AppData\Roaming\npm\...
C:\Users\ENVY1\AppData\Roaming\npm\claude
C:\Users\ENVY1\AppData\Roaming\npm\claude.cmd
```

**If it prints like above → it's installed.** The original "not recognized" was almost certainly a **stale terminal** (opened before the install finished, or before PATH was updated). Just **close and reopen PowerShell** and run `claude` again — that's the whole fix. No reinstall needed.

## 2. Only if it's genuinely missing — install it

Skip this if step 1 already prints paths.

```powershell
npm install -g @anthropic-ai/claude-code
```

Then **close and reopen PowerShell** and try `claude`.

> This project uses pnpm for the app, but the global CLI install via npm is fine — it doesn't touch the repo lockfile.

## 3. `EBUSY: resource busy or locked` during install/update

```
npm ERR! code EBUSY
npm ERR! syscall copyfile
npm ERR! ... claude.exe ... EBUSY: resource busy or locked
```

**Cause:** you're trying to overwrite `claude.exe` while it's still running. Windows locks a running binary. This happens when a Claude Code session, an IDE extension (VS Code / JetBrains), or a background `claude` process has the file open.

**Fix — close everything using it, then retry:**

1. Exit **all** Claude sessions (this terminal included — run the install from a *different*, plain PowerShell window).
2. Close any editor with the Claude extension active (VS Code, JetBrains).
3. Confirm nothing is still holding it:

   ```powershell
   Get-Process claude -ErrorAction SilentlyContinue
   ```

   If it lists a process and you're sure no session is active, stop it:

   ```powershell
   Get-Process claude -ErrorAction SilentlyContinue | Stop-Process -Force
   ```

4. Retry the install/update:

   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```

> **Easier:** if `claude` already runs, you rarely need npm to update it — use the built-in updater instead, from outside a running session:
>
> ```powershell
> claude update
> ```

## 4. If it's installed but still "not recognized" (PATH gap)

Only relevant if step 1 prints nothing. Find the global bin folder:

```powershell
npm config get prefix
```

That folder (here `C:\Users\ENVY1\AppData\Roaming\npm`) must be on PATH. Add it permanently:

```powershell
$npmBin = npm config get prefix
[Environment]::SetEnvironmentVariable(
  "Path",
  [Environment]::GetEnvironmentVariable("Path", "User") + ";$npmBin",
  "User"
)
```

Close and reopen PowerShell afterward.

## 5. Verify

```powershell
claude --version
```

If a version prints, you're fixed.

---

### Notes
- **Restart the terminal** after any install or PATH change — a running shell keeps its old PATH. This was the actual cause here.
- Never update `claude` from inside a running `claude` session on Windows — the `.exe` is locked (EBUSY). Update from a separate terminal or use `claude update`.
- If `npm` itself is "not recognized," install Node.js first (https://nodejs.org), then redo step 2.
