import React, { useState, useEffect}from "react";
import './styles/global.css'
import axios from "axios";

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const getWeather = async (lat,long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])

  if(location === false){
    return(
      <>
        Necessario habilitar a localizacao no browser
      </>
    )
  } else if(weather === false){

    return(

      <>
        Carregando o clima...
      </>
    )

  }else {

  return (
    <>
    <h1>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h1>
    <hr />
    <ul>
      <li>Temperatura atual: {weather['main']['temp']}</li>
      <li>Temperatura maxima: {weather['main']['temp_max']}</li>
      <li>Temperatura minima: {weather['main']['temp_min']}</li>
      <li>Pressao: {weather['main']['pressure']} hpa </li>
      <li>Umidade: {weather['main']['humidity']}%</li>
    </ul>
    </>
  );
  }
}

export default App;
