import React, { useEffect, useState } from "react";
import { Spotify } from "./Spotify";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistsByPopularity, setArtistsByPopularity] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
    Spotify.getRecentArtists().then((response) => {
      setArtists(response);
      setArtistsByPopularity((prev) => {
        let newArtists = [...prev];
        newArtists.sort((a, b) => {
          if (a.followers > b.followers) return 1;
          else if (a.followers < b.followers) return -1;
          else if (a.followers == b.followers) return 0;
        });
        return newArtists;
      });
    });
  }, []);

  return (
    <div className="App">
      {artistsByPopularity.map((artist) => {
        return (
          <div>
            {artist.name} | popularity : {artist.popularity} | followers :
            {artist.followers}
          </div>
        );
      })}
    </div>
  );
}

export default App;
