import React from "react";
import { useState,useEffect } from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import BackToTop from "../BackToTop";
import Footer from "./Footer";

const Home = () => {
    
    
    const {animeList, topAnime, search, searchAnime, setSearch} = useFetch()
  
    

    const AnimeCard = ({anime}) => {
        return (  
            <article className="anime-card" >
                <Link to={`/animepage/${anime.mal_id}`} >
                    <figure>
                        <img src={anime.image_url} className="card-img" alt="AnimeImage" />
                    </figure>
                    <h3 className="anime-list-name">{anime.title}</h3>
                </Link>
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

                        <Link
                        className="top-anime"
                        to={`/animepage/${anime.mal_id}`}
                        
                        rel="noreferrer"
                        >
                            {anime.title}
                            
                        </Link>
                    ))}

                    
                </nav>
            </aside>
            

            
            
            <BackToTop></BackToTop>
            
            
        </div>
        
        
    );
}

export default Home;