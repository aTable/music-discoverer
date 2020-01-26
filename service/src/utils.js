
function convertMillisecondsToTimestamp(milli) {
    return new Date(milli).toISOString().substr(11, 8);
  }

  function convertTimestampToMilli(timestamp) {
      
  }

  module.exports = {
      convertMillisecondsToTimestamp,
      convertTimestampToMilli,
  }