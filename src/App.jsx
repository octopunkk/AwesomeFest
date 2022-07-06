import { useState } from "react";
import { Spotify } from "./Spotify";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  Spotify.getAccessToken();
  let topRecentArtists = Spotify.getRecentArtists();

  return (
    <div className="App">
      bonjour
      {topRecentArtists.map((artist) => {
        return <div>{artist.name}</div>;
      })}
    </div>
  );
}

export default App;
