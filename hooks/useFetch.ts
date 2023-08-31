import { useEffect, useState } from "react";
import { ImportMeta } from "types/index";
 const fs = require('fs');
if (typeof window !== 'undefined') {
const BrowserFS = require('browserfs');
BrowserFS.install(window);

BrowserFS.FileSystem.InMemory.Create((err, inMemoryFS) => {
  if (err) throw err;
  fs.mkdirSync('/sandbox');
  fs.mount('/sandbox', inMemoryFS);
  fs.writeFileSync('/sandbox/test.txt', 'Hello, BrowserFS!');
  // Use fs methods to read/write files
});
fs.readFile('/sandbox/test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); // Output: Hello, BrowserFS!
});

}
 let GIFFYAPIKEY: ImportMeta; 
GIFFYAPIKEY.env.APIKEY ="";
const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIFFYAPIKEY.env.APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;