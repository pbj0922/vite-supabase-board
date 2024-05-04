export interface IProfile {
  id: string;
  created_at: string;
  nickname: string;
}

export interface IPost {
  id: number;
  create_at: number;
  title: string;
  content: string;
  profile: IProfile;
}
