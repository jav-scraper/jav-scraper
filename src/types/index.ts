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
  PartNumber: number | null;
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
export type Source = "jav321" | "javdb" | "dmm";
export type MovieData = {
  Source: Source;
  Url: string | null;
} & AggregatedData;

export type AggregatedData = {
  Id: string | null;
  ContentId: string | null;
  Title: string | null;
  Description: string | null;
  ReleaseDate: string | null;
  ReleaseYear: string | null;
  Runtime: string | null;
  Series: string | null;
  Maker: string | null;
  Label: string | null;
  Tag: string[] | null;
  Rating: Rating | null;
  Director: string | null;
  Actress: Actress[] | null;
  Genre: string[] | null;
  CoverUrl: string | null;
  ScreenshotUrl: string[] | null;
  TrailerUrl: string | null;
  // Tagline: string | null;
};

export type MetadataPriorityKey =
  | "Id"
  | "ContentId"
  | "Title"
  | "Description"
  | "ReleaseDate"
  | "ReleaseYear"
  | "Runtime"
  | "Series"
  | "Maker"
  | "Label"
  | "Rating"
  | "Director"
  | "Actress"
  | "Genre"
  | "CoverUrl"
  | "ScreenshotUrl"
  | "TrailerUrl";

export type Settings = {
  throttlelimit: number;
  "location.input": string;
  "location.output": string;
  "location.thumbcsv": string;
  "location.genrecsv": string;
  "location.uncensorcsv": string;
  "location.historycsv": string;
  "location.tagcsv": string;
  "location.log": string;
  "scraper.movie.aventertainment": boolean;
  "scraper.movie.aventertainmentja": boolean;
  "scraper.movie.r18dev": boolean;
  "scraper.movie.dmm": boolean;
  "scraper.movie.dmmja": boolean;
  "scraper.movie.jav321ja": boolean;
  "scraper.movie.javbus": boolean;
  "scraper.movie.javbusja": boolean;
  "scraper.movie.javbuszh": boolean;
  "scraper.movie.javdb": boolean;
  "scraper.movie.javdbzh": boolean;
  "scraper.movie.javlibrary": boolean;
  "scraper.movie.javlibraryja": boolean;
  "scraper.movie.javlibraryzh": boolean;
  "scraper.movie.mgstageja": boolean;
  "scraper.movie.tokyohot": boolean;
  "scraper.movie.tokyohotja": boolean;
  "scraper.movie.tokyohotzh": boolean;
  "scraper.option.dmm.scrapeactress": boolean;
  "scraper.option.idpreference": string;
  "scraper.option.addmaleactors": boolean;
  "match.minimumfilesize": number;
  "match.includedfileextension": string[];
  "match.excludedfilestring": string[];
  "match.regex": boolean;
  "match.regex.string": string;
  "match.regex.idmatch": number;
  "match.regex.ptmatch": number;
  "sort.movetofolder": boolean;
  "sort.renamefile": boolean;
  "sort.renamefolderinplace": boolean;
  "sort.maxtitlelength": number;
  "sort.movesubtitles": boolean;
  "sort.create.nfo": boolean;
  "sort.create.nfoperfile": boolean;
  "sort.download.actressimg": boolean;
  "sort.download.thumbimg": boolean;
  "sort.download.posterimg": boolean;
  "sort.download.screenshotimg": boolean;
  "sort.download.trailervid": boolean;
  "sort.download.timeoutduration": number;
  "sort.format.groupactress": boolean;
  "sort.format.delimiter": string;
  "sort.format.file": string;
  "sort.format.folder": string;
  "sort.format.outputfolder": string;
  "sort.format.posterimg": string[];
  "sort.format.thumbimg": string;
  "sort.format.trailervid": string;
  "sort.format.nfo": string;
  "sort.format.screenshotimg": string;
  "sort.format.screenshotimg.padding": number;
  "sort.format.screenshotfolder": string;
  "sort.format.actressimgfolder": string;
  "sort.metadata.nfo.addaliases": boolean;
  "sort.metadata.nfo.mediainfo": boolean;
  "sort.metadata.nfo.addgenericrole": boolean;
  "sort.metadata.nfo.altnamerole": boolean;
  "sort.metadata.nfo.translate": boolean;
  "sort.metadata.nfo.translate.module": string;
  "sort.metadata.nfo.translate.field": string;
  "sort.metadata.nfo.translate.language": string;
  "sort.metadata.nfo.translate.deeplapikey": string;
  "sort.metadata.nfo.translate.keeporiginaldescription": boolean;
  "sort.metadata.nfo.displayname": string;
  "sort.metadata.nfo.firstnameorder": boolean;
  "sort.metadata.nfo.actresslanguageja": boolean;
  "sort.metadata.nfo.unknownactress": boolean;
  "sort.metadata.nfo.originalpath": boolean;
  "sort.metadata.nfo.actressastag": boolean;
  "sort.metadata.nfo.preferactressalias": boolean;
  "sort.metadata.nfo.format.tag": string;
  "sort.metadata.nfo.format.tagline": string;
  "sort.metadata.nfo.format.credits": string[];
  "sort.metadata.thumbcsv": boolean;
  "sort.metadata.thumbcsv.autoadd": boolean;
  "sort.metadata.thumbcsv.convertalias": boolean;
  "sort.metadata.genrecsv": boolean;
  "sort.metadata.genrecsv.autoadd": boolean;
  "sort.metadata.tagcsv": boolean;
  "sort.metadata.tagcsv.autoadd": boolean;
  "sort.metadata.genre.ignore": string[];
  "sort.metadata.requiredfield": string[];
  "sort.metadata.priority.actress": string[];
  "sort.metadata.priority.coverurl": string[];
  "sort.metadata.priority.description": string[];
  "sort.metadata.priority.director": string[];
  "sort.metadata.priority.genre": string[];
  "sort.metadata.priority.id": string[];
  "sort.metadata.priority.contentid": string[];
  "sort.metadata.priority.label": string[];
  "sort.metadata.priority.maker": string[];
  "sort.metadata.priority.posterurl": string[];
  "sort.metadata.priority.releasedate": string[];
  "sort.metadata.priority.releaseyear": string[];
  "sort.metadata.priority.rating": string[];
  "sort.metadata.priority.runtime": string[];
  "sort.metadata.priority.series": string[];
  "sort.metadata.priority.screenshoturl": string[];
  "sort.metadata.priority.title": string[];
  "sort.metadata.priority.trailerurl": string[];
  "emby.url": string;
  "emby.apikey": string;
  "javlibrary.baseurl": string;
  "javlibrary.browser.useragent": string;
  "javlibrary.cookie.__cf_bm": string;
  "javlibrary.cookie.cf_clearance": string;
  "javlibrary.cookie.session": string;
  "javlibrary.cookie.userid": string;
  "javdb.cookie.session": string;
  "proxy.enabled": boolean;
  "proxy.host": string;
  "proxy.username": string;
  "proxy.password": string;
  "web.favorites.genre": string[];
  "web.favorites.tag": string[];
  "web.sort.recurse": boolean;
  "web.sort.interactive": boolean;
  "web.sort.update": boolean;
  "web.sort.force": boolean;
  "web.sort.preview": boolean;
  "web.sort.recursedepth": number;
  "web.sort.confirm": boolean;
  "web.sort.manualsearch.aventertainment": boolean;
  "web.sort.manualsearch.aventertainmentja": boolean;
  "web.sort.manualsearch.dmm": boolean;
  "web.sort.manualsearch.dmmja": boolean;
  "web.sort.manualsearch.jav321ja": boolean;
  "web.sort.manualsearch.javbus": boolean;
  "web.sort.manualsearch.javbusja": boolean;
  "web.sort.manualsearch.javbuszh": boolean;
  "web.sort.manualsearch.javdb": boolean;
  "web.sort.manualsearch.javdbzh": boolean;
  "web.sort.manualsearch.javlibrary": boolean;
  "web.sort.manualsearch.javlibraryja": boolean;
  "web.sort.manualsearch.javlibraryzh": boolean;
  "web.sort.manualsearch.mgstageja": boolean;
  "web.sort.manualsearch.r18dev": boolean;
  "web.sort.manualsearch.tokyohot": boolean;
  "web.sort.manualsearch.tokyohotja": boolean;
  "web.sort.manualsearch.tokyohotzh": boolean;
  "web.theme": "light" | "dark";
  "admin.log": boolean;
  "admin.log.level": string;
  "admin.updates.check": boolean;
};
export type Rating = {
  Rating: string;
  Votes: string;
};
export type AggregatedDataOptions = {
  data: MovieData[];
  settings: Settings;
};
