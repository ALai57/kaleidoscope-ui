import { describe, it, expect } from 'vitest';
import { TIMELINE_ENTRIES } from './timeline';
import { SKILLS } from './skills';

describe('TIMELINE_ENTRIES', () => {
  it('has at least 13 entries', () => {
    expect(TIMELINE_ENTRIES.length).toBeGreaterThanOrEqual(13);
  });

  it('each entry has a heading', () => {
    for (const entry of TIMELINE_ENTRIES) {
      expect(typeof entry.heading).toBe('string');
      expect(entry.heading.length).toBeGreaterThan(0);
    }
  });

  it('has an entry for Freshpaint', () => {
    const found = TIMELINE_ENTRIES.some((e) => e.heading.includes('Freshpaint'));
    expect(found).toBe(true);
  });

  it('has an entry for Northwestern University', () => {
    const found = TIMELINE_ENTRIES.some((e) => e.heading.includes('Northwestern'));
    expect(found).toBe(true);
  });
});

describe('SKILLS', () => {
  it('has exactly 2 sections', () => {
    expect(SKILLS.length).toBe(2);
  });

  it('first section is languages', () => {
    expect(SKILLS[0]?.title).toBe('Languages I use');
  });

  it('second section is tools', () => {
    expect(SKILLS[1]?.title).toBe('Tools I use');
  });

  it('each section has at least one group', () => {
    for (const section of SKILLS) {
      expect(section.groups.length).toBeGreaterThan(0);
    }
  });
});
