// var searches = [];
// var searchText = document.querySelector("#searchText");
// var clearHistory = document.querySelector("#clearHistory");
// var searchLi = document.querySelector("#li");
// var listItems = document.querySelector("#listItem");
// var searchButton = document.querySelector("#searchButton");

// searchButton.addEventListener("click", function(event) {
//     event.preventDefault();
    
//     searches.push(searchText.value);
//     searchString = searchText.value;
//     showOneSearchAtATime();

//     searchText.value = "";

//     localStorage.setItem("search", JSON.stringify(searches));
//     showHistory();
// })

// clearHistory.addEventListener("click", function(event) {
//     localStorage.clear();
//     searches = [];
//     listItems.innerHTML = "";
// })

// function showHistory() {
//   if (searchLi) {
//     searchLi.innerHTML = "";
//   }  
// }

// function showSearchesArrayOnReload() {
//   for (var i = 0; i < searches.length; i++) {
//     var element = searches[i];
    
//     var listContainer = document.getElementById("listItem");
//     var listItem = document.createElement("button");

//     listItem.setAttribute("id", i);
//     listItem.textContent = element;
//     listContainer.appendChild(listItem);
//   }
// }

// function showOneSearchAtATime() {
//     var element = searchString;

//     var listContainer = document.getElementById("listItem");
//     var listItem = document.createElement("li");

//     listItem.setAttribute("id", 0);
//     listItem.textContent = element;
//     listContainer.appendChild(listItem);

// }

// function init () {
//     var searchesList = JSON.parse(localStorage.getItem("search"));
//     if (searchesList !== null) {
//         searches = searchesList;
//         showSearchesArrayOnReload(searches);
//     }
// }

// init();

// // GIVEN a weather dashboard with form inputs
// // WHEN I search for a city
// // THEN I am presented with current and future conditions for that city and that city is added to the search history

// // WHEN I view current weather conditions for that city
// // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// // WHEN I view future weather conditions for that city
// // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// // WHEN I click on a city in the search history
// // THEN I am again presented with current and future conditions for that city