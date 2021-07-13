

//title layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let baseMaps = {
  Streets: streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
  center: [43.7, -79.3], 
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Access airport Geo JSON URL
// let torontoData = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/torontoRoutes.json"

let torontoHoods = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/torontoNeighborhoods.json"

//let airportData = "https://raw.githubusercontent.com/katelyngaler/Mapping_Earthquakes/main/majorAirports.json"

// Create a style for the lines.
let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  style: myStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup(`<h3> ${feature.properties.AREA_NAME}</h3>`)
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

