let userToken;
let expiresIn;
let CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
let REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export let Spotify = {
  getAccessToken() {
    if (userToken) {
      return userToken;
    } else if (
      window.location.href.match(/access_token=([^&]*)/) &&
      window.location.href.match(/expires_in=([^&]*)/)
    ) {
      userToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (userToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=user-top-read&redirect_uri=${REDIRECT_URI}`;
    }
  },
  async getRecentArtists() {
    let artists;
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=50",
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    const json = await response.json();
    console.log(json);
    artists = json.items.map((artist) => {
      return {
        name: artist.name,
        popularity: artist.popularity,
        followers: artist.followers.total,
      };
    });
    return artists;
  },
};
