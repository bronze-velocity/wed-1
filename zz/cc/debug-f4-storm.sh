#!/usr/bin/env bash
# debug-f4-storm.sh — pinpoint what is spamming F4 on your system.
#
# Runs three monitors in parallel and writes everything to a log:
#   1. libinput debug-events   → which input DEVICE fired the key
#   2. process-spawn watcher   → what new processes appear (e.g. terminals)
#   3. uinput injector check   → what userspace processes can synthesize keys
#
# Usage:
#   chmod +x ./zz/cc/debug-f4-storm.sh
#   sudo ./zz/cc/debug-f4-storm.sh          # runs for 60s by default
#   sudo ./zz/cc/debug-f4-storm.sh 300      # runs for 300s
#
# After it exits, inspect the log it prints at the end.

set -u

DURATION="${1:-60}"
LOG="/tmp/f4-storm-$(date +%Y%m%d-%H%M%S).log"

if [[ $EUID -ne 0 ]]; then
  echo "This script needs root to read /dev/input and trace processes."
  echo "Re-run with: sudo $0 $DURATION"
  exit 1
fi

# --- dependency check ----------------------------------------------------
need() { command -v "$1" >/dev/null 2>&1 || echo "  missing: $1 ($2)"; }
missing=$(
  need libinput   "sudo apt install libinput-tools"
  need lsof       "sudo apt install lsof"
  need ps         "coreutils, should already be present"
)
if [[ -n "$missing" ]]; then
  echo "Missing dependencies:"
  echo "$missing"
  exit 1
fi

echo "=== F4-storm debug session ===" | tee "$LOG"
echo "Started: $(date -Iseconds)"     | tee -a "$LOG"
echo "Duration: ${DURATION}s"          | tee -a "$LOG"
echo "Log file: $LOG"                  | tee -a "$LOG"
echo                                   | tee -a "$LOG"

# --- 1. Snapshot the environment ----------------------------------------
{
  echo "--- INPUT DEVICES (from /proc/bus/input/devices) ---"
  cat /proc/bus/input/devices
  echo
  echo "--- PROCESSES WITH /dev/uinput OPEN (can synthesize input) ---"
  lsof /dev/uinput 2>/dev/null || echo "  none"
  echo
  echo "--- SUSPECT PROCESSES (keyboard-injection tools) ---"
  ps -eo pid,user,cmd | grep -Ei 'xdotool|ydotool|autokey|xkeysnail|keyd|input-remapper|solaar|wtype|dotool' | grep -v grep || echo "  none"
  echo
  echo "--- DESKTOP ENVIRONMENT ---"
  echo "XDG_CURRENT_DESKTOP=${XDG_CURRENT_DESKTOP:-unknown}"
  echo "XDG_SESSION_TYPE=${XDG_SESSION_TYPE:-unknown}"
  echo
} >> "$LOG"

# --- 2. Start monitors ---------------------------------------------------

# 2a. libinput: shows KEY_F4 events tagged with the device that produced them.
#     We filter to keep the log readable.
(
  echo "--- LIBINPUT F4 EVENTS (device + timestamp) ---"
  timeout "$DURATION" libinput debug-events --show-keycodes 2>/dev/null \
    | grep --line-buffered -E 'KEY_F4|device:'
) >> "$LOG" 2>&1 &
PID_LIBINPUT=$!

# 2b. Process spawn watcher: prints any new command line that appears.
#     This will catch terminals, file managers, etc., popping up.
(
  echo "--- NEW PROCESSES (spawned during the window) ---"
  # snapshot current PIDs
  seen=$(mktemp)
  ps -eo pid= | tr -d ' ' | sort > "$seen"
  end=$(( $(date +%s) + DURATION ))
  while (( $(date +%s) < end )); do
    now=$(mktemp)
    ps -eo pid= | tr -d ' ' | sort > "$now"
    comm -13 "$seen" "$now" | while read -r pid; do
      [[ -z "$pid" ]] && continue
      cmd=$(ps -p "$pid" -o cmd= 2>/dev/null)
      [[ -n "$cmd" ]] && echo "$(date +%H:%M:%S.%3N)  pid=$pid  $cmd"
    done
    mv "$now" "$seen"
    sleep 0.2
  done
  rm -f "$seen"
) >> "$LOG" 2>&1 &
PID_SPAWN=$!

# --- 3. Wait --------------------------------------------------------------
echo "Monitoring for ${DURATION}s..."
echo "Reproduce the problem now (leave the machine alone, or focus VS Code, etc.)"
echo "Ctrl-C to stop early."
echo
trap 'kill $PID_LIBINPUT $PID_SPAWN 2>/dev/null; echo; echo "Stopped."; echo "Log: $LOG"; exit 0' INT

wait $PID_LIBINPUT 2>/dev/null
kill $PID_SPAWN 2>/dev/null
wait 2>/dev/null

# --- 4. Summarize --------------------------------------------------------
{
  echo
  echo "--- SUMMARY ---"
  f4_count=$(grep -c 'KEY_F4' "$LOG" || true)
  echo "Total KEY_F4 events seen: $f4_count"
  echo
  echo "Devices that produced F4:"
  # libinput format: "event2  KEYBOARD_KEY  ... KEY_F4"
  # Device line looks like: "-event2  DEVICE_ADDED  Some Device Name"
  # We correlate by walking the log.
  awk '
    /^-event/ && /DEVICE_ADDED/ { name[$1]=$0 }
    /KEY_F4/ {
      # extract event device from the line prefix, e.g. " event5   KEYBOARD_KEY"
      match($0, /event[0-9]+/, m)
      if (m[0]) counts[m[0]]++
    }
    END {
      for (ev in counts) {
        printf "  %s: %d events\n", ev, counts[ev]
      }
    }
  ' "$LOG"
} | tee -a "$LOG"

echo
echo "Done. Full log: $LOG"
echo
echo "Next steps:"
echo "  * If a specific 'event<N>' fired most F4s, look it up in the INPUT DEVICES section"
echo "    at the top of the log to see which physical device it is."
echo "  * If new terminal/file-manager processes appeared during F4 bursts,"
echo "    the storm is being interpreted by a GUI app (e.g. Nautilus opens a"
echo "    terminal at the current folder on F4)."
echo "  * If uinput was open by a userspace process, that process is a suspect"
echo "    even if libinput attributes the events to a virtual device."
