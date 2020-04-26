var youtubedl = require("youtube-dl");
const fs = require("fs");
const path = require("path");

function downloadSingleVideo(uri, destinationFolderPath) {
  // exit early for testing ...
  //return path.join(destinationFolderPath, 'Jinjer - Macro Full Album (2019).mp4')

  const files = fs.readdirSync(destinationFolderPath);
  const mp4 = files.find(x => x.endsWith(".mp4"));
  if (mp4) return Promise.resolve(path.join(destinationFolderPath, mp4));

  return new Promise((resolve, reject) => {
    const video = youtubedl(
      uri,
      // Optional arguments passed to youtube-dl.
      ["--format=18"],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: destinationFolderPath }
    );
    let destinationPath = "";

    // Will be called when the download starts.
    video.on("info", function(info) {
      console.log("Download started");
      console.log("filename: " + info.title);
      console.log("size: " + info.size / 1024 / 1024 + "mb");
      destinationPath = path.join(
        destinationFolderPath,
        info.title + "." + info.ext
      );
      video.pipe(fs.createWriteStream(destinationPath));
    });

    video.on("complete", function complete(info) {
      "use strict";
      console.log("filename: " + info._filename + " already downloaded.");
    });

    video.on("end", function() {
      resolve(destinationPath);
    });
  });
}

const uri = "https://www.youtube.com/watch?v=y6rZfpSL1RQ";
downloadSingleVideo(uri, __dirname + "/output");
