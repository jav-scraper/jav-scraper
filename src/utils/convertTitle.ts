import { Title, File } from "../types";

export const convertJVTitle = (files: File[], strict: boolean = false) => {
  let dataObject: Title[] = [];
  let fileBaseNameUpper: string[] = [];
  let fileBaseNameUpperCleaned = [];
  let fileBaseNameHyphen: string | null = null;
  let fileBaseNameOriginal = files.map(
    (file: { BaseName: string }) => file.BaseName
  );
  // eslint-disable-next-line no-unused-vars
  let filePartNumber = null;

  // Unwanted strings in files to remove
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

  fileBaseNameOriginal.forEach((file: string) => {
    removeStrings.forEach((str) => {
      const regex = new RegExp(str, "g");
      if (str === "_") {
        file = file.replace(regex, "-");
      } else {
        file = file.replace(regex, "");
      }
    });
    fileBaseNameUpper.push(file.toUpperCase());
  });

  fileBaseNameUpper = fileBaseNameUpper.map((file) => {
    if (/^t28|^t-28|^r18|^r-18/.test(file)) {
      if (/^t28|^t-28/.test(file)) {
        file = file.replace("t-28", "t28");
        if (!file.includes("-")) {
          return file.split("t28").join("T28-");
        }
      } else if (/^r18|^r-18/.test(file)) {
        file = file.replace("r-18", "r18");
        if (!file.includes("-")) {
          return file.split("r18").join("R18-");
        }
      }
      return file;
    } else {
      for (let x = 0; x < file.length; x++) {
        if (/^[a-z]*$/.test(file[x]) && /^[0-9]$/.test(file[x + 1])) {
          fileBaseNameHyphen = file.slice(0, x + 1) + "-" + file.slice(x + 1);
          if (/((?!-).)*00\d{3,3}/.test(fileBaseNameHyphen)) {
            fileBaseNameHyphen = fileBaseNameHyphen.split("00").join("");
          }
          break;
        }
      }
      return fileBaseNameHyphen ? fileBaseNameHyphen : file;
    }
  });

  fileBaseNameUpperCleaned = fileBaseNameUpper.map((file) => {
    if (new RegExp("[-][0-9]{1,6}Z?\\s?[-]?\\s?[A-Y]$").test(file)) {
      let parts = file.split(new RegExp("([-][0-9]{1,6}Z?)"));
      let cleaned = parts[0] + "-" + parts[1].replace("-", "").padStart(3, "0");
      let asciiP3 = parts[2].replace("-", "").trim().charCodeAt(0);
      if (asciiP3 > 64 && asciiP3 < 90) {
        filePartNumber = asciiP3 - 64;
      }
      return cleaned;
    } else if (
      new RegExp(
        "[-][0-9]{1,6}Z?\\s?[-|\\.]\\s?(cd|part|pt)?[-]?\\d{1,3}"
      ).test(file)
    ) {
      let parts = file.split(new RegExp("([-][0-9]{1,6}Z?\\s?[-|\\.])"));
      let cleaned =
        parts[0] +
        "-" +
        parts[1].replace("-", "").replace(".", "").trim().padStart(3, "0");
      let filePartNum = parts[2]
        .trim()
        .replace("-", "")
        .replace(".", "")
        .replace(/^(cd|part|pt)/, "");
      if (/^\d+$/.test(filePartNum)) {
        filePartNumber = parseInt(filePartNum, 10);
      }
      return cleaned;
    } else {
      return file;
    }
  });

  fileBaseNameUpperCleaned.forEach((file, index) => {
    let movieId,
      contentId,
      originalFileName,
      originalBaseName,
      originalDirectory,
      fileExtension,
      filePartNumber;

    if (/([a-zA-Z|tT28|rR18]+-\d+[zZ]?[eE]?)$/.test(file)) {
      movieId = file;
      let splitId = file.split("-");
      let appendChar = "";
      if (/\D$/.test(splitId[1])) {
        appendChar = splitId[1].slice(-1);
        splitId[1] = splitId[1].replace(/\D$/, "");
      }
      contentId = splitId[0] + splitId[1].padStart(5, "0") + appendChar;
      contentId = contentId.trim();
    } else {
      movieId = file
        .split(/\d/, 3)
        .filter((part: string) => part !== "")
        .join("-");
      contentId = file;
    }

    if (files.length === 1) {
      originalFileName = files[0].Name;
      originalBaseName = files[0].BaseName;
      originalDirectory = files[0].Directory;
      fileExtension = files[0].Extension;
      filePartNumber = null;
    } else {
      originalFileName = files[index].Name;
      originalBaseName = files[index].BaseName;
      originalDirectory = files[index].Directory;
      fileExtension = files[index].Extension;
      filePartNumber = null;
    }

    if (!new RegExp("([a-zA-Z|tT28]+-\\d+[zZ]?[eE]?)$").test(movieId)) {
      strict = true;
      console.log("Strict");
    }

    if (strict) {
      dataObject.push({
        Id: originalBaseName,
        ContentId: contentId,
        FileName: originalFileName,
        BaseName: originalBaseName,
        Directory: originalDirectory,
        FullName:
          files.length === 1 ? files[0].FullName : files[index].FullName,
        Extension: fileExtension,
        Length: Math.round((files[index].Length / 1048576) * 100) / 100,
        PartNumber: filePartNumber,
      });
    } else {
      dataObject.push({
        Id: movieId,
        ContentId: contentId,
        FileName: originalFileName,
        BaseName: originalBaseName,
        Directory: originalDirectory,
        FullName:
          files.length === 1 ? files[0].FullName : files[index].FullName,
        Extension: fileExtension,
        Length: Math.round((files[index].Length / 1048576) * 100) / 100,
        PartNumber: filePartNumber,
      });
    }
  });

  return dataObject;
};
