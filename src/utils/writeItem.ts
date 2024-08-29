import fs from "fs";
import { Settings, Title } from "../types";
import fetch from "node-fetch";
import { logger } from "./logger";

type Props = Readonly<{
  id: string | null;
  thumb: string | null;
  poster: string | null;
  screenshotUrl: string[] | null;
  nfoString: string;
  source: Title;
  settings: Settings;
}>;

export const writeJVItem = async ({
  id,
  thumb,
  poster,
  screenshotUrl,
  nfoString,
  source,
  settings,
}: Props): Promise<void> => {
  logger.info({ id, msg: "start writing" });
  const locationOutput = settings["location.output"];
  const outputPath = `${locationOutput}/${id}`;
  const outputFullName = `${outputPath}/${source.FileName}`;
  const outputNfoFullName = `${outputPath}/${source.BaseName}.nfo`;

  fs.mkdirSync(outputPath, { recursive: true });
  fs.renameSync(source.FullName, outputFullName);
  fs.writeFileSync(outputNfoFullName, nfoString);

  if (thumb) {
    const thumbPath = `${outputPath}/thumb.jpg`;
    const result = await fetch(thumb);
    fs.writeFileSync(thumbPath, await result.buffer(), "binary");
  }
  if (poster) {
    const posterPath = `${outputPath}/poster.jpg`;
    const result = await fetch(poster);
    fs.writeFileSync(posterPath, await result.buffer(), "binary");
  }
  if (screenshotUrl) {
    const extrafanartPath = `${outputPath}/extrafanart`;
    fs.mkdirSync(extrafanartPath, { recursive: true });
    screenshotUrl.forEach(async (url, index) => {
      const screenshotPath = `${extrafanartPath}/fanart${index + 1}.jpg`;
      const result = await fetch(url);
      fs.writeFileSync(screenshotPath, await result.buffer(), "binary");
    });
  }
  logger.info({ id, msg: "success writing" });
};
