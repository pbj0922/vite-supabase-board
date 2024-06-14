export interface IProfile {
  id: string;
  created_at: string;
  nickname: string;
}

export interface IPost {
  id: number;
  created_at: string;
  title: string;
  content: string;
  profile: IProfile;
}
