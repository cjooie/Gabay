let map;
let marker;
let markers = [];
let departureMarker;
let destinationMarker;
let icons;

// INITIALIZATION of GOOGLE MAP
async function initMap(){

  const { Map } = await google.maps.importLibrary("maps");
  const {spherical} = await google.maps.importLibrary("geometry");
  const {PlacesService} = await google.maps.importLibrary("places");

  const position = {lat: 14.581668335819061, lng: 121.05395};

  const mapStyles = [
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

  var mapOptions = {
    zoom: 13.4,
    center: position,
    mapTypeId: 'roadmap',
    streetViewControl: false,
    styles: mapStyles,
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  const mrt3stations = [
    {name: "Taft Avenue", coordinates: {lat: 14.537649285161207, lng: 121.00132016763716}, transit: "MRT3"},
    {name: "Magallanes", coordinates: {lat: 14.542021333882266, lng: 121.01948533623766}, transit: "MRT3"},
    {name: "Ayala", coordinates: {lat: 14.54918761935556, lng: 121.02796901365078}, transit: "MRT3"},
    {name: "Buendia", coordinates: {lat: 14.554593018668525, lng: 121.03450916028318}, transit: "MRT3"},
    {name: "Guadalupe", coordinates: {lat: 14.566753172270388, lng: 121.0454743913069}, transit: "MRT3"},
    {name: "Boni", coordinates: {lat: 14.573760772217677, lng: 121.0481488241322}, transit: "MRT3"},
    {name: "Shaw Boulevard", coordinates: {lat: 14.58121001948985, lng: 121.05359774563499}, transit: "MRT3"},
    {name: "Ortigas", coordinates: {lat: 14.587847870919093, lng: 121.05671283638281}, transit: "MRT3"},
    {name: "Santolan-Annapolis", coordinates: {lat: 14.607353402801348, lng: 121.05665699010544}, transit: "MRT3"},
    {name: "Cubao", coordinates: {lat: 14.619489786653645, lng: 121.05112852391959}, transit: "MRT3"},
    {name: "GMA Kamuning", coordinates: {lat: 14.635328461442384, lng: 121.04354013680073}, transit: "MRT3"},
    {name: "Quezon Avenue", coordinates: {lat: 14.642899452124581, lng: 121.03851597346022}, transit: "MRT3"},
    {name: "North Avenue", coordinates: {lat: 14.652011362895035, lng: 121.0324004080676}, transit: "MRT3"}
  ]

  const lrt1stations = [
    {name: "Baclaran", coordinates: {lat: 14.534259361042402, lng: 120.99834927698063}, transit: "LRT1"},
    {name: "EDSA", coordinates: {lat: 14.539162615662596, lng: 121.00075725698116}, transit: "LRT1"},
    {name: "Libertad", coordinates: {lat: 14.547749968443497, lng: 120.99861466878075}, transit: "LRT1"},
    {name: "Gil Puyat", coordinates: {lat: 14.55423831236342, lng: 120.99715725056345}, transit: "LRT1"},
    {name: "Vito Cruz", coordinates: {lat: 14.56333012395545, lng: 120.99485002426852}, transit: "LRT1"},
    {name: "Quirino", coordinates: {lat: 14.570301878660942, lng: 120.99155974749756}, transit: "LRT1"},
    {name: "Pedro Gil", coordinates: {lat: 14.57652159467787, lng: 120.9882147613933}, transit: "LRT1"},
    {name: "United Nations", coordinates: {lat:14.582552044443618, lng: 120.98461925799651}, transit: "LRT1"},
    {name: "Central Terminal", coordinates: {lat: 14.592750768219823, lng: 120.98163227194854}, transit: "LRT1"},
    {name: "Carriedo", coordinates: {lat: 14.599122125622008, lng: 120.98135125837527}, transit: "LRT1"},
    {name: "Doroteo Jose", coordinates: {lat: 14.605453536999105, lng: 120.98203839553712}, transit: "LRT1"},
    {name: "Bambang", coordinates: {lat: 14.611177033275005, lng: 120.98248885457726}, transit: "LRT1"},
    {name: "Tayuman", coordinates: {lat: 14.61653480645739, lng: 120.98268545017858}, transit: "LRT1"},
    {name: "Blumentritt", coordinates: {lat: 14.622638673880513, lng: 120.98290159755022}, transit: "LRT1"},
    {name: "Abad Santos", coordinates: {lat: 14.630583958546762, lng: 120.9814219767096}, transit: "LRT1"},
    {name: "R. Papa", coordinates: {lat: 14.63609147489187, lng: 120.98235941064421}, transit: "LRT1"},
    {name: "5th Avenue", coordinates: {lat: 14.644412305058113, lng: 120.98357182694123}, transit: "LRT1"},
    {name: "Monumento", coordinates: {lat: 14.654367188869754, lng: 120.98389329470618}, transit: "LRT1"},
    {name: "Balintawak", coordinates: {lat: 14.6574285559376, lng: 121.00369661747241}, transit: "LRT1"},
    {name: "Fernando Poe Jr.", coordinates: {lat: 14.65745690977713, lng: 121.02117959044276}, transit: "LRT1"}
  ]

  const lrt2stations = [
    {name: "Recto", coordinates: {lat: 14.603522783351679, lng: 120.98308551213792}, transit: "LRT2"},
    {name: "Legarda", coordinates: {lat: 14.600949290758683, lng: 120.9928090910209}, transit: "LRT2"},
    {name: "Pureza", coordinates: {lat: 14.601748764493554, lng: 121.0051776240505}, transit: "LRT2"},
    {name: "V.Mapa", coordinates: {lat: 14.604079511393822, lng: 121.0171413792474}, transit: "LRT2"},
    {name: "J. Ruiz", coordinates: {lat: 14.610547353713093, lng: 121.02614439921165}, transit: "LRT2"},
    {name: "Gilmore", coordinates: {lat: 14.613527924384984, lng: 121.03417567539013}, transit: "LRT2"},
    {name: "Betty Go-Belmonte", coordinates: {lat: 14.618559000459435, lng: 121.04282130799182}, transit: "LRT2"},
    {name: "Cubao", coordinates: {lat: 14.622739598256825, lng: 121.05277348296076}, transit: "LRT2"},
    {name: "Anonas", coordinates: {lat: 14.627948206184568, lng: 121.06470395320373}, transit: "LRT2"},
    {name: "Katipunan", coordinates: {lat: 14.631093507987051, lng: 121.07250145735868}, transit: "LRT2"},
    {name: "Santolan", coordinates: {lat: 14.62211606646923, lng: 121.08593929432817}, transit: "LRT2"},
    {name: "Marikina", coordinates: {lat: 14.620388173583367, lng: 121.10027391749911}, transit: "LRT2"},
    {name: "Antipolo", coordinates: {lat: 14.624880637270977, lng: 121.1214128032166}, transit: "LRT2"}
  ];

  const lengthMrt3 = mrt3stations.length;
  const lengthLrt1 = lrt1stations.length;
  const lengthLrt2 = lrt2stations.length;

  for (var i = 0; i < lengthMrt3; i++) {
    addStationMarker(mrt3stations[i]);
  }

  for (var i = 0; i < lengthLrt1; i++) {
    addStationMarker(lrt1stations[i]);
  }

  for (var i = 0; i < lengthLrt2; i++) {
    addStationMarker(lrt2stations[i]);
  }

  drawPath (mrt3stations[0].coordinates, mrt3stations[12].coordinates, 'MRT3')
  drawPath(lrt1stations[0].coordinates, lrt1stations[19].coordinates, 'LRT1');
  drawPath(lrt2stations[0].coordinates, lrt2stations[12].coordinates, 'LRT2');

  searchLocation();
}

function addStationMarker(station) {
  marker = new google.maps.Marker({
    position: station.coordinates, 
    map,
    title: station.name,
    icon: {
        url: "../SVG-files/" + station.transit +"-marker.svg",
        scaledSize: new google.maps.Size(28, 40)
    }
  });
  markers.push(marker);
}

function findClosestStation(coordinates) {
  var distances = [];
  var closest = -1;
  for (i = 0; i < markers.length; i++) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(markers[i].position, coordinates);
    distances[i] = distance;
    if (closest == -1 || distance < distances[closest]) {
      closest = i;
    }
  }
  console.log(`<p> Closest marker is: ${markers[closest].title + ' ' + markers[closest].position}</p>`);

  console.log(markers[closest]);
  return markers[closest];
}

function searchLocation() {
  
  var departure = new google.maps.places.SearchBox(document.getElementById('departure'));
  var destination = new google.maps.places.SearchBox(document.getElementById('arrival'));
  const directionsOptions = {
    suppressMarkers: true,
    polylineOptions: {
      zIndex: 1,
      strokeColor: '#FC2691',
      strokeOpacity: 0.6,
      strokeWeight: 8,
    }
  }

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);
  const service = new google.maps.DistanceMatrixService();

  directionsDisplay.setMap(map);
  
  departureMarker = new google.maps.Marker({
    position: null,
    map: map,
    draggable: true,
    icon: {
      url: "../SVG-files/depart.svg",
      scaledSize: new google.maps.Size(28, 40)
  }
  });

  destinationMarker = new google.maps.Marker({
    position: null,
    map: map,
    draggable: true,
    icon: {
      url: "../SVG-files/arrival.svg",
      scaledSize: new google.maps.Size(28, 40)
  }
  });

  // set departure location of user
  google.maps.event.addListener(departure, 'places_changed', 
  function(){

    const places = departure.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    const place = places[0];

    bounds.extend(place.geometry.location);
    departureMarker.setPosition(place.geometry.location)

    map.fitBounds(bounds);
    map.setZoom(15);
  })

  // set destination location of user
  google.maps.event.addListener(destination, 'places_changed', 
  function(){

    const places = destination.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    const place = places[0];

    bounds.extend(place.geometry.location);
    destinationMarker.setPosition(place.geometry.location)

    map.fitBounds(bounds);
    map.setZoom(15);
  })

  // Display route once submit has been clicked
  document.getElementById("btn-search").addEventListener("click", () => 
  {displayRoute(directionsService, directionsDisplay, service);
  }
  )
}

