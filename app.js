function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  }

function formatDate(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
    if (hours < 10 ){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes < 10 ){minutes=`0${minutes}`;
}
let days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day= days[date.getDay()];
return `${day} ${hours}:${minutes}`;
    }

function formatDay (timestamp){
let date= new Date(timestamp*1000);
let day= date.getDay();
let days= ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {
    let forecast=response.data.daily;

    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row">`;
    
   forecast.forEach(function(forecastDay, index){
    if (index <5){
        forecastHTML=forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="42" />
        <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
        <span class= "weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>`;}
    });

    forecastHTML=forecastHTML +`</div>`;
    forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey= "b5fb4a526e24f0e48b27c52886b74e1a";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon")

fahrenheitTemp= response.data.main.temp


temperatureElement.innerHTML=Math.round(fahrenheitTemp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round(response.data.wind.speed);
dateElement.innerHTML=formatDate(response.data.dt*1000);
iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
}

function search(city){
let apiKey= "b5fb4a526e24f0e48b27c52886b74e1a";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemp(event){
 event.preventDefault();
 let temperatureElement=document.querySelector("#temperature");
 celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let celsiusTemp=((fahrenheitTemp-32)*5/9);
temperatureElement.innerHTML=Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event){
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let temperatureElement=
    document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

let fahrenheitTemp=null;

function searchLocation(position) {
    let apiKey = "b5fb4a526e24f0e48b27c52886b74e1a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search ("Atlanta");
