export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  company?: string | null;
  location?: string | null;
  bio?: string | null;
  blog?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  public_gists?: number;
  hireable?: boolean | null;
}

export interface Repo {
  id: number;
  name: string;
  html_url: string;
}

export interface Alert {
  msg: string;
  type: string;
}
