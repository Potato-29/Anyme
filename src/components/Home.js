import React from "react";
import { Row,Col } from "react-bootstrap";
import AnimeCard from "./AnimeCard";
import { useState,useEffect } from "react";


const Home = () => {
    
    const [animeList, setanimeList] = useState([])
    const [topAnime, setTopAnime] = useState([])
    const [search, setSearch] = useState("");

    const searchAnime = async (e) => {
        const url = 'https://api.jikan.moe/v3';
        // const url = 'https://api.jikan.moe/v4/';
        e.preventDefault();

        FetchAnime(search);
    };

    const GetTopAnime = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
        .then(res => res.json());    
    setTopAnime(temp.top.slice(0, 5));
    }

    useEffect(() => {
        GetTopAnime();

        console.log(topAnime)
    }, [])

    const FetchAnime = async (query) => {
        const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
        .then(res => res.json());
    
        setanimeList(temp.results);
    }

    const AnimeCard = ({anime}) => {
        return (  
            <article className="anime-card">
                <a href="">
                    <figure>
                        <img src={anime.image_url} alt="AnimeImage" />
                    </figure>
                    <h3>{anime.title}</h3>
                </a>
            </article>
        );
    }



    return ( 
        <div className="layout">
            <div className="wrapper">
                <div className="">
                    <form id="form" role="search" onSubmit={searchAnime} className="">
                        <input type="search" id="query" name="q"
                        placeholder="Search a name"
                        aria-label="Search through site content" value={search} onChange={e => setSearch(e.target.value)}></input>
                        <button className="search">Search</button>
                    </form>
                    
                </div>
                <div className="anime-list">
                    {animeList.map(anime => (
                        <AnimeCard
                            anime={anime}
                            key={anime.mal_id}
                        />
                    ))}
                </div>
            </div>
            <aside>
                <nav>
                    <h2>Top Anime</h2>
                    {topAnime.map(anime => (

                        <a 
                        className="top-anime"
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        >
                            {anime.title}
                            {anime.votes}
                        </a>
                    ))}
                    
                </nav>
            </aside>
        </div>
        
    );
}

export default Home;