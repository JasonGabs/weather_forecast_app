var apiKey = "8d71b7f41f5f486df55b311cacc3cfc1";

var city = "San Francisco";

var lat;
var lon; 
var currentTemp;
var currentWind;
var currentIconId;

var forecastData;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

fetch(queryURL).then((response) => {
    if (!response.ok) {
        console.log("reponse  failed!");
    } else {
        return response.json();
    }
}).then((data) => {
    console.log(data);
    let kelvinTemp = data.main.temp;
    currentTemp = Math.floor((kelvinTemp - 273) * 9 / 5 + 32);
    console.log(currentTemp);
    lat = data.coord.lat;
    console.log(lat);
    lon = data.coord.lon;
    console.log(lon);
    currentIconId = data.weather[0].icon;
}).then(() => {
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastURL).then((response) => {
        if (!response.ok) {
            console.log("forecast reponse  failed!");
        } else {
            return response.json();
        }
    }).then((data) => {
        forecastData = data;
        console.log(data);
        renderWeather()
    })
})

function renderWeather() {
    let currentTempEl = document.createElement("p");
    currentTempEl.innerHTML = currentTemp + " F";

    document.getElementById("current").appendChild(currentTempEl);
    
    let currentWeatherIcon = document.createElement("img")
    currentWeatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconId + "@2x.png")
    document.getElementById("current").appendChild(currentWeatherIcon);

    let forecastIndexs = [7, 15, 23, 31, 39];
    for (let i = 0; i < forecastIndexs.length; i++) {
        let temp = forecastData.list[forecastIndexs[i]].main.temp
        console.log(temp);
        let totalForecastData = document.createElement("p");
        totalForecastData.innerHTML = temp;
        document.getElementById("forecasts").appendChild(totalForecastData);
    }
}

