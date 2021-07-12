// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -90.3790], 4);

// Coordinates for each point to be used in the line.
let line = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

  // Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "blue",
    weight: 4,
    dashArray: "5,10",
    opacity: 0.4
  }).addTo(map);

// An array containing each city's location, state, and population.
// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city);
//     L.circleMarker(city.location, {
//         color: "orange",
//         fillColor: "orange",
//         lineWeight: 4,
//         radius: (city.population-200000)/100000
//     }).bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
//    });

//  Add a marker to the map for Los Angeles, California.
// let marker = L.circleMarker([34.0522, -118.2437],{
//     color: "black",
//     fillColor: "#ffffa1",
//     radius: 300
// }).addTo(map);

//title layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

//Other styles:
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11

// Then we add our streets to the title layer
streets.addTo(map);