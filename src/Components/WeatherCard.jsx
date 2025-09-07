import { useEffect, useRef, useState } from 'react';
import './WeatherCard.css';
import axios from 'axios';
const API_KEY='630908d52b92e919d5445d6f7d4d4e43';
const WeatherCard = ()=>
{
    const [weatherData,setWeatherData]=useState({});
  const inputRef=useRef();
  async function getData(cityName)
  {
    if(cityName==="")
    {
        alert("enter city name");
        return;
    }
    try
    {

    
     const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
     const data=await response.json();
    console.log(data);
    setWeatherData({temp:data.main.temp,humidity:data.main.humidity,wind:data.wind.speed,cityName:cityName,description:data.weather[0].description});
    console.log(weatherData);
    }
    catch(error)
    {
        alert("enter correct city name");
    }
  }
  useEffect(()=>{
    getData("Delhi")
  },[])
    return(
       
        <div className="weatherCard">
            console.log(weatherData);
            <div className="search">
                <input type='text' placeholder='Enter Location' ref={inputRef}></input>
                 <button  className="searchIcon" onClick={()=>{getData(inputRef.current.value);
                    inputRef.current.value="";
                    inputRef.current.focus();
                 }}><i className="fa fa-search "></i></button>
            </div>
             <div className="city">  
             <i className='fa fa-location' ></i>
                {weatherData ? <p>{weatherData.cityName?.toUpperCase()}</p>:<p></p>}</div>
            <div className="temparatureContainer">
                <img src="#" alt="temparature"/>
                <p>{weatherData.temp}<sup>0</sup> C</p>
            </div>
            <div className="humidityAndWindContainer">
                <div className='humidity'>
                    <img src='#' alt='HumidityImage'></img>
                    <p>{weatherData.humidity}g/m<sup>3</sup></p>
                </div>
                <div className="wind">
                    <img src='#' alt='windimage'></img>
                    <p> {weatherData.wind}km/hr</p>
                </div>
            </div>
            <div className='description'>
                Description:&nbsp;{weatherData ?<p>{ weatherData.description}</p>:<p></p>}
            </div>
        </div>
    )
}


export default WeatherCard;