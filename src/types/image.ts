export interface ImageVersion {
  src: string;
  width?: number;
  height?: number;
}

export interface Image {
  name: string;
  title: string;
  description: string;
  creator: string;
  created_at: string;
  versions: {
    raw?: ImageVersion;
    thumbnail?: ImageVersion;
    [key: string]: ImageVersion | undefined;
  };
}
