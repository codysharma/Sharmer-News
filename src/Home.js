import React, { useState, useEffect } from "react";
import './Home.css';
import LocalWeather from './LocalWeather'
import env from "react-dotenv"
import Modal from "./modal"

function HomeDisplay(nyt_api_key){
    const [isClicked, setIsClicked] = useState(false)
    const [homeNews, setHomeNews] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentStory, setCurrentStory] = useState(null)

    const nytApiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=V2BhXAwqkGP6N5nlwlAGa6ycusZ5JEJh`

    function onClick(story){
        setShowModal((prevState => ({
            check: !prevState.check
          })));
        setCurrentStory(story);
    }

    function handleToggle(){
        setIsClicked(!isClicked)
        let localWeather = document.getElementById('weatherAside')
        let contentDiv = document.getElementById("content")
        if (isClicked === true) {
            localWeather.style.display = "none"
            contentDiv.style.gridColumn = "span 2"
         } else{ 
            localWeather.style.display = "block"
            contentDiv.style.gridColumn = "1 / 1"
         }
    }

    useEffect(() => {
        fetch(nytApiUrl)
            .then(res => res.json())
            .then(res => {
                setHomeNews(res.results)
            })
    },[])

    // console.log(homeNews);

    return (
        <div className='homeDisplay'>
            <div id='content'>
                <div id="contentHeader">
                    <h2>Your Home Page</h2>
                    <form>
                        <label htmlFor="showWeather">Click here for local weather</label>
                        <input type="checkbox" 
                        id="showWeather" 
                        checked={isClicked}
                        onChange={handleToggle}
                        value={isClicked}
                        ></input>
                    </form>
                </div>
                <div className='newsDisplay'>
                {homeNews.length > 0 && homeNews.map((story) => {
                    return(
                    <div className='newsPreview' onClick={() => {onClick(story)}}>
                        <p className='title'>{story.title}</p>
                        {/* <img src={story.multimedia[2].url} alt={story.multimedia[2].caption}></img> */}
                        <p className='storyPreview'>{story.abstract}</p>
                    </div>
                    )                    
                })}
                {showModal && (
                        <Modal currentStory={currentStory} showModal={showModal} setShowModal={setShowModal}/>
                    )}
        </div>
            </div>
            <div className='aside' id="weatherAside">
                <LocalWeather />
            </div>
        </div>
    )
}

export default HomeDisplay