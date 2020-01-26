const path = require("path");
const fs = require("fs");
const youtubedl = require("youtube-dl");

const playlistUri =
  "https://www.youtube.com/playlist?list=PLBzBwYhHpqLLQzRfbKR13K9WVulSrEsn_";

function playlist(url) {
  "use strict";
  const video = youtubedl(url);

  video.on("error", function error(err) {
    console.log("error 2:", err);
  });

  let size = 0;
  video.on("info", function(info) {
    size = info.size;

    const outputFolder = __dirname + "/output2";
    const outputFilename = info.title + "." + info.ext;
    const destinationPath = path.join(outputFolder, outputFilename);
    video.pipe(fs.createWriteStream(destinationPath));
  });

  let pos = 0;
  video.on("data", function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      let percent = ((pos / size) * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + "%");
    }
  });

  video.on("next", playlist);
}

playlist(playlistUri);
