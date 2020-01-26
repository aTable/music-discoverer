const path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const { slicePortion, sliceUsingCsv } = require("./ffmpegify-folder");
const { downloadSingleVideo } = require("./video-downloader");
const { getTracklistForArtistsAlbum } = require("./music-brainz");
const { Track } = require("./models/Track");
const { methods } = require("./enums");

function getParams() {
  const argumentPrefix = "--";
  const args = process.argv.slice(2).reduce((prev, item) => {
    const index = item.indexOf("=");
    const key = item.substr(
      argumentPrefix.length,
      index - argumentPrefix.length
    );
    const value = item.substr(index + 1);
    return { ...prev, [key]: value };
  }, {});

  return args;
}

async function singleVideo(params) {
  const outputFolderPath = path.join(
    __dirname,
    "output",
    `${params.artist} - ${params.album}`
  );
  if (!fs.existsSync(outputFolderPath)) fs.mkdirSync(outputFolderPath);
  const downloadedPath = await downloadSingleVideo(
    params.uri,
    outputFolderPath
  );
  await initDestinationFolder(outputFolderPath);
  const tracklist = await getTracklist(params);
  if ("csv-tracklist-path" in params) {
    await sliceUsingCsv(
      tracklist,
      downloadedPath,
      outputFolderPath,
      params.album
    );6
  } else {
    await slicePortion(
      tracklist,
      downloadedPath,
      outputFolderPath,
      params.artist
    );
  }
  console.log('complete!')
}

async function getTracklist(params) {
  if (!("csv-tracklist-path" in params))
    return getTracklistForArtistsAlbum(params.artist, params.album);

  const records = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, params["csv-tracklist-path"]))
      .pipe(csv.parse({ headers: true }))
      .on("error", error => reject(error))
      .on("data", row => {
        records.push(row);
      })
      .on("end", () => {
        const tracks = records.map((x, i, list) => {
          const nextRecord = list[i + 1];
          return new Track(
            x.title,
            null,
            x.startTime,
            nextRecord ? nextRecord.startTime : null
          );
        });
        resolve(tracks);
      });
  });
}

/**
 * Ensure the destination folder is ready for ffmpeg
 *   - deleting all .mp3
 */
async function initDestinationFolder(outputFolder) {
  return new Promise((resolve, reject) => {
    fs.readdir(outputFolder, async (err, files) => {
      if (err) reject(err);
      const filesToDelete = files.filter(x => x.endsWith(".mp3"));

      await Promise.all(
        filesToDelete.map(x => {
          fs.unlink(path.join(outputFolder, x), err2 => {
            if (err2) reject(err2);
          });
        })
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

const params = getParams();
if (params.method === methods.singleVideo) {
  singleVideo(params);
} else {
  console.log("unsupported method: " + params.method);
}
