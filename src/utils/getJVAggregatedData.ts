import * as fs from "fs";
import * as path from "path";
import { MovieData } from "../types/index";

type Options = {
  data: MovieData[];
  settings: any;
  ActressPriority?: string[];
  AlternateTitlePriority?: string[];
  CoverUrlPriority?: string[];
  DescriptionPriority?: string[];
  DirectorPriority?: string[];
  GenrePriority?: string[];
  IdPriority?: string[];
  ContentIdPriority?: string[];
  LabelPriority?: string[];
  MakerPriority?: string[];
  RatingPriority?: string[];
  ReleaseDatePriority?: string[];
  RuntimePriority?: string[];
  SeriesPriority?: string[];
  ScreenshotUrlPriority?: string[];
  TitlePriority?: string[];
  TrailerUrlPriority?: string[];
  displayNameFormat?: string;
  firstNameOrder?: string;
  thumbCsv?: boolean;
  thumbCsvPath?: string;
  thumbCsvAlias?: boolean;
  replaceGenre?: boolean;
  genreCsvAutoAdd?: boolean;
  genreCsvPath?: string;
  ignoreGenre?: boolean;
  requiredField?: string;
  translate?: boolean;
  translateModule?: string;
  translateFields?: string[];
  translateLanguage?: string;
  translateDeeplApiKey?: string;
  keepOriginalDescription?: boolean;
  delimiterFormat?: string;
  actressLanguageJa?: boolean;
  thumbCsvAutoAdd?: boolean;
  unknownActress?: boolean;
  idPreference?: string;
  actressAsTag?: boolean;
  preferActressAlias?: boolean;
  replaceTag?: boolean;
  tagCsvAutoAdd?: boolean;
  tagCsvPath?: string;
  fileName?: string;
  mediaInfo?: any;
};

export function getJVAggregatedData(options: Options) {
  let {
    data,
    settings,
    displayNameFormat,
    unknownActress,
    actressAsTag,
    fileName,
  } = options;

  if (settings) {
    Object.assign(options, {
      ActressPriority: settings["sort.metadata.priority.actress"],
      AlternateTitlePriority: settings["sort.metadata.priority.alternatetitle"],
      CoverUrlPriority: settings["sort.metadata.priority.coverurl"],
      DescriptionPriority: settings["sort.metadata.priority.description"],
      DirectorPriority: settings["sort.metadata.priority.director"],
      GenrePriority: settings["sort.metadata.priority.genre"],
      IdPriority: settings["sort.metadata.priority.id"],
      ContentIdPriority: settings["sort.metadata.priority.contentid"],
      LabelPriority: settings["sort.metadata.priority.label"],
      MakerPriority: settings["sort.metadata.priority.maker"],
      RatingPriority: settings["sort.metadata.priority.rating"],
      ReleaseDatePriority: settings["sort.metadata.priority.releasedate"],
      RuntimePriority: settings["sort.metadata.priority.runtime"],
      SeriesPriority: settings["sort.metadata.priority.series"],
      ScreenshotUrlPriority: settings["sort.metadata.priority.screenshoturl"],
      TitlePriority: settings["sort.metadata.priority.title"],
      TrailerUrlPriority: settings["sort.metadata.priority.trailerurl"],
      displayNameFormat: settings["sort.metadata.nfo.displayname"],
      thumbCsv: settings["sort.metadata.thumbcsv"],
      thumbCsvAlias: settings["sort.metadata.thumbcsv.convertalias"],
      replaceGenre: settings["sort.metadata.genrecsv"],
      ignoreGenre: settings["sort.metadata.genre.ignore"],
      translate: settings["sort.metadata.nfo.translate"],
      translateFields: settings["sort.metadata.nfo.translate.field"],
      translateLanguage: settings["sort.metadata.nfo.translate.language"],
      translateDeeplApiKey: settings["sort.metadata.nfo.translate.deeplapikey"],
      keepOriginalDescription:
        settings["sort.metadata.nfo.translate.keeporiginaldescription"],
      delimiterFormat: settings["sort.format.delimiter"],
      actressLanguageJa: settings["sort.metadata.nfo.actresslanguageja"],
      thumbCsvAutoAdd: settings["sort.metadata.thumbcsv.autoadd"],
      genreCsvAutoAdd: settings["sort.metadata.genrecsv.autoadd"],
      firstNameOrder: settings["sort.metadata.nfo.firstnameorder"],
      unknownActress: settings["sort.metadata.nfo.unknownactress"],
      actressAsTag: settings["sort.metadata.nfo.actressastag"],
      tagCsvAutoAdd: settings["sort.metadata.tagcsv.autoadd"],
      replaceTag: settings["sort.metadata.tagcsv"],
      translateModule: settings["sort.metadata.nfo.translate.module"],
      preferActressAlias: settings["sort.metadata.nfo.preferactressalias"],
    });
  }

  const aggregatedDataObject = {
    Id: null,
    ContentId: null,
    DisplayName: null,
    Title: null,
    AlternateTitle: null,
    Description: null,
    Rating: null,
    ReleaseDate: null,
    Runtime: null,
    Director: null,
    Maker: null,
    Label: null,
    Series: null,
    Tag: null,
    Tagline: null,
    Credits: null,
    Actress: null,
    Genre: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
    OriginalFileName: fileName,
    MediaInfo: options.mediaInfo,
  };

  const selectedDataObject = {
    Id: null,
    ContentId: null,
    DisplayName: null,
    Title: null,
    AlternateTitle: null,
    Description: null,
    Rating: null,
    ReleaseDate: null,
    Runtime: null,
    Director: null,
    Maker: null,
    Label: null,
    Series: null,
    Tag: null,
    Tagline: null,
    Credits: null,
    Actress: null,
    Genre: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
    MediaInfo: options.mediaInfo,
  };

  const metadataFields = [
    "Actress",
    "AlternateTitle",
    "CoverUrl",
    "Description",
    "Director",
    "Genre",
    "Id",
    "Label",
    "Maker",
    "Rating",
    "ReleaseDate",
    "Runtime",
    "Series",
    "ScreenshotUrl",
    "Title",
    "TrailerUrl",
    "ContentId",
  ];

  for (const field of metadataFields) {
    const metadataPriority: string[] = options[`${field}Priority`];
    for (const priority of metadataPriority) {
      const sourceData = data.find((item) => item.Source === priority);
      if (
        aggregatedDataObject[field] === null ||
        aggregatedDataObject[field] === undefined
      ) {
        selectedDataObject[field] = priority;
        aggregatedDataObject[field] = sourceData[field];
        console.debug(
          `[${
            data[0].Id
          }] [getJVAggregatedData] [${field} - ${priority}] Set to [${JSON.stringify(
            sourceData[field]
          )}]`
        );
      }
    }
  }

  if (aggregatedDataObject.Title && aggregatedDataObject.Id) {
    aggregatedDataObject.DisplayName = aggregatedDataObject.Title.replace(
      /[_:/\\*?"<>|]/g,
      " "
    );
    if (displayNameFormat === "title.id") {
      aggregatedDataObject.DisplayName = `${aggregatedDataObject.DisplayName} (${aggregatedDataObject.Id})`;
    } else if (displayNameFormat === "id.title") {
      aggregatedDataObject.DisplayName = `${aggregatedDataObject.Id} - ${aggregatedDataObject.DisplayName}`;
    }
  }

  if (
    unknownActress &&
    aggregatedDataObject.Actress.includes("Unknown Actress")
  ) {
    aggregatedDataObject.Actress = aggregatedDataObject.Actress.filter(
      (actress) => actress !== "Unknown Actress"
    );
  }

  if (actressAsTag && aggregatedDataObject.Actress) {
    aggregatedDataObject.Tag = aggregatedDataObject.Tag.concat(
      aggregatedDataObject.Actress
    );
  }

  return aggregatedDataObject;
}
