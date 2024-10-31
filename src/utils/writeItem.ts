import fs from "fs";
import { Settings, Title } from "../types";
import fetch from "node-fetch";
import { logger, cropImage } from "./";

type Props = Readonly<{
  thumb: string | null;
  screenshotUrl: string[] | null;
  nfoString: string;
  source: Title;
  settings: Settings;
}>;

export const writeJVItem = async ({
  thumb,
  screenshotUrl,
  nfoString,
  source,
  settings,
}: Props): Promise<void> => {
  logger.debug({ id: source.Id, msg: "start writing" });
  const locationOutput = settings["location.output"];
  const outputPath = `${locationOutput}/${source.Id}`;
  const outputFullName = `${outputPath}/${source.Id}${source.Extension}`;
  const outputNfoFullName = `${outputPath}/${source.Id}.nfo`;

  fs.mkdirSync(outputPath, { recursive: true });
  fs.renameSync(source.FullName, outputFullName);
  fs.writeFileSync(outputNfoFullName, nfoString);

  if (thumb) {
    const thumbPath = `${outputPath}/thumb.jpg`;
    const posterPath = `${outputPath}/poster.jpg`;
    const result = await fetch(thumb);
    fs.writeFileSync(thumbPath, await result.buffer(), "binary");
    await cropImage(thumbPath, posterPath);
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
  logger.debug({ id: source.Id, msg: "success writing" });
};
