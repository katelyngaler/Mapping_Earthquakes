

//title layer
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let baseMaps = {
  Night: night,
  Day: day
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
  center: [44.0, -80.0], 
  zoom: 2,
  layers: [night]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Access airport Geo JSON URL
let torontoData = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/torontoRoutes.json"

//let airportData = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/majorAirports.json"

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  style: myStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup(`<h3> Airline: ${feature.properties.airline} <hr>
    Destination: ${feature.properties.dst}</h3>`)
  }

}).addTo(map);

// , {
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h2>Airport code: " + feature.properties.faa  + "</h2>" + "<hr><h3>Airport name: " + feature.properties.name + "</h3>")
//   }

// }).addTo(map);
});



//Other styles:
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11

