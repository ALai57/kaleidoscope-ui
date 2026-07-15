import { describe, it, expect } from 'vitest';
import { catalogCode, originLabel, originColorKey } from './catalog';

describe('catalogCode', () => {
  it('maps known kinds to 3-letter codes', () => {
    expect(catalogCode('podcast')).toBe('POD');
    expect(catalogCode('article')).toBe('ART');
    expect(catalogCode('newsletter')).toBe('NWS');
    expect(catalogCode('paper')).toBe('PPR');
  });
  it('falls back to the uppercased first 3 letters for unknown kinds', () => {
    expect(catalogCode('zine')).toBe('ZIN');
  });
});

describe('origin metadata', () => {
  it('labels trusted vs novel and picks distinct categorical slots', () => {
    expect(originLabel('trusted')).toBe('TRUSTED');
    expect(originLabel('novel')).toBe('NEW SOURCE');
    expect(originColorKey('trusted')).toBe(1); // purple #9085E9
    expect(originColorKey('novel')).toBe(2);   // amber  #C98500
  });
});
