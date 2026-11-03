import {newSession} from './model.js';

// Keep the original key so existing sessions survive app updates.
export const STORAGE_KEY = 'poker-ledger-v1';

export function createSessionStorage(getStorage = () => globalThis.localStorage) {
  return {
    load() {
      try {
        const saved = JSON.parse(getStorage().getItem(STORAGE_KEY));
        if (saved?.version === 1 && typeof saved.name === 'string' &&
            Number.isFinite(saved.rate) && saved.rate > 0 &&
            Number.isSafeInteger(saved.tokens) && saved.tokens > 0 &&
            Array.isArray(saved.players) && Array.isArray(saved.events)) {
          return saved;
        }
      } catch { /* Empty, malformed or unavailable storage starts a fresh table. */ }
      return newSession();
    },
    save(session) {
      try {
        getStorage().setItem(STORAGE_KEY, JSON.stringify(session));
        return true;
      } catch {
        return false;
      }
    }
  };
}
