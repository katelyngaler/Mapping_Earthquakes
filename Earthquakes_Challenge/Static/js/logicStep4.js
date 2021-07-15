

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
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create earthquake layer
let earthquakes = new L.layerGroup();

// Create overlay object
let overlays = {
  Earthquaes: earthquakes
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
  center: [39.5, -98.5], 
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);


// function for style
function styleInfo(feature){
  return{
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// radius based on magnitude
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// function to determine color based on magnitude
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// Grabbing our GeoJSON data. - add to overlay
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
//  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  pointToLayer: function(feature, latlng){
    console.log(data);
    return L.circleMarker(latlng)
  },
  style: styleInfo,
  onEachFeature: function(feature, layer) {
    layer.bindPopup(`Magnitude: ${feature.properties.mag} <br> Location: ${feature.properties.place}`);
  }
  }).addTo(earthquakes);

});

//add overlay to map
earthquakes.addTo(map);


//Other styles:
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11

