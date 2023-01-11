import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Collapsible from "react-collapsible";
import { FaArrowCircleRight } from "react-icons/fa";
import BackToTop from "../BackToTop";

const AnimePage = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState();
  const [data, setData] = useState();
  const [episodes, setEpisodes] = useState();
  const [epPages, setEpPages] = useState();
  const [reviews, setReviews] = useState();
  console.log("e[isdoe", episodes);

  const getData = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}`).then(
      (res) => res.json()
    );
    setData(temp.data);
  };

  useEffect(() => {
    getData();
    setIsLoading(false);
  }, []);

  const getImages = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/pictures`
    ).then((res) => res.json());
    setImages(temp.data);
  };

  useEffect(() => {
    getImages();
    // setIsLoading(false)
  }, []);

  const getEpisodes = async (a) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/episodes?page=${a}`
    ).then((res) => res.json());

    // console.log(a)
    setEpisodes(temp.data);
    setEpPages(temp?.pagination?.last_visible_page);
    // console.log(epPages)
  };

  const getReviews = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/reviews`
    ).then((res) => res.json());

    console.log(temp);
    setReviews(temp.data.slice(0, 5));
  };

  useEffect((a) => {
    getEpisodes((a = 1));

    // setIsLoading(false)
  }, []);

  const handlePageId = (e) => {
    var pageId = e.target.id;
    console.log(pageId);
    getEpisodes(pageId);
  };

  const handleClick = () => {
    var reviewButton = document.getElementById("get-reviews");
    var iconRotate = document.getElementById("icon");

    reviewButton.onclick(
      getReviews(),
      (iconRotate.style.transform = "rotate(90deg")
    );
  };

  var btns = [];

  for (let i = 1; i <= epPages; i++) {
    btns.push(
      <button className="page" id={i} key={i} onClick={handlePageId}>
        Page {i}
      </button>
    );
  }

  // console.log(animeList)
  return (
    <div className="main">
      {isLoading && <div className="loading">Loading...</div>}
      <div className="container">
        <Link to="/">
          <button className="back-btn">Back to Home</button>
        </Link>
        <div className="row">
          <div className="base-wrapper">
            <img
              src={data?.images?.webp?.large_image_url}
              alt=""
              className="anime-img"
            />
          </div>
          <div className="desc-section">
            <h1 className="anime-name">
              {data?.title} <span>({data?.title_english})</span>
            </h1>
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
          <Collapsible
            trigger="List of episodes"
            triggerTagName="button"
            triggerClassName="colapse-btn"
          >
            {btns}
            <div className="ep-container">
              {episodes?.map((eps) => (
                <p className="eps">
                  {`${eps.mal_id} ) ${eps.title}`}{" "}
                  {eps.filler === "true" ? "Filler" : ""}
                </p>
              ))}
            </div>
          </Collapsible>
        </div>
        <div className="divider">
          <h1 className="some-pics">Some pictures</h1>
        </div>
        <div className="img-wrapper">
          {images?.map((pics) => (
            <div className="picture-cards">
              <figure>
                <img
                  src={pics?.webp?.large_image_url}
                  alt=""
                  className="extra-img"
                />
              </figure>
              <h1></h1>
            </div>
          ))}
        </div>
        <div className="reviews">
          {/* <h1>Review</h1> */}
          <button
            className="get-reviews"
            id="get-reviews"
            onClick={handleClick}
          >
            Get Reviews{" "}
          </button>
          <FaArrowCircleRight id="icon" className="icon" />
          {reviews?.map((revs) => (
            <div className="rev-container">
              <div className="user-info">
                <img
                  src={revs.user.images.webp.image_url}
                  className="user-img"
                />
                <h3 className="username">
                  {revs.user.username} <br />{" "}
                  <span className="score">Overall Rating: {revs.score}</span>
                </h3>
              </div>
              <p className="single-review">{revs.review}</p>
            </div>
          ))}
        </div>
      </div>
      <BackToTop></BackToTop>
    </div>
  );
};

export default AnimePage;
