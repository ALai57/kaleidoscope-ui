import { request } from './client';
import type { Group, GroupMember, Audience } from '../types/group';

export function getGroups(token?: string): Promise<Group[]> {
  return request<Group[]>('/groups', { token });
}

export function addGroup(displayName: string, token?: string): Promise<Group> {
  return request<Group>('/groups', {
    method: 'POST',
    body: { display_name: displayName },
    token,
  });
}

export function deleteGroup(groupId: string, token?: string): Promise<void> {
  return request<void>(`/groups/${groupId}`, { method: 'DELETE', token });
}

export function addGroupMember(
  groupId: string,
  member: Omit<GroupMember, 'member_id' | 'group_id'>,
  token?: string
): Promise<GroupMember> {
  return request<GroupMember>(`/groups/${groupId}/members`, {
    method: 'POST',
    body: member,
    token,
  });
}

export function deleteGroupMember(
  groupId: string,
  memberId: string,
  token?: string
): Promise<void> {
  return request<void>(`/groups/${groupId}/members/${memberId}`, {
    method: 'DELETE',
    token,
  });
}

export function addAudience(
  articleId: string,
  groupId: string,
  token?: string
): Promise<Audience> {
  return request<Audience>('/article-audiences', {
    method: 'PUT',
    body: { article_id: articleId, group_id: groupId },
    token,
  });
}

export function deleteAudience(audienceId: string, token?: string): Promise<void> {
  return request<void>(`/article-audiences/${audienceId}`, { method: 'DELETE', token });
}

export function getAudiencesForArticle(articleId: string, token?: string): Promise<Audience[]> {
  return request<Audience[]>(`/article-audiences?article_id=${encodeURIComponent(articleId)}`, {
    token,
  });
}
