import { AggregatedData } from "../types";
import { logger } from "./logger";

function convertNfoChar(str: string | null) {
  if (str === null || str === undefined) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "(")
    .replace(/>/g, ")")
    .replace(/\//g, "-");
}

export function getJVNfo({
  Id,
  Title,
  Description,
  Rating,
  ReleaseDate,
  ReleaseYear,
  Runtime,
  Director,
  Maker,
  Series,
  Actress,
  Genre,
  PosterUrl,
  CoverUrl,
  Tag,
  // Tagline,
  // Credits,
  TrailerUrl,
}: AggregatedData) {
  logger.debug({ msg: "start generate nfo" });
  let nfoString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<movie>
    <title>${Id}-${convertNfoChar(Title)}</title>
    <originaltitle>${convertNfoChar(Title)}</originaltitle>
    <id>${Id}</id>
    <premiered>${ReleaseDate}</premiered>
    <year>${ReleaseYear}</year>
    <director>${convertNfoChar(Director)}</director>
    <studio>${convertNfoChar(Maker)}</studio>
    <rating>${Rating?.Rating || ""}</rating>
    <votes>${Rating?.Votes || ""}</votes>
    <plot>${convertNfoChar(Description)}</plot>
    <runtime>${convertNfoChar(Runtime)}</runtime>
    <trailer>${convertNfoChar(TrailerUrl)}</trailer>
    <mpaa>XXX</mpaa>
    <set>${convertNfoChar(Series)}</set>
    <poster>${PosterUrl}</poster>;
    <thumb>${CoverUrl}</thumb>\n`;

  (Tag || []).forEach((item: any) => {
    item = convertNfoChar(item);
    nfoString += `    <tag>${item}</tag>\n`;
  });

  // (Credits || []).forEach((item: any) => {
  //   item = convertNfoChar(item);
  //   nfoString += `    <credits>${item}</credits>\n`;
  // });

  (Genre || []).forEach((item) => {
    item = convertNfoChar(item);
    nfoString += `    <genre>${item}</genre>\n`;
  });

  (Actress || []).forEach((actor) => {
    const altName = null;

    nfoString += `    <actor>
        <name>${actor.JapaneseName}</name>
        <altname>${altName}</altname>
        <thumb>${actor.ThumbUrl}</thumb>\n`;

    nfoString += `    </actor>\n`;
  });

  nfoString += `</movie>`;
  logger.debug({ msg: "success generate nfo" });
  return nfoString;
}
