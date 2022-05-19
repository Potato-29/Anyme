const AnimeCard = ({anime}) => {
    return (  
        <article className="anime-card">
            <a href="">
                <figure>
                    <img src={anime.image_url} alt="AnimeImage" className="anime-img" />
                </figure>
                <h3>{anime.title}</h3>
            </a>
        </article>
    );
}
 
export default AnimeCard;