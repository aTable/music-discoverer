const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { getTracklistForArtistsAlbum } = require("./music-brainz");

async function convertFolder(outputFolderPath) {
  //   fs.readdir(outputFolderPath, (err, files) => {
  //   if (err) throw err
  //   await Promise.all(files.map(x => slicePortion(x)))
  //   console.log('converted folder')
  // });
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

async function slicePortion(sourcePath, outputFolder, artist, album) {
  await initDestinationFolder(outputFolder);
  const tracklist = await getTracklistForArtistsAlbum(artist, album);
  let accumulatedTimeMilli = 0;
  const endBufferMilli = 1000; // TODO: sometimes songs dont start correctly possibly due to music-brainz archive ...

  await Promise.all(
    tracklist.map(track => {
      const destinationMp3Path = path.join(
        outputFolder,
        `${artist} - ${track.title}.mp3`
      );

      const startTime = convertMillisecondsToTimestamp(accumulatedTimeMilli);
      const endTime = convertMillisecondsToTimestamp(
        accumulatedTimeMilli + track.length + endBufferMilli
      );
      accumulatedTimeMilli += track.length;
      return ffmpeg([
        "-i",
        sourcePath,
        "-ss",
        startTime,
        "-to",
        endTime,
        "-q:a",
        "0",
        "-map",
        "a",
        destinationMp3Path
      ]);
    })
  );
}

async function convertFile(file) {
  const [filename] = file.split(".");
  const sourcePath = path.join(outputFolder, file);
  const destinationMp3Path = path.join(outputFolder, filename + ".mp3");
  await ffmpeg(["-i", sourcePath, "-b:a", "192k", destinationMp3Path]);
}

module.exports = {
  convertFile,
  convertFolder,
  slicePortion
};

async function ffmpeg(params) {
  return new Promise((resolve, reject) => {
    const ffmpegProcess = spawn("ffmpeg", params, { stdio: "inherit" });
    // ffmpegProcess.stdout.on("data", data => {
    //   console.log("data", data);
    // });
    // ffmpegProcess.stderr.on("data", err => {
    //   const msg = err.toString("utf8");
    //   //console.error(err);
    //   //reject(err);
    // });
    ffmpegProcess.on("close", code => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) resolve();
      else reject();
    });
  });
}

function convertMillisecondsToTimestamp(milli) {
  return new Date(milli).toISOString().substr(11, 8);
}
