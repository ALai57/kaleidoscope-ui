export interface Group {
  group_id: string;
  display_name: string;
}

export interface GroupMember {
  member_id: string;
  group_id: string;
  email: string;
}

export interface Audience {
  id: string;
  article_id: string;
  group_id: string;
}
