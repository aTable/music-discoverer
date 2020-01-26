import React, { useState } from "react";

interface IHomeProps {
  store: any;
}

const Home = (props: IHomeProps) => {

  return (
    <div className="container">
      <h1>Discover music</h1>
      <p>Find artists and local talent similar to your preferences</p>
    </div>
  );
};

export default Home;
