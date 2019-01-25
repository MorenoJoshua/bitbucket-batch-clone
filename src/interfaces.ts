export interface BitBucketUserInfo {
  repositories: RepositoriesItem[];
  user: User;
}


export interface RepositoriesItem {
  scm: string;
  has_wiki: boolean;
  last_updated: string;
  no_forks: boolean;
  created_on: string;
  owner: string;
  logo: string;
  email_mailinglist: string;
  is_mq: boolean;
  size: number;
  read_only: boolean;
  fork_of: null;
  mq_of: null;
  state: string;
  utc_created_on: string;
  website: string;
  description: string;
  has_issues: boolean;
  is_fork: boolean;
  slug: string;
  is_private: boolean;
  name: string;
  language: string;
  utc_last_updated: string;
  no_public_forks: boolean;
  creator: null;
  resource_uri: string;
}
export interface User {
  username: string;
  first_name: string;
  last_name: string;
  display_name: string;
  is_staff: boolean;
  avatar: string;
  resource_uri: string;
  is_team: boolean;
}