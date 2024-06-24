export type Options = {
  recurse: boolean;
  depth: number;
  strict: boolean;
  minimumFileSize: number;
  excludedStrings: string[];
  includedExtensions: string[];
};
export type File = {
  FullName: string;
  Name: string;
  BaseName: string;
  Directory: string;
  Extension: string;
  Length: number;
};
export type Title = {
  Id: string;
  ContentId: string;
  FileName: string;
  BaseName: string;
  Directory: string;
  FullName: string;
  Extension: string;
  Length: number;
  PartNumber: null;
};
export type Url = {
  Url: string | null;
  Id: string | null;
  Title: string | null;
};
export type Actress = {
  LastName: null;
  FirstName: null;
  JapaneseName: string;
  ThumbUrl: null;
};
export type Source = "jav321" | "javdb";
export type MovieData = {
  Source: Source;
  Url: string;
  Id: string | null;
  ContentId: string | null;
  Title: string | null;
  AlternateTitle: string | null;
  Description: string | null;
  ReleaseDate: string | null;
  ReleaseYear: string | null;
  Runtime: string | null;
  Series: string | null;
  Maker: string | null;
  Rating: Rating | null;
  Directors: string | null;
  Actress: Actress[] | null;
  Genre: string[] | null;
  CoverUrl: string | null;
  ScreenshotUrl: string[] | null;
  TrailerUrl: string | null;
};
export type Settings = {};
export type Rating = {
  Rating: number;
  Votes: null;
};
export type AggregatedDataOptions = {
  data: MovieData[];
  settings: any;
  fileName?: string;
};

export type AggregatedData = Readonly<{
  Id: string | null;
  ContentId: string | null;
  DisplayName: string | null;
  Title: string | null;
  AlternateTitle: string | null;
  Description: string | null;
  Rating: Rating | null;
  ReleaseDate: string | null;
  ReleaseYear: string | null;
  Runtime: string | null;
  Director: string | null;
  Maker: string | null;
  Label: string | null;
  Series: string | null;
  Tag: string[] | null;
  Tagline: string | null;
  Credits: string[] | null;
  Actress: Actress[] | null;
  Genre: string[] | null;
  CoverUrl: string | null;
  ScreenshotUrl: string[] | null;
  TrailerUrl: string | null;
  OriginalFileName: string;
}>;
