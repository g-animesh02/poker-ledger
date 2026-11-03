# Poker Ledger

A mobile-friendly poker session tracker built with HTML, CSS and JavaScript. No runtime dependencies or account required for session data.

## Run

Run `node serve.mjs`, then open http://127.0.0.1:5173. Run calculation tests with `node --test`.

## Use

1. Set the rupee value per chip and chips per buy-in, then save settings.
2. Add players and record initial buy-ins or rebuys. Each buy-in is timestamped in the activity log; undo removes a mistaken entry.
3. Select **Final count & settlement** and enter every player's final chips, including zero. Profit/loss is final chips × chip value − total invested.
4. Settle when all issued chips are accounted for. Reopen to make corrections.
5. Export a CSV before starting a new session.

Settings lock after the first buy-in so the value of existing chips stays consistent. Session data is stored in this browser's local storage; it does not sync across devices. Starting a new session clears the current session.
