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
export type MovieData =
  | {
      Source: Source;
      Url: string;
      Id: string | null;
      Title: string | null;
      Description: string | null;
      ReleaseDate: string | null;
      ReleaseYear: string | null;
      Runtime: string | null;
      Series: string[] | null;
      Maker: string | null;
      Actress: string[] | null;
      Genre: string[] | null;
      CoverUrl: string | null;
      ScreenshotUrl: string[] | null;
    }
  | {};
export type Settings = {};
