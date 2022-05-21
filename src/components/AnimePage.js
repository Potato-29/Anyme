import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Collapsible from "react-collapsible";


const AnimePage = () => {

    const {id} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState();
    const [data, setData] = useState();
    const [episodes, setEpisodes] = useState();
    

    const getData = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${id}`)
        .then(res => res.json())
        setData(temp)
    }

    useEffect(() => {
        getData();
        setIsLoading(false);

    }, [])

    const getImages = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${id}/pictures`)
        .then(res => res.json())

    setImages(temp.pictures.slice(0, 8))
    }

    useEffect(() => {
        getImages();
        setIsLoading(false)
    },[])

    const getEpisodes = async () => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${id}/episodes`)
        .then(res => res.json())

        console.log(temp.episodes)
    setEpisodes(temp.episodes)
    }

    useEffect(() => {
        getEpisodes();
        setIsLoading(false)
    },[])

    // console.log(animeList)
    return (
          
        <div className="main">
            { isLoading && <div className="loading">Loading...</div>}   
            <div className="container">
            <Link to="/"><button className="back-btn">Back to Home</button></Link>
                <div className="row">
                    <div className="base-wrapper">
                        <img src={data?.image_url} alt="" className="anime-img" srcset="" />
                        
                    </div>
                    <div className="desc-section">
                        <h1 className="anime-name">{data?.title} <span>({data?.title_english})</span></h1>
                        <p className="desc">{data?.synopsis}</p>
                        {/* <p className="other-info">Number of episodes: {data?.episodes}</p>
                        <p className="other-info">Rank: {data?.rank}</p>
                        <p className="other-info">Current status: {data?.status}</p> */}

                        <p className="other-info">Other info</p>
                        <ul>
                            <li>Number of episodes: {data?.episodes}</li>
                            <li>Duration: {data?.duration}</li>
                            <li>Rank: {data?.rank}</li>
                            <li>Current status: {data?.status}</li>
                        </ul>
                    </div>
                </div>
                <div className="ep-wrapper">
                    
                    <Collapsible trigger="List of episodes" triggerTagName="button" triggerClassName="colapse-btn">
                        {episodes?.map(eps => (
                            <p className="eps">{eps.episode_id}) {eps.title}</p>
                        ))}
                    </Collapsible>
                </div>
                <div className="img-wrapper">
                    {images?.map(pics => (
                        <div className="picture-cards">
                            <figure>
                                <img src={pics?.small} alt="" className="extra-img" />
                            </figure>
                            <h1></h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default AnimePage