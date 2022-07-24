import React, { useEffect, useState } from "react";
import { Spotify } from "./Spotify";
import "./App.css";
import { Header } from "./Header";
import { Poster } from "./Poster";
import { Commands } from "./Commands";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [artists, setArtists] = useState([]);
  const [orderByPopularity, setOrderByPopularity] = useState(true);

  let orderedArtists = [...artists];

  if (orderByPopularity) {
    orderedArtists.sort((a, b) => {
      if (a.followers > b.followers) return 1;
      else if (a.followers < b.followers) return -1;
      else if (a.followers == b.followers) return 0;
    });
  }

  let toggleOrderBy = () => {
    setOrderByPopularity((prev) => !prev);
  };

  useEffect(() => {
    Spotify.getAccessToken();
    Spotify.getRecentArtists().then((response) => {
      setArtists(response);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="EditorBody">
        <Poster />
        <Commands />
      </div>

      {/* <button onClick={toggleOrderBy}>Toggle Order</button>
      {orderedArtists.map((artist) => {
        return <div>{artist.name}</div>;
      })} */}
    </div>
  );
}

export default App;
