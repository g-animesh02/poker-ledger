# Poker Ledger

A mobile-friendly poker session tracker built with HTML, CSS and JavaScript. No build step, backend, dependencies or account required for session data.

## Deploy on GitHub Pages

The `poker-ledger` folder is the Git repository root. Push its contents, including `docs/`, to GitHub.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select your branch (usually `main`), choose **/docs**, and click **Save**.
4. Wait for GitHub's Pages deployment to finish, then open the URL shown there.

All application files live in `docs/`. Assets and module imports use relative URLs, so project URLs such as `https://username.github.io/poker-ledger/` work without configuration. `.nojekyll` allows the files to be served as a plain static app.

GitHub's instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Data survives refresh

The app automatically saves players, buy-ins, activity timestamps, table settings, final chip counts, and settlement status to **localStorage** under `poker-ledger-v1`. It restores that session when the page loads again, including after refresh or closing and reopening the browser. The storage key is unchanged, so existing sessions on the same website continue to work.

Data belongs to the current browser and website origin. It does not sync between devices or transfer from localhost to GitHub Pages. Clearing site data, private browsing ending, or starting a new session can remove it. Export a CSV to keep a separate record. If browser storage is blocked or full, the app shows a warning.

## Run

Run `node serve.mjs`, then open http://127.0.0.1:5173. Run calculation tests with `node --test`.

## Use

1. Set the rupee value per chip and chips per buy-in, then save settings.
2. Add players and record initial buy-ins or rebuys. Each buy-in is timestamped in the activity log; undo removes a mistaken entry.
3. Select **Final count & settlement** and enter every player's final chips, including zero. Profit/loss is final chips × chip value − total invested.
4. Settle when all issued chips are accounted for. Reopen to make corrections.
5. Export a CSV before starting a new session.

Settings lock after the first buy-in so the value of existing chips stays consistent. Starting a new session clears the current session.
