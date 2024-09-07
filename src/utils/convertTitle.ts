import { Title, File } from "../types";

// Manage unnecessary string replacement rules in one place
const removeStrings = [
  "[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff66-\uff9f]|[\u4e00-\u9faf]",
  ".*\\.com@",
  ".*\\.org@",
  ".*\\.xyz-",
  "[@|-|_]?[a-zA-Z0-9]+(\\.com|\\.net|\\.tk)[_|-]?",
  "^_",
  "^[0-9]{4}",
  "069-3XPLANET-",
  "Watch18plus-",
  "\\[(.*?)\\]",
  "FHD-",
  "FHD_",
  "fhd",
  "Watch ",
  "-h264",
  "_4K",
  "\\.(?!part|pt|cd).*$",
  "-AV",
  "_www.avcens.download",
  "_JAV.1399.net",
  "_JAV-Video.net",
  "-VIDEOAV.NET",
  "-JAVTEG.NET",
  ".hevc.",
  ".javaddiction",
  "SmallJAV",
  " AVFUL.TK",
  " INCESTING.TK",
  "javnasty.tk",
  " javhd21.com",
  " avfullhd.tk",
  ".1080p",
  ".720p",
  ".480p",
  "\\.HD",
  "-HD",
  "wmv",
  ".wmv",
  "avi",
  ".avi",
  "mp4",
  ".mp4",
  "_",
];

// Function to remove unnecessary strings
const cleanFileName = (fileName: string): string => {
  removeStrings.forEach((str) => {
    const regex = new RegExp(str, "g");
    fileName =
      str === "_" ? fileName.replace(regex, "-") : fileName.replace(regex, "");
  });
  return fileName.toUpperCase();
};

// Process of inserting a hyphen
const insertHyphen = (file: string): string => {
  for (let x = 0; x < file.length; x++) {
    if (/^[a-z]*$/.test(file[x]) && /^[0-9]$/.test(file[x + 1])) {
      let hyphenated = file.slice(0, x + 1) + "-" + file.slice(x + 1);
      return hyphenated.replace(/00(\d{3})/, "$1");
    }
  }
  return file;
};

// Processing to format file names with specific patterns
const formatFileName = (file: string): string => {
  if (/^t28|^t-28|^r18|^r-18/.test(file)) {
    if (/^t28|^t-28/.test(file)) {
      file = file.replace("t-28", "t28");
      return file.includes("-") ? file : file.split("t28").join("T28-");
    } else if (/^r18|^r-18/.test(file)) {
      file = file.replace("r-18", "r18");
      return file.includes("-") ? file : file.split("r18").join("R18-");
    }
  }
  return insertHyphen(file);
};

// Function to extract and manage part number after formatting file name
const extractPartNumber = (
  file: string
): { cleanedFile: string; partNumber: number | null } => {
  let filePartNumber: number | null = null;

  if (new RegExp("[-][0-9]{1,6}Z?\\s?[-]?\\s?[A-Y]$").test(file)) {
    const parts = file.split(new RegExp("([-][0-9]{1,6}Z?)"));
    const cleaned = `${parts[0]}-${parts[1].replace("-", "").padStart(3, "0")}`;
    const asciiP3 = parts[2].replace("-", "").trim().charCodeAt(0);
    if (asciiP3 >= 65 && asciiP3 <= 90) {
      filePartNumber = asciiP3 - 64;
    }
    return { cleanedFile: cleaned, partNumber: filePartNumber };
  }

  if (
    new RegExp("[-][0-9]{1,6}Z?\\s?[-|\\.]\\s?(cd|part|pt)?[-]?\\d{1,3}").test(
      file
    )
  ) {
    const parts = file.split(new RegExp("([-][0-9]{1,6}Z?\\s?[-|\\.])"));
    const cleaned = `${parts[0]}-${parts[1]
      .replace("-", "")
      .replace(".", "")
      .trim()
      .padStart(3, "0")}`;
    const filePartNum = parts[2].trim().replace(/^(cd|part|pt)/, "");
    filePartNumber = /^\d+$/.test(filePartNum)
      ? parseInt(filePartNum, 10)
      : null;
    return { cleanedFile: cleaned, partNumber: filePartNumber };
  }

  return { cleanedFile: file, partNumber: filePartNumber };
};

// main function
export const convertJVTitle = (files: File[]): Title[] => {
  return files.map((file, index) => {
    const originalFileName = file.Name;
    const originalBaseName = file.BaseName;
    const originalDirectory = file.Directory;
    const fileExtension = file.Extension;
    const fullName = file.FullName;
    const fileLength = Math.round((file.Length / 1048576) * 100) / 100;

    // Clean up filenames
    const cleanedFileName = cleanFileName(originalBaseName);

    // Formatting processing such as hyphen insertion
    const formattedFileName = formatFileName(cleanedFileName);

    // Extract part number and get formatted file name
    const { cleanedFile, partNumber } = extractPartNumber(formattedFileName);

    // Generating movie id and content id
    let movieId = cleanedFile;
    let contentId = cleanedFile;
    if (/([a-zA-Z|tT28|rR18]+-\d+[zZ]?[eE]?)$/.test(cleanedFile)) {
      const splitId = cleanedFile.split("-");
      let appendChar = "";
      if (/\D$/.test(splitId[1])) {
        appendChar = splitId[1].slice(-1);
        splitId[1] = splitId[1].replace(/\D$/, "");
      }
      contentId = `${splitId[0]}${splitId[1].padStart(
        5,
        "0"
      )}${appendChar}`.trim();
    }

    // Creating data objects
    return {
      Id: movieId,
      ContentId: contentId,
      FileName: originalFileName,
      BaseName: originalBaseName,
      Directory: originalDirectory,
      FullName: fullName,
      Extension: fileExtension,
      Length: fileLength,
      PartNumber: partNumber,
    };
  });
};
