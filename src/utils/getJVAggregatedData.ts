import * as fs from "fs";
import * as path from "path";
import { MovieData } from "../types/index";

type Options = {
  data: MovieData[];
  settings: any;
  actressPriority?: string[];
  alternateTitlePriority?: string[];
  coverUrlPriority?: string[];
  descriptionPriority?: string[];
  directorPriority?: string[];
  genrePriority?: string[];
  idPriority?: string[];
  contentIdPriority?: string[];
  labelPriority?: string[];
  makerPriority?: string[];
  ratingPriority?: string[];
  releaseDatePriority?: string[];
  runtimePriority?: string[];
  seriesPriority?: string[];
  screenshotUrlPriority?: string[];
  titlePriority?: string[];
  trailerUrlPriority?: string[];
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
    actressPriority,
    alternateTitlePriority,
    coverUrlPriority,
    descriptionPriority,
    directorPriority,
    genrePriority,
    idPriority,
    contentIdPriority,
    labelPriority,
    makerPriority,
    ratingPriority,
    releaseDatePriority,
    runtimePriority,
    seriesPriority,
    screenshotUrlPriority,
    titlePriority,
    trailerUrlPriority,
    displayNameFormat,
    firstNameOrder,
    thumbCsv,
    // thumbCsvPath = path.join(__dirname, "jvThumbs.csv"),
    thumbCsvAlias,
    replaceGenre,
    genreCsvAutoAdd,
    // genreCsvPath = path.join(__dirname, "jvGenres.csv"),
    ignoreGenre,
    requiredField,
    translate,
    translateModule,
    translateFields,
    translateLanguage,
    translateDeeplApiKey,
    keepOriginalDescription,
    delimiterFormat,
    actressLanguageJa,
    thumbCsvAutoAdd,
    unknownActress,
    idPreference,
    actressAsTag,
    preferActressAlias,
    replaceTag,
    tagCsvAutoAdd,
    // tagCsvPath = path.join(__dirname, "jvTags.csv"),
    fileName,
  } = options;

  if (settings) {
    Object.assign(options, {
      actressPriority: settings["sort.metadata.priority.actress"],
      alternateTitlePriority: settings["sort.metadata.priority.alternatetitle"],
      coverUrlPriority: settings["sort.metadata.priority.coverurl"],
      descriptionPriority: settings["sort.metadata.priority.description"],
      directorPriority: settings["sort.metadata.priority.director"],
      genrePriority: settings["sort.metadata.priority.genre"],
      idPriority: settings["sort.metadata.priority.id"],
      contentIdPriority: settings["sort.metadata.priority.contentid"],
      labelPriority: settings["sort.metadata.priority.label"],
      makerPriority: settings["sort.metadata.priority.maker"],
      ratingPriority: settings["sort.metadata.priority.rating"],
      releaseDatePriority: settings["sort.metadata.priority.releasedate"],
      runtimePriority: settings["sort.metadata.priority.runtime"],
      seriesPriority: settings["sort.metadata.priority.series"],
      screenshotUrlPriority: settings["sort.metadata.priority.screenshoturl"],
      titlePriority: settings["sort.metadata.priority.title"],
      trailerUrlPriority: settings["sort.metadata.priority.trailerurl"],
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
      // avDanyu: settings["scraper.option.addmaleactors"],
      preferActressAlias: settings["sort.metadata.nfo.preferactressalias"],
    });

    // if (settings["location.genrecsv"]) {
    //   genreCsvPath = settings["location.genrecsv"];
    // }
    // if (settings["location.thumbcsv"]) {
    //   thumbCsvPath = settings["location.thumbcsv"];
    // }
    // if (settings["location.tagcsv"]) {
    //   tagCsvPath = settings["location.tagcsv"];
    // }
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
    const metadataPriority = options[`${field.toLowerCase()}Priority`];
    console.log(`${field.toLowerCase()}Priority`, metadataPriority);
    for (const priority of metadataPriority) {
      const sourceData = data.find((item) => item.Source === priority);
      console.log(sourceData);

      if (aggregatedDataObject[field] === null) {
        selectedDataObject[field] = priority;
        if (field === "AlternateTitle") {
          aggregatedDataObject[field] = sourceData.Title;
        } else if (field === "Id") {
          if (options.idPreference === "contentid") {
            aggregatedDataObject[field] = sourceData.ContentId;
          } else {
            aggregatedDataObject[field] = sourceData.Id;
          }
        } else if (field === "Actress") {
          console.log(sourceData);
          if (sourceData.Actress === null) {
            aggregatedDataObject[field] = null;
          } else {
            aggregatedDataObject[field] = Array.isArray(sourceData.Actress)
              ? sourceData.Actress
              : [sourceData.Actress];
          }
        } else {
          aggregatedDataObject[field] = sourceData[field];
        }
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

  // if (options.avDanyu) {
  //   const maleActors = await getAVDanyuData(aggregatedDataObject.ContentId);
  //   if (maleActors && maleActors.Actors) {
  //     aggregatedDataObject.Actress = aggregatedDataObject.Actress.concat(
  //       maleActors.Actors
  //     );
  //   }
  // }

  // if (thumbCsv) {
  //   if (fs.existsSync(thumbCsvPath)) {
  //     let actressCsv;
  //     try {
  //       actressCsv = JSON.parse(fs.readFileSync(thumbCsvPath, "utf8"));
  //     } catch (error) {
  //       console.error(
  //         `Error occurred when importing thumbnail csv [${thumbCsvPath}]: ${error}`
  //       );
  //     }

  //     if (thumbCsvAutoAdd) {
  //       try {
  //         actressCsv = JSON.parse(fs.readFileSync(thumbCsvPath, "utf8"));
  //       } catch (error) {
  //         console.error(
  //           `Error occurred when importing thumbnail csv [${thumbCsvPath}]: ${error}`
  //         );
  //       }
  //     }

  //     const convertedActresses = [];
  //     if (actressCsv && aggregatedDataObject.Actress) {
  //       for (const actress of aggregatedDataObject.Actress) {
  //         const matchActress = actressCsv.find(
  //           (a) => a.JapaneseName === actress
  //         );
  //         if (matchActress) {
  //           if (thumbCsvAlias && matchActress.Alias !== null) {
  //             convertedActresses.push(matchActress.Alias);
  //           } else {
  //             convertedActresses.push(matchActress.FullName);
  //           }
  //         } else {
  //           convertedActresses.push(actress);
  //         }
  //       }
  //       aggregatedDataObject.Actress = convertedActresses;
  //     }
  //   }
  // }

  // if (replaceGenre) {
  //   if (fs.existsSync(genreCsvPath)) {
  //     let genreCsv;
  //     try {
  //       genreCsv = JSON.parse(fs.readFileSync(genreCsvPath, "utf8"));
  //     } catch (error) {
  //       console.error(
  //         `Error occurred when importing genre csv [${genreCsvPath}]: ${error}`
  //       );
  //     }

  //     if (genreCsvAutoAdd) {
  //       try {
  //         genreCsv = JSON.parse(fs.readFileSync(genreCsvPath, "utf8"));
  //       } catch (error) {
  //         console.error(
  //           `Error occurred when importing genre csv [${genreCsvPath}]: ${error}`
  //         );
  //       }
  //     }

  //     const convertedGenres = [];
  //     if (genreCsv && aggregatedDataObject.Genre) {
  //       for (const genre of aggregatedDataObject.Genre) {
  //         const matchGenre = genreCsv.find((g) => g.Genre === genre);
  //         if (matchGenre) {
  //           convertedGenres.push(matchGenre.Replace);
  //         } else {
  //           convertedGenres.push(genre);
  //         }
  //       }
  //       aggregatedDataObject.Genre = convertedGenres;
  //     }
  //   }
  // }

  // if (replaceTag) {
  //   if (fs.existsSync(tagCsvPath)) {
  //     let tagCsv;
  //     try {
  //       tagCsv = JSON.parse(fs.readFileSync(tagCsvPath, "utf8"));
  //     } catch (error) {
  //       console.error(
  //         `Error occurred when importing tag csv [${tagCsvPath}]: ${error}`
  //       );
  //     }

  //     if (tagCsvAutoAdd) {
  //       try {
  //         tagCsv = JSON.parse(fs.readFileSync(tagCsvPath, "utf8"));
  //       } catch (error) {
  //         console.error(
  //           `Error occurred when importing tag csv [${tagCsvPath}]: ${error}`
  //         );
  //       }
  //     }

  //     const convertedTags = [];
  //     if (tagCsv && aggregatedDataObject.Tag) {
  //       for (const tag of aggregatedDataObject.Tag) {
  //         const matchTag = tagCsv.find((t) => t.Tag === tag);
  //         if (matchTag) {
  //           convertedTags.push(matchTag.Replace);
  //         } else {
  //           convertedTags.push(tag);
  //         }
  //       }
  //       aggregatedDataObject.Tag = convertedTags;
  //     }
  //   }
  // }

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

  // if (translate && translateFields.length > 0 && translateLanguage) {
  //   const translateObject = {
  //     SourceLanguage: "JA",
  //     TargetLanguage: translateLanguage,
  //     ApiKey: translateDeeplApiKey,
  //     Description: aggregatedDataObject.Description,
  //     TrailerUrl: aggregatedDataObject.TrailerUrl,
  //     Title: aggregatedDataObject.Title,
  //   };
  //   const translatedData = await translateMetadata(
  //     translateObject,
  //     translateFields
  //   );
  //   Object.assign(aggregatedDataObject, translatedData);
  // }

  // if (actressLanguageJa) {
  //   aggregatedDataObject.Actress = aggregatedDataObject.Actress.map(
  //     (actress) => {
  //       return convertActressToJapanese(actress);
  //     }
  //   );
  // }

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

  // if (preferActressAlias) {
  //   aggregatedDataObject.Actress = aggregatedDataObject.Actress.map(
  //     (actress) => {
  //       const alias = getActressAlias(actress);
  //       return alias ? alias : actress;
  //     }
  //   );
  // }

  return aggregatedDataObject;
}