function displayRoute (directionsService, directionsDisplay) {

  const originStation = departureMarker.getPosition();
  const originCoordinates = findClosestStation(originStation).position;
  const destinationStation = destinationMarker.getPosition();
  const destinationCoordinates = findClosestStation(destinationStation).position;

  directionsService.route({
    origin: originCoordinates,
    destination: destinationCoordinates,
    travelMode: 'TRANSIT',
    transitOptions: {
      modes: ['TRAM']
    },
    unitSystem: google.maps.UnitSystem.METRIC
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);

      const move = response.routes[0].legs[0].steps;
      const moveLength = response.routes[0].legs[0].steps.length; // number of walking and riding a train
      const mode = move

      let panelContent = '';
      let panelHTML = '';
      
      for (let i=0, j=1; i<moveLength; i++) {
        
        let travelMode = move[i].travel_mode;
        let lastTransit = 0
        let count = 0

        console.log(travelMode)

        // counts the number of riding a train
        for (let k=0; k<moveLength; k++) {
          if (mode[k].travel_mode === "TRANSIT")
            count++;
          if (count > 0)
            lastTransit=k;
          }

        if (travelMode === 'TRANSIT') {
          var departureStation = move[i].transit.departure_stop.name;
          var arrivalStation = move[i].transit.arrival_stop.name;
          let departureTransit
          let arrivalTransit
          
          console.log("Departure Stop")
          console.log(move[i].transit.departure_stop)

          let line = move[i].transit.line.short_name
          let line2 = move[i].transit.line.name
          let distance;

          let mrt3Stations = ["Taft Avenue", "Magallanes", "Ayala", "Buendia", "Guadalupe", 
                              "Boni", "Shaw Boulevard", "Ortigas", "Santolan-Annapolis", 
                              "Cubao MRT", "GMA Kamuning", "Quezon Avenue", "North Avenue"]
          let lrt1Stations = ["Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
                              "Quirino", "Pedro Gil", "United Nations", "Central Terminal",
                              "Carriedo", "Doroteo Jose", "Bambang", "Tayuman", "Blumentritt",
                              "Abad Santos", "R. Papa", "5th Avenue", "Monumento", "Balintawak",
                              "Fernando Poe Jr."]
          let lrt2Stations = ["Recto", "Legarda", "Pureza", "V. Mapa", "J. Ruiz", "Gilmore",
                              "Betty Go-Belmonte", "Araneta Center - Cubao Station", "Anonas", "Katipunan", "Santolan",
                              "Marikina", "Antipolo"]

              

          console.log('Departure Station')
          console.log(departureStation)
          console.log('Arrival Station')
          console.log(arrivalStation)
          
          //Determining the transit of departure station
          if (mrt3Stations.includes(departureStation)) { departureTransit = "MRT3"} 
          else if (lrt1Stations.includes(departureStation)) { departureTransit = "LRT1" }
          else if (lrt2Stations.includes(departureStation)) { departureTransit = "LRT2" }

          //Determining the transit of arrival station
          if (mrt3Stations.includes(arrivalStation)) { arrivalTransitTransit = "MRT3"} 
          else if (lrt1Stations.includes(arrivalStation)) { arrivalTransitTransit = "LRT1" }
          else if (lrt2Stations.includes(arrivalStation)) { arrivalTransitTransit = "LRT2" }

          if (line === "MRT Line 3")
            { distance = move[i].transit.num_stops; } 
          else { distance = move[i].distance.value/1000; }
          
          let beepCardFare = computeFare(distance, "Beep Card", line, line2)
          let singleJourneyFare = computeFare(distance, "Single Journey", line, line2)

          panelContent = 
            `
            <div class="distance-time-fare-container">
                <div id="distance-time-stations">
                    <div id="distance-time" class="row1">
                        <img id="distance-icon" src="../assets/icon-distance.svg">
                        <!-- change the total distance -->
                        <label id="distance">${move[i].distance.text}</label>
                        <img id="time-icon" src="../assets/icon-time.svg">
                        <!-- change the total number of travel in minutes -->
                        <label id="time">${move[i].duration.text}</label>
                    </div>
                    <div id="stations">
                        <div class="station-frame"> <!--${departureTransit} -->
                            <img src="../assets/line-color-LRT1.svg" class="line-color"/>
                            <div class="station-name">
                            <!-- change the name of the departure station -->
                            <label id="departure-label">${departureStation}</label>
                             </div>
                            <img src="../assets/line-name-lrt-1.png" class="train-line"/> <!-- change the train line -->
                        </div>

                        <div class="station-frame"> 
                            <img src="../assets/line-color-LRT2.svg" class="line-color"/>
                            <div class="station-name">
                            <!-- change the name of the departure station -->
                            <label id="arrival-label">${arrivalStation}</label>
                            </div>
                            <img src="../assets/line-name-lrt-2.png" class="train-line"/> <!-- change the train line -->
                        </div>
                    </div>
                </div>
                <div id="fare">
                    <div class="fare-frame">
                        <div class="row1">
                            <label class="fare-label-${j} fare-label"></label>
                            <!-- change according to the computed total fare -->
                            <span class="StoredValueLabel">FARE VALUE</span>
                        </div>

                        <div class="fare-options" onload="fareValue(null)">
                            <button id="beep-${j}" class="beep" onclick="fareValue(this, ${beepCardFare},${singleJourneyFare}, ${j})"> Beep Load </button>
                            <button id="single-journey-${j}" class="single-journey" onclick="fareValue(this, ${beepCardFare},${singleJourneyFare}, ${j})"> Single Journey </button>
                        </div>
                    </div>
                </div>
              </div>
            `
          panelHTML+=panelContent;
          j++;

        }
        
        // determines if the current mode [walking] is in between the two modes transit
        else if (i == lastTransit-1 && count > 2) {

          let destinationStation = move[i+1].transit.departure_stop.name
          let currentStation = move[i-1].transit.arrival_stop.name
        
            panelContent = 
              `<div> 
              <h3>Transfer</h3>
              <div>From: ${currentStation}</div>
              <div>Walk to:${destinationStation}</div>
              </div>`
            panelContent+=findTransferTime(arrivalStation);
            panelHTML+=panelContent;
        }
      }
      document.querySelector(".js-result-panel").innerHTML = panelHTML;

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
}

function findTransferTime(arrivalStation) {

  let panelContent = '';

  if (arrivalStation === 'Recto' || arrivalStation === 'Doroteo Jose' || arrivalStation === 'Taft Avenue' || arrivalStation === 'EDSA') {
    return `<div>Duration: 5 minutes</div>`
    } else {
      return `<div>Duration: 7 minutes</div>`
      }
}

function drawPath (origin, destination, type) {

  var directionsService = new google.maps.DirectionsService;
  console.log(origin)

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: 'TRANSIT',
    transitOptions: {
      modes: ['TRAM',]
    },
    unitSystem: google.maps.UnitSystem.METRIC

  }, function(response, status) {

    if (status === 'OK') {
      
      const points = response.routes[0].overview_path;
      let color = '';

      if (type === 'MRT3') {
         color = '#fcdb62'
      } else if (type === 'LRT1') {
          color = '#87fa84'
      } else if (type === 'LRT2') {
          color = '#de9dfc'
      }
      
      const path = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1,
        fillColor: color,
        strokeWeight: 5.5,
      })
    
      path.setMap(map);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
}

