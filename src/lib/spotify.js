import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  'user-library-read',
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
].join(",");

const params = {
  scope: scopes,
}

const LOGIN_URL = `https://accounts.spotify.com/authorize?${new URLSearchParams(params).toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL }