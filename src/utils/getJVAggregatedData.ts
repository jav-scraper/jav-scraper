import { convertCompilerOptionsFromJson } from "typescript";
import {
  AggregatedDataOptions,
  AggregatedData,
  MetadataPriorityKey,
} from "../types/index";

export function getJVAggregatedData(
  options: AggregatedDataOptions
): AggregatedData {
  const { data, settings, fileName } = options;

  const metadataPriorities = {
    Actress: settings["sort.metadata.priority.actress"],
    AlternateTitle: settings["sort.metadata.priority.alternatetitle"],
    CoverUrl: settings["sort.metadata.priority.coverurl"],
    Description: settings["sort.metadata.priority.description"],
    Director: settings["sort.metadata.priority.director"],
    Genre: settings["sort.metadata.priority.genre"],
    Id: settings["sort.metadata.priority.id"],
    ContentId: settings["sort.metadata.priority.contentid"],
    Label: settings["sort.metadata.priority.label"],
    Maker: settings["sort.metadata.priority.maker"],
    Rating: settings["sort.metadata.priority.rating"],
    ReleaseDate: settings["sort.metadata.priority.releasedate"],
    ReleaseYear: settings["sort.metadata.priority.releaseyear"],
    Runtime: settings["sort.metadata.priority.runtime"],
    Series: settings["sort.metadata.priority.series"],
    ScreenshotUrl: settings["sort.metadata.priority.screenshoturl"],
    Title: settings["sort.metadata.priority.title"],
    TrailerUrl: settings["sort.metadata.priority.trailerurl"],
  };

  const metadataPriorityKeys = Object.keys(
    metadataPriorities
  ) as MetadataPriorityKey[];

  const aggregatedDataObject: AggregatedData = {
    Id: null,
    ContentId: null,
    Title: null,
    AlternateTitle: null,
    Description: null,
    ReleaseDate: null,
    ReleaseYear: null,
    Runtime: null,
    Series: null,
    Maker: null,
    Label: null,
    Rating: null,
    Director: null,
    Actress: null,
    Genre: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
  };

  for (const metadataPriorityKey of metadataPriorityKeys) {
    const metadataPriority = metadataPriorities[metadataPriorityKey];
    for (const priority of metadataPriority) {
      const sourceData = data.find((item) => item.Source === priority);
      if (
        (aggregatedDataObject[metadataPriorityKey] === null ||
          aggregatedDataObject[metadataPriorityKey] === undefined) &&
        sourceData &&
        sourceData[metadataPriorityKey] !== null &&
        sourceData[metadataPriorityKey] !== undefined
      ) {
        aggregatedDataObject[metadataPriorityKey] = sourceData[
          metadataPriorityKey
        ] as any;
      }
    }
  }

  return aggregatedDataObject;
}
