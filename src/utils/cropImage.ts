import sharp from "sharp";
import * as fs from "fs";
import { logger } from "./";

// Function to crop the image
export async function cropImage(
  coverPath: string,
  coverCroppedPath: string
): Promise<void> {
  try {
    // Check if the input file exists
    if (!fs.existsSync(coverPath)) {
      throw new Error(`Cover image not found at path: ${coverPath}`);
    }

    // Load the image
    const originalCover = sharp(coverPath);
    const metadata = await originalCover.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Unable to retrieve image dimensions");
    }

    const width = metadata.width;
    const height = metadata.height;

    // Define cropping dimensions
    const left = width / 1.895734597;
    const top = 0;
    const right = width;
    const bottom = height;

    // Crop the image
    const croppedCover = await originalCover.extract({
      left: Math.round(left),
      top: Math.round(top),
      width: Math.round(right - left),
      height: Math.round(bottom - top),
    });

    // Save the cropped image
    await croppedCover.toFile(coverCroppedPath);
    logger.info(`Cropped image saved to: ${coverCroppedPath}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
    }
  }
}
