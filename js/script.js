var apiKey = "8d71b7f41f5f486df55b311cacc3cfc1";

var city;

var lat;
var lon;
var currentTemp;
var currentWind;
var currentIconId;
var currentHumidity;
var forecastData;

function fetchWeatherData() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(queryURL).then((response) => {
        if (!response.ok) {
            console.log("reponse  failed!");
        } else {
            return response.json();
        }
    }).then((data) => {
        let kelvinTemp = data.main.temp;
        currentTemp = Math.floor((kelvinTemp - 273) * 9 / 5 + 32);
        lat = data.coord.lat;
        lon = data.coord.lon;
        currentIconId = data.weather[0].icon;
        currentHumidity = data.main.humidity;
        currentWind = data.wind.speed;
    }).then(() => {
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        fetch(forecastURL).then((response) => {
            if (!response.ok) {
            } else {
                return response.json();
            }
        }).then((data) => {
            forecastData = data;
            
            renderWeather();
            renderForecasts();
        })
    })
}

function renderWeather() {

    let current = document.createElement("p");
    current.innerHTML = "Current Weather"
    document.getElementById("current").appendChild(current);
    
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

    let forecast = document.createElement("p");
    forecast.innerHTML = "Forecasts"
    document.getElementById("forecasts").appendChild(forecast);

    let forecastIndexs = [7, 15, 23, 31, 39];
    for (let i = 0; i < forecastIndexs.length; i++) {
        let temp = forecastData.list[forecastIndexs[i]].main.temp;
        let convertedTemp = Math.floor((temp - 273) * 9 / 5 + 32);

        let totalForecastData = document.createElement("p");
        totalForecastData.innerHTML = convertedTemp;
        document.getElementById("forecasts").appendChild(totalForecastData);

        let humid = forecastData.list[forecastIndexs[i]].main.humidity
        let forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = humid + " Humidity";
        document.getElementById("forecasts").appendChild(forecastHumidity);

        let wind = forecastData.list[forecastIndexs[i]].wind.speed;
        let forecastWind = document.createElement("p");
        forecastWind.innerHTML = wind + " Wind Speed";

        let icon = forecastData.list[forecastIndexs[i]].weather[0].icon
        let currentWeatherIcon = document.createElement("img")
        currentWeatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        document.getElementById("forecasts").appendChild(currentWeatherIcon);
    }
}

function clearWeatherData() {
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
    clearWeatherData();
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
        listItem.addEventListener("click", function (event) {
            let element = event.target;
            clearWeatherData();
            city = element.textContent;
            fetchWeatherData();
        })
    }
}

function showOneSearchAtATime() {
    var element = searchString;

    var listContainer = document.getElementById("listItem");
    var listItem = document.createElement("li");
    var listButton = document.createElement("button");
    listItem.setAttribute("id", 0);
    listItem.textContent = element;
    listButton.setAttribute("id", 1);
    listButton.textContent = element;
    listContainer.appendChild(listButton);
    listContainer.appendChild(listItem);
    
    for (let i = 0; i < searches.length; i++) {
        listButton.addEventListener("click", function (event) {
            let element = event.target;
            clearWeatherData();
            city = element.textContent;
            fetchWeatherData();
        })
    }
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

