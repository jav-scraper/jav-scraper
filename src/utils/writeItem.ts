import fs from "fs";
import { Settings, Title } from "../types/index";
import fetch from "node-fetch";

type Props = Readonly<{
  id: string | null;
  thumb: string | null;
  poster: string | null;
  nfoString: string;
  source: Title;
  settings: Settings;
}>;

export const writeJVItem = async ({
  id,
  thumb,
  poster,
  nfoString,
  source,
  settings,
}: Props): Promise<void> => {
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
};
