import { getDmm, getJav321, getJavdb } from "./src/fetcher";
import {
  getJVAggregatedData,
  getJVItem,
  getJVNfo,
  settings,
  writeJVItem,
} from "./src/utils";

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
    const hoge = await getDmm(source.Id);
    // const data = await Promise.all([getJav321(source.Id), getJavdb(source.Id)]);
    // const aggregatedData = getJVAggregatedData({ data, settings });
    // const nfoString = getJVNfo(aggregatedData);
    // await writeJVItem({
    //   id: aggregatedData.Id,
    //   thumb: aggregatedData.CoverUrl,
    //   poster: aggregatedData.PosterUrl,
    //   screenshotUrl: aggregatedData.ScreenshotUrl,
    //   nfoString,
    //   source,
    //   settings,
    // });
  });
})();
