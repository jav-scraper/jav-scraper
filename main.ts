// import { scraper } from "./src/scraper/jav321.mjs";
import { getJVItem } from "./src/utils/getItem";
import { getJav321 } from "./src/fetcher/getJav321";
import { getJavdb } from "./src/fetcher/getJavdb";
import { getJVAggregatedData } from "./src/utils/getJVAggregatedData";
import { settings } from "./src/utils/settings";

(async () => {
  const examplePath = "/mnt/f/JAV/Test";
  const getItemOptions = {
    recurse: true,
    depth: 2,
    strict: true,
    minimumFileSize: 1, // 1 MB
    excludedStrings: ["example", "test"],
    includedExtensions: [".mp4", ".mkv"],
  };
  const results = await getJVItem(examplePath, getItemOptions);
  results.forEach(async (result) => {
    const data = await Promise.all([getJav321(result.Id), getJavdb(result.Id)]);
    const aggregatedData = getJVAggregatedData({ data, settings });
    console.log(aggregatedData);
  });
})();
