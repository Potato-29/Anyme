import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Collapsible from "react-collapsible";
import {FaArrowCircleRight} from 'react-icons/fa'


const AnimePage = () => {

    const {id} = useParams();
    
    
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState();
    const [data, setData] = useState();
    const [episodes, setEpisodes] = useState();
    const [epPages, setEpPages] = useState();
    const [reviews, setReviews] = useState();

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
        // setIsLoading(false)
    },[])

    const getEpisodes = async (a) => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${id}/episodes/${a}`)
        .then(res => res.json())

        // console.log(a)
        // console.log(temp)
        setEpisodes(temp.episodes)
        setEpPages(temp.episodes_last_page)
        // console.log(epPages)
    }

    const getReviews = async() => {
        const temp = await fetch(`https://api.jikan.moe/v3/anime/${id}/reviews`)
        .then(res => res.json())
        
        setReviews(temp.reviews.slice(0,5))
        console.log(temp.reviews)
    }
    
    
    useEffect((a) => {
        getEpisodes(a = 1);
        
        // setIsLoading(false)
    },[])

    const handlePageId = (e) => {
        var pageId = e.target.id;
        // console.log(pageId)
        getEpisodes(pageId)
        
    }
    
    const handleClick = () => {
        var reviewButton = document.getElementById('get-reviews')
        var iconRotate = document.getElementById('icon')

        reviewButton.onclick(getReviews(), iconRotate.style.transform = "rotate(90deg")
    }
    

    

    var btns = []

    for (let i = 1; i <= epPages; i++) {
       
       btns.push(<button className="page" id={i} key={i} onClick={handlePageId}>Page {i}</button>) 
       
    }

    
    
    // console.log(animeList)
    return (
          
        <div className="main">
            { isLoading && <div className="loading">Loading...</div>}   
            <div className="container">
            <Link to="/"><button className="back-btn">Back to Home</button></Link>
                <div className="row">
                    <div className="base-wrapper">
                        <img src={data?.image_url} alt="" className="anime-img" />
                        
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
                        {btns}
                        {episodes?.map(eps => (
                            <p className="eps">{eps.episode_id}) {eps.title}</p>
                        ))}
                    </Collapsible>
                </div>
                <div className="divider">
                    
                    <h1 className="some-pics">Some pictures</h1>
                
                    
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
                <div className="reviews">
                    {/* <h1>Review</h1> */}
                    <button className="get-reviews" id="get-reviews" onClick={handleClick}>Get Reviews </button><FaArrowCircleRight id="icon" className="icon"/>
                    {reviews?.map(revs => (
                        <div className="rev-container">
                            <div className="user-info">
                                <img src={revs.reviewer.image_url}  className="user-img"/>
                                <h3 className="username">{revs.reviewer.username} <br /> <span className="score">Overall Rating: {revs.reviewer.scores.overall}</span></h3>
                            </div>
                            <p className="single-review">{revs.content}</p>
                        </div>
                        
                    ))}
                    
            
                    
                </div>
            </div>
        </div>
    );
}
 
export default AnimePage