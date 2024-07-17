import { getJVItem } from "./src/utils/getItem";
import { getJav321 } from "./src/fetcher/getJav321";
import { getJavdb } from "./src/fetcher/getJavdb";
import { getJVAggregatedData } from "./src/utils/getJVAggregatedData";
import { getJVNfo } from "./src/utils/getJVNfo";
import { settings } from "./src/utils/settings";
import { writeJVItem } from "./src/utils/writeItem";

(async () => {
  const options = {
    recurse: true,
    depth: 2,
    strict: true,
    minimumFileSize: 1, // 1 MB
    excludedStrings: ["example", "test"],
    includedExtensions: [".mp4", ".mkv"],
  };
  const sources = await getJVItem({ options, settings });
  sources.forEach(async (source) => {
    const data = await Promise.all([getJav321(source.Id), getJavdb(source.Id)]);
    const aggregatedData = getJVAggregatedData({ data, settings });
    const nfoString = getJVNfo(aggregatedData);
    await writeJVItem({
      id: aggregatedData.Id,
      thumb: aggregatedData.CoverUrl,
      poster: aggregatedData.PosterUrl,
      screenshotUrl: aggregatedData.ScreenshotUrl,
      nfoString,
      source,
      settings,
    });
  });
})();
