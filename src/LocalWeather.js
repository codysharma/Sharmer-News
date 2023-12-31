import React, { useState, useEffect } from "react";
import './LocalWeather.css'
import WeatherDisplay from "./WeatherDisplay";
import env from "react-dotenv"

function LocalWeather(){
    const api_key = env.WEATHER_API_URL
    const [zip, setZip] = useState("00000")
    const [weather, setWeather] = useState("none")
    let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=c33ae8b0474f40d2bc4175447232011&q=${zip.zipcode}&aqi=no`
    const handleChange = (e) => {
        setZip({[e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setZip(zip)
        let display = document.getElementById('weatherDisplay');
        if (zip.zipcode !== ""){
            getWeather(weatherUrl)
            display.style.border = "2px solid"
        } else {
            setWeather("none")
            display.style.border = ""
        }
    }

    // useEffect((weatherUrl) => {
    //     // console.log("useEffect", weatherUrl);
    // }, [zip])

    const getWeather = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setWeather(data)
            })
    }

    return (
        <div id="localWeather">
            <h4>Local Weather</h4>
            <form id="local" onSubmit={handleSubmit}>
                <label htmlFor="zipcode">Enter your zipcode</label>
                <input type="text" placeholder="Zip code" id="zipcode" maxLength={5} size={5} onChange={handleChange}></input>
            </form>
            <button onClick={handleSubmit}>Submit</button>
            <div id="weatherDisplay"><WeatherDisplay weather={weather} /></div>
        </div>
    )
}

export default LocalWeather