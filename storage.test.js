import test from 'node:test';
import assert from 'node:assert/strict';
import {createSessionStorage, STORAGE_KEY} from './docs/storage.js';
import {newSession, playerTotals, settlement} from './docs/model.js';

function browserStorage() {
  const values = new Map();
  return {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value)};
}

test('refresh restores settings, players, buy-in log, final counts and settlement', () => {
  const localStorage = browserStorage();
  const beforeRefresh = createSessionStorage(() => localStorage);
  const session = {...newSession(), name:'Friday poker', rate:2.5, tokens:200,
    players:[{id:'a', name:'Aarav', final:400}, {id:'b', name:'Maya', final:0}],
    events:[{id:'1', playerId:'a', chips:200, amount:500, time:'2026-11-03T12:00:00Z'},
      {id:'2', playerId:'b', chips:200, amount:500, time:'2026-11-03T12:01:00Z'}], closed:true};
  assert.equal(beforeRefresh.save(session), true);
  // Recreate the store just as app startup does following a page refresh.
  const afterRefresh = createSessionStorage(() => localStorage).load();
  assert.deepEqual(afterRefresh, session);
  assert.notEqual(afterRefresh, session);
  assert.equal(playerTotals(afterRefresh, 'a').profit, 500);
  assert.equal(playerTotals(afterRefresh, 'b').profit, -500);
  assert.equal(settlement(afterRefresh).balanced, true);
});

test('previous version-one sessions keep working with the original storage key', () => {
  const localStorage = browserStorage();
  const old = {...newSession(), name:'Existing table'};
  localStorage.setItem('poker-ledger-v1', JSON.stringify(old));
  assert.equal(STORAGE_KEY, 'poker-ledger-v1');
  assert.deepEqual(createSessionStorage(() => localStorage).load(), old);
});

test('empty or malformed data and blocked storage are handled without crashing', () => {
  const localStorage = browserStorage();
  const store = createSessionStorage(() => localStorage);
  assert.deepEqual(store.load(), newSession());
  localStorage.setItem(STORAGE_KEY, '{broken');
  assert.deepEqual(store.load(), newSession());
  localStorage.setItem(STORAGE_KEY, JSON.stringify({version:1}));
  assert.deepEqual(store.load(), newSession());
  const blocked = createSessionStorage(() => {throw new Error('Storage disabled');});
  assert.deepEqual(blocked.load(), newSession());
  assert.equal(blocked.save(newSession()), false);
  const full = createSessionStorage(() => ({setItem(){throw new Error('Quota exceeded');}}));
  assert.equal(full.save(newSession()), false);
});
