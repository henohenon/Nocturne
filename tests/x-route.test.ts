/**
 * Nocturne - X route classification tests
 */

import { describe, expect, test } from 'bun:test';
import { isFeedPath } from '../src/x-route';

describe('isFeedPath', () => {
  test('home and explore are feeds', () => {
    for (const path of ['/home', '/explore', '/explore/tabs/trending', '/home/']) {
      expect(isFeedPath(path, false)).toBe(true);
    }
  });

  test('everything else is free', () => {
    for (const path of ['/notifications', '/messages', '/i/chat', '/someone', '/someone/status/1', '/search', '/settings/account', '/homeless', '/']) {
      expect(isFeedPath(path, true)).toBe(false);
    }
  });

  test('compose dialogs keep the page underneath', () => {
    expect(isFeedPath('/compose/post', true)).toBe(true);
    expect(isFeedPath('/compose/post', false)).toBe(false);
  });
});
