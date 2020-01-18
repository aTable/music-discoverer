const axios = require("axios");

const brainz = axios.create({
  baseURL: "https://musicbrainz.org/ws/2",
  timeout: 1000,
  headers: {}
});

brainz.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
brainz.interceptors.response.use(
  res => {
    if (res.status === 200) return res.data;
    else return res;
  },
  err => {
    return Promise.reject(err);
  }
);

function getArtist(artist) {
  return brainz.get(`/artist?query=${artist}&fmt=json`);
}

function getArtistAlbums(artist) {
  return brainz
    .get(
      `/release-group/?query=artist:"${artist}" AND primarytype:"album"&fmt=json`
    )
    .then(res => {
      const filtered = res["release-groups"].filter(x =>
        x["artist-credit"].some(
          credit =>
            credit.name && credit.name.toLowerCase() === artist.toLowerCase()
        )
      );
      return filtered;
    });
}

function getTracklist(releaseId) {
  return brainz
    .get(`/release/${releaseId}?inc=recordings&fmt=json`)
    .then(res => {
      return res.media[0].tracks;
    });
}

function getTracklistForArtistsAlbum(artist, album) {
  return getArtistAlbums(artist).then(res => {
    const matchingAlbum = res.find(
      x => x.title.toLowerCase() === album.toLowerCase()
    );
    return getTracklist(matchingAlbum.releases[0].id).then(tracklist => {
      return tracklist;
    });
  });
}

module.exports = {
    getArtist,
    getArtistAlbums,
    getTracklist,
    getTracklistForArtistsAlbum
}