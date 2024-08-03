feather.replace();

const apiURL = "https://api.openweathermap.org/data/2.5/weather"
const apiKey="05aaef1fbcd1f33051fcc89f215f96b0";

const search =document.getElementById('search');
const locationInput= document.getElementById('search-field');

const mainTemp = document.getElementById('main-temp');
const country =document.getElementById('country');
const city =document.getElementById('city');

const feelsLike=document.getElementById('feels-like');
const windspeed = document.getElementById('wind-speed');
const humidity =document.getElementById('humidity');

const skyInfo =document.getElementById('sky-information');

const body =document.body;

search.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        const location =locationInput.value.trim();
        if(location){
            getWeather(location);
        }
    }
})

function setBackgroundImage(weatherDescription){
    if (weatherDescription.toLowerCase().includes("cloud")) {
        body.style.backgroundImage = "url('cloudy.png')";
        body.style.backgroundPosition="cover";
      }
       else if (weatherDescription.toLowerCase().includes("clear")) {
        body.style.backgroundImage = "url('clearsky.jpg')";
        body.style.backgroundPosition="cover";
      }
      else if (weatherDescription.toLowerCase().includes("rain")) {
        body.style.backgroundImage = "url('rainyni8.jpg')";
        body.style.backgroundPosition="cover";
      }  
      else if (
        weatherDescription.toLowerCase().includes("haze") ||
        weatherDescription.toLowerCase().includes("mist")
      ) {
        body.style.backgroundImage = "url('misc.png')";
        body.style.backgroundPosition="cover";
      }
      else if (weatherDescription.toLowerCase().includes("broken clouds")) {
        body.style.backgroundImage = "url('clear.png')";
        body.style.backgroundPosition="cover";
      } 
      else if (weatherDescription.toLowerCase().includes("thunderstorm")) {
        body.style.backgroundImage = "url('thunder.jpg')";
        body.style.backgroundPosition="cover";
      } 
      else {
        body.style.backgroundImage = none;
      }
    
      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
    }
    
function getWeather(location){
    const url=`${apiURL}?q=${location}&appid=${apiKey}&units=metric`;
     fetch(url)
     .then((response) => response.json())
     .then((data)=>{
        mainTemp.innerText =`${Math.round(data.main.temp)}°C`;
        country.innerText =data.sys.country;
        city.innerText=data.name;

        feelsLike.innerText =`${Math.round(data.main.feels_like)}°C`;
        windspeed.innerText= `${data.wind.speed} km/hr`
        humidity.innerText = `${data.main.humidity}%`

        skyInfo.innerText="Weather : "+ data.weather[0].description;


        setBackgroundImage(data.weather[0].description);
     })
     .catch((error) =>{
        console.log("Error fetching weather information : ",error);
     })
}


