// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
    
//   }

//   L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup("<h2>" + feature.properties.faa + "</h2>" + "<h3>" + feature.properties.name + "</h3>")
      
//     }

// }).addTo(map);

  // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "blue",
//     weight: 4,
//     dashArray: "5,10",
//     opacity: 0.4
//   }).addTo(map);

// An array containing each city's location, state, and population.
// Get data from cities.js
// let cityData = cities;

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
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our streets to the title layer
streets.addTo(map);

// Access airport Geo JSON URL
let airportData = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h2>Airport code: " + feature.properties.faa  + "</h2>" + "<hr><h3>Airport name: " + feature.properties.name + "</h3>")
  }

}).addTo(map);
});



//Other styles:
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11

