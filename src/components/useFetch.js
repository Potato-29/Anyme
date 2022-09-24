import { useState, useEffect } from "react";
import { ColorManagement } from "three";

const useFetch = () => {
  const [animeList, setanimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  // const [footerDown, setFooterDown] = useState(false);

  const searchAnime = async (e) => {
    const url = "https://api.jikan.moe/v4";
    // const url = 'https://api.jikan.moe/v3/';

    e.preventDefault();
    console.log(url);
    FetchAnime(search);
  };

  const GetTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/top/anime/1/bypopularity`
    ).then((res) => res.json());
    setTopAnime(temp.top.slice(0, 5));
    console.log(temp);
  };

  useEffect(() => {
    GetTopAnime();

    console.log(topAnime);
  }, []);

  const FetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`).then(
      (res) => res.json()
    );
    setanimeList(temp.data);
    // console.log(temp);
  };

  // const handleId = (e) => {
  //     console.log(e.anime.title)
  // }

  return { animeList, topAnime, search, searchAnime, setSearch };
};

export default useFetch;
