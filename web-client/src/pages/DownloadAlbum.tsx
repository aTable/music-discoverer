import React, { useState, FormEvent } from "react";
import { IDownloadAlbumRequest, downloadAlbum } from "../api";

interface IDownloadAlbum {
  store: any;
}

const Home = (props: IDownloadAlbum) => {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [uri, setUri] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const payload: IDownloadAlbumRequest = {
      artist,
      album,
      uri
    };

    downloadAlbum(payload).then(res => {
      console.log("album download request sent", res);
    });
  };

  return (
    <div className="container">
      <h1>Download album</h1>
      <p>This is for an album that's available as a single video</p>

      <form onSubmit={submit}>
        <div className="form-group row">
          <label htmlFor="artist" className="col-sm-2 col-form-label">
            Artist
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="artist"
              placeholder="Artist"
              value={artist}
              onChange={e => setArtist(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="album" className="col-sm-2 col-form-label">
            Album
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="album"
              placeholder="Album"
              value={album}
              onChange={e => setAlbum(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="uri" className="col-sm-2 col-form-label">
            Uri
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="uri"
              placeholder="Uri"
              value={uri}
              onChange={e => setUri(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
