export interface Membership {
  membership_id: string;
  membership_created_at: string;
  alias: string | null;
  email: string;
}

export interface Group {
  group_id: string;
  display_name: string;
  memberships?: Membership[];
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
