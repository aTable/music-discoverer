const path = require("path");
// const fs = require("fs");
const { spawn } = require("child_process");
const { convertMillisecondsToTimestamp } = require("./utils");

// async function convertFolder(outputFolderPath) {
//   fs.readdir(outputFolderPath, (err, files) => {
//   if (err) throw err
//   await Promise.all(files.map(x => slicePortion(x)))
//   console.log('converted folder')
// });
// }

async function sliceUsingCsv(tracklist, sourcePath, outputFolder, artist) {
  await Promise.all(
    tracklist.map(track => {
      const destinationMp3Path = path.join(
        outputFolder,
        `${artist} - ${track.title}.mp3`
      );
      let args = [
        "-i",
        sourcePath,
        "-ss",
        track.startTime,
        "-to",
        track.endTime,
        "-q:a",
        "0",
        "-map",
        "a",
        destinationMp3Path
      ];
      // TODO: fix hacky way to provide start with no end time
      if (args.includes(null)) {
        args = args.filter(x => x).filter(x => x !== "-to");
      }
      return ffmpeg(args);
    })
  );
}

async function slicePortion(tracklist, sourcePath, outputFolder, artist) {
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
      const args = [
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
      ];
      return ffmpeg(args);
    })
  );
}

// async function convertFile(file) {
//   const [filename] = file.split(".");
//   const sourcePath = path.join(outputFolder, file);
//   const destinationMp3Path = path.join(outputFolder, filename + ".mp3");
//   await ffmpeg(["-i", sourcePath, "-b:a", "192k", destinationMp3Path]);
// }

module.exports = {
  // convertFile,
  // convertFolder,
  slicePortion,
  sliceUsingCsv
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
      console.log(
        `${params[params.length - 1]} finished ${
          code === 0 ? "successfully" : "with an error"
        }`
      );
      if (code === 0) resolve();
      else reject();
    });
  });
}