function computeFare(distance, mode, line, line2) {
  
  let fare = 0;

  if (line === "MRT Line 3") {
    if (distance <=2) { fare = 13 } 
    else if (distance <= 4) { fare = 16 }
    else if (distance <= 7) { fare = 20 }
    else if (distance <= 10) { fare = 24 }
    else if (distance > 12) { fare = 28 }

    return fare;
  }


  if (mode === 'Beep Card' && (line === "LRT Line 1" || line2 === "LRT Line 2")) {

    fare = distance * 1.21 + 13.29;
    fare = Math.round(fare);
    return fare;
  }
  
  else if (mode === "Single Journey" && line === "LRT Line 1") {

    if (distance > 0 && distance <= 1.9) { fare = 15 } 
    else if (distance > 1.9 && distance <= 5.878) { fare = 20 }
    else if (5.878 > 0 && distance <= 10) { fare = 25 }
    else if (10 > 0 && distance <= 13.954) { fare = 30 }
    else if (13.954 > 0 && distance <= 18.073) { fare = 35 }

    return fare;
  }

  else if (mode === "Single Journey" && line2 === "LRT Line 2") {

    if (distance > 0 && distance <= 2) { fare = 15 } 
    else if (distance > 2 && distance <= 5.9) { fare = 20 }
    else if (distance > 5.9 && distance <= 10) { fare = 25 }
    else if (distance > 10 && distance <= 12.6) { fare = 30 }
    else if (distance > 12.6 && distance <= 16.587) { fare = 35 }

    return fare;
  }
}

