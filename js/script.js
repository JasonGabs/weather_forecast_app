var apiKey = "8d71b7f41f5f486df55b311cacc3cfc1";

var city;

var lat;
var lon;
var currentTemp;
var currentWind;
var currentIconId;
var currentHumidity;
var forecastData;

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

// fetch(queryURL).then((response) => {
//     if (!response.ok) {
//         console.log("reponse  failed!");
//     } else {
//         return response.json();
//     }
// }).then((data) => {
//     console.log(data);
//     let kelvinTemp = data.main.temp;
//     currentTemp = Math.floor((kelvinTemp - 273) * 9 / 5 + 32);
//     console.log(currentTemp);
//     lat = data.coord.lat;
//     console.log(lat);
//     lon = data.coord.lon;
//     console.log(lon);
//     currentIconId = data.weather[0].icon;
// }).then(() => {
//     var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
//     fetch(forecastURL).then((response) => {
//         if (!response.ok) {
//             console.log("forecast reponse  failed!");
//         } else {
//             return response.json();
//         }
//     }).then((data) => {
//         forecastData = data;
//         console.log(data);
//         renderWeather()
//     })
// })
function fetchWeatherData() {
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
        currentHumidity = data.main.humidity;
        currentWind = data.wind.speed;
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
}

function renderWeather() {
    let currentTempEl = document.createElement("p");
    currentTempEl.innerHTML = currentTemp + " F";

    document.getElementById("current").appendChild(currentTempEl);

    let currentWeatherIcon = document.createElement("img")
    currentWeatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconId + "@2x.png")
    document.getElementById("current").appendChild(currentWeatherIcon);

    let currentHumidityEl = document.createElement("p");
    currentHumidityEl.innerHTML = currentHumidity + " Humidity";

    document.getElementById("current").appendChild(currentHumidityEl);

    let currentWindEl = document.createElement("p");
    currentWindEl.innerHTML = "Wind speed is " + currentWind;

    document.getElementById("current").appendChild(currentWindEl);
}

function renderForecasts() {
    let forecastIndexs = [7, 15, 23, 31, 39];
    for (let i = 0; i < forecastIndexs.length; i++) {
        let temp = forecastData.list[forecastIndexs[i]].main.temp;
        console.log(temp);
        let convertedTemp = Math.floor((temp - 273) * 9 / 5 + 32);
        let totalForecastData = document.createElement("p");
        totalForecastData.innerHTML = convertedTemp;
        document.getElementById("forecasts").appendChild(totalForecastData);
    }
}
function clearWeatherData () {
    let clearCurrentData = document.getElementById("current");
    clearCurrentData.textContent = "";
    let clearForecastData = document.getElementById("forecasts");
    clearForecastData.textContent = "";
}

var searchText = document.querySelector("#searchText");
var clearHistory = document.querySelector("#clearHistory");
var searchLi = document.querySelector("#li");
var listItems = document.querySelector("#listItem");
var searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    searches.push(searchText.value);
    searchString = searchText.value;
    showOneSearchAtATime();

    clearWeatherData();

    city = searchString;
    fetchWeatherData();
    searchText.value = "";

    localStorage.setItem("search", JSON.stringify(searches));
    showHistory();
})

clearHistory.addEventListener("click", function (event) {
    localStorage.clear();
    searches = [];
    listItems.innerHTML = "";
})

function showHistory() {
    if (searchLi) {
        searchLi.innerHTML = "";
    }
}

function showSearchesArrayOnReload() {
    for (var i = 0; i < searches.length; i++) {
        var element = searches[i];

        var listContainer = document.getElementById("listItem");
        var listItem = document.createElement("button");

        listItem.setAttribute("id", i);
        listItem.textContent = element;
        listContainer.appendChild(listItem);
    }
}

function showOneSearchAtATime() {
    var element = searchString;

    var listContainer = document.getElementById("listItem");
    var listItem = document.createElement("li");

    listItem.setAttribute("id", 0);
    listItem.textContent = element;
    listContainer.appendChild(listItem);

}

function init() {
    var searchesList = JSON.parse(localStorage.getItem("search"));
    if (searchesList !== null) {
        searches = searchesList;
        showSearchesArrayOnReload(searches);
    } else {
        searches = [];
    }
}

init();

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city