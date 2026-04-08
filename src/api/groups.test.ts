import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getGroups,
  addGroup,
  deleteGroup,
  addGroupMember,
  deleteGroupMember,
  addAudience,
  deleteAudience,
  getAudiencesForArticle,
} from './groups';
import type { Group, GroupMember, Audience } from '../types/group';

const mockGroup: Group = { group_id: 'g1', display_name: 'Editors' };
const mockMember: GroupMember = { member_id: 'm1', group_id: 'g1', email: 'user@example.com' };
const mockAudience: Audience = { id: 'aud1', article_id: 'a1', group_id: 'g1' };

const server = setupServer(
  http.get('/groups', () => HttpResponse.json([mockGroup])),
  http.post('/groups', () => HttpResponse.json(mockGroup, { status: 201 })),
  http.delete('/groups/g1', () => new HttpResponse(null, { status: 204 })),
  http.post('/groups/g1/members', () => HttpResponse.json(mockMember, { status: 201 })),
  http.delete('/groups/g1/members/m1', () => new HttpResponse(null, { status: 204 })),
  http.put('/article-audiences', () => HttpResponse.json(mockAudience)),
  http.delete('/article-audiences/aud1', () => new HttpResponse(null, { status: 204 })),
  http.get('/article-audiences', () => HttpResponse.json([mockAudience]))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getGroups', () => {
  it('returns groups', async () => {
    const groups = await getGroups();
    expect(groups[0]?.group_id).toBe('g1');
  });
});

describe('addGroup', () => {
  it('creates a group', async () => {
    const group = await addGroup('Editors');
    expect(group.display_name).toBe('Editors');
  });
});

describe('deleteGroup', () => {
  it('deletes a group', async () => {
    await expect(deleteGroup('g1')).resolves.toBeUndefined();
  });
});

describe('addGroupMember', () => {
  it('adds a member', async () => {
    const member = await addGroupMember('g1', { email: 'user@example.com' });
    expect(member.member_id).toBe('m1');
  });
});

describe('deleteGroupMember', () => {
  it('removes a member', async () => {
    await expect(deleteGroupMember('g1', 'm1')).resolves.toBeUndefined();
  });
});

describe('addAudience', () => {
  it('creates an audience', async () => {
    const audience = await addAudience('a1', 'g1');
    expect(audience.id).toBe('aud1');
  });
});

describe('deleteAudience', () => {
  it('removes an audience', async () => {
    await expect(deleteAudience('aud1')).resolves.toBeUndefined();
  });
});

describe('getAudiencesForArticle', () => {
  it('returns audiences', async () => {
    const audiences = await getAudiencesForArticle('a1');
    expect(audiences[0]?.article_id).toBe('a1');
  });
});
