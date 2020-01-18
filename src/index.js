const { slicePortion } = require("./ffmpegify-folder");
const { downloadSingleVideo } = require("./video-downloader");
const path = require("path");
const fs = require("fs");
const [artistArg, albumArg, youtubeAlbumUriArg] = process.argv.slice(2);

async function main() {
  const outputFolderPath = path.join(__dirname, "output", albumArg);
  if (!fs.existsSync(outputFolderPath)) fs.mkdirSync(outputFolderPath);

  const downloadedPath = await downloadSingleVideo(
    youtubeAlbumUriArg,
    outputFolderPath
  );  
  await slicePortion(downloadedPath, outputFolderPath, artistArg, albumArg);
}

main();
