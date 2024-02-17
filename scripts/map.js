let map;
let marker;
let markers = [];
let departureMarker;
let destinationMarker;
let icons;

// INITIALIZATION of GOOGLE MAP
async function initMap(){

  // import libraries
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
    zoomControl: true, 
    setComponentRestrictions: { country: "PH"},
    strictBounds: false
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Stations and their corresponding latitude and longitude for markers
  const mrt3stations = [
    {name: "Taft Avenue", coordinates: {lat: 14.537649285161207, lng: 121.00132016763716}, transit: "MRT3"},
    {name: "Magallanes", coordinates: {lat: 14.542021333882266, lng: 121.01948533623766}, transit: "MRT3"},
    {name: "Ayala", coordinates: {lat: 14.54918761935556, lng: 121.02796901365078}, transit: "MRT3"},
    {name: "Buendia", coordinates: {lat: 14.554212109055877, lng: 121.03405766519275}, transit: "MRT3"},
    {name: "Guadalupe", coordinates: {lat: 14.567197046915162, lng: 121.04558682048474}, transit: "MRT3"},
    {name: "Boni", coordinates: {lat: 14.573760772217677, lng: 121.0481488241322}, transit: "MRT3"},
    {name: "Shaw Boulevard", coordinates: {lat: 14.58090071988067, lng: 121.05343849684087}, transit: "MRT3"},
    {name: "Ortigas", coordinates: {lat: 14.587847870919093, lng: 121.05671283638281}, transit: "MRT3"},
    {name: "Santolan-Annapolis", coordinates: {lat: 14.607934957780056, lng: 121.05644177453323}, transit: "MRT3"},
    {name: "Cubao", coordinates: {lat: 14.619489786653645, lng: 121.05112852391959}, transit: "MRT3"},
    {name: "GMA Kamuning", coordinates: {lat: 14.635437915303045, lng: 121.04321491314433}, transit: "MRT3"},
    {name: "Quezon Avenue", coordinates: {lat: 14.642193474106165, lng: 121.03888070320282}, transit: "MRT3"},
    {name: "North Avenue", coordinates: {lat: 14.652189922587004, lng: 121.03232503721284}, transit: "MRT3"}
  ]

  const lrt1stations = [
    {name: "Baclaran", coordinates: {lat: 14.534259361042402, lng: 120.99834927698063}, transit: "LRT1"},
    {name: "EDSA", coordinates: {lat: 14.538713654119604, lng: 121.00065538922644}, transit: "LRT1"},
    {name: "Libertad", coordinates: {lat: 14.547749968443497, lng: 120.99861466878075}, transit: "LRT1"},
    {name: "Gil Puyat", coordinates: {lat: 14.554053459058979, lng: 120.99721187515358}, transit: "LRT1"},
    {name: "Vito Cruz", coordinates: {lat: 14.56356041279164, lng: 120.99478154440041}, transit: "LRT1"},
    {name: "Quirino", coordinates: {lat: 14.570301878660942, lng: 120.99155974749756}, transit: "LRT1"},
    {name: "Pedro Gil", coordinates: {lat: 14.576475896656927, lng: 120.98810591315544}, transit: "LRT1"},
    {name: "United Nations", coordinates: {lat:14.582552044443618, lng: 120.98461925799651}, transit: "LRT1"},
    {name: "Central Terminal", coordinates: {lat: 14.592750768219823, lng: 120.98163227194854}, transit: "LRT1"},
    {name: "Carriedo", coordinates: {lat: 14.599122125622008, lng: 120.98135125837527}, transit: "LRT1"},
    {name: "Doroteo Jose", coordinates: {lat: 14.605453536999105, lng: 120.98203839553712}, transit: "LRT1"},
    {name: "Bambang", coordinates: {lat: 14.611177033275005, lng: 120.98248885457726}, transit: "LRT1"},
    {name: "Tayuman", coordinates: {lat: 14.616772769674554, lng: 120.98273646305441}, transit: "LRT1"},
    {name: "Blumentritt", coordinates: {lat: 14.622638673880513, lng: 120.98290159755022}, transit: "LRT1"},
    {name: "Abad Santos", coordinates: {lat: 14.6306204984719, lng: 120.98146639467295}, transit: "LRT1"},
    {name: "R. Papa", coordinates: {lat: 14.63609147489187, lng: 120.98235941064421}, transit: "LRT1"},
    {name: "5th Avenue", coordinates: {lat: 14.644412305058113, lng: 120.98357182694123}, transit: "LRT1"},
    {name: "Monumento", coordinates: {lat: 14.654367188869754, lng: 120.98389329470618}, transit: "LRT1"},
    {name: "Balintawak", coordinates: {lat: 14.657456906850484, lng: 121.0039170391827}, transit: "LRT1"},
    {name: "Fernando Poe Jr.", coordinates: {lat: 14.65745690977713, lng: 121.02117959044276}, transit: "LRT1"}
  ]

  const lrt2stations = [
    {name: "Recto", coordinates: {lat: 14.603563354790033, lng: 120.98357506684575}, transit: "LRT2"},
    {name: "Legarda", coordinates: {lat: 14.60086500542583, lng: 120.9925814719515}, transit: "LRT2"},
    {name: "Pureza", coordinates: {lat: 14.601748764493554, lng: 121.0051776240505}, transit: "LRT2"},
    {name: "V.Mapa", coordinates: {lat: 14.604079511393822, lng: 121.0171413792474}, transit: "LRT2"},
    {name: "J. Ruiz", coordinates: {lat: 14.610547353713093, lng: 121.02614439921165}, transit: "LRT2"},
    {name: "Gilmore", coordinates: {lat: 14.613527924384984, lng: 121.03417567539013}, transit: "LRT2"},
    {name: "Betty Go-Belmonte", coordinates: {lat: 14.618559000459435, lng: 121.04282130799182}, transit: "LRT2"},
    {name: "Cubao", coordinates: {lat: 14.622739598256825, lng: 121.05277348296076}, transit: "LRT2"},
    {name: "Anonas", coordinates: {lat: 14.627948206184568, lng: 121.06470395320373}, transit: "LRT2"},
    {name: "Katipunan", coordinates: {lat: 14.631138602736003, lng: 121.072956826148}, transit: "LRT2"},
    {name: "Santolan", coordinates: {lat: 14.62211606646923, lng: 121.08593929432817}, transit: "LRT2"},
    {name: "Marikina", coordinates: {lat: 14.620482219981785, lng: 121.10057250609199}, transit: "LRT2"},
    {name: "Antipolo", coordinates: {lat: 14.624880637270977, lng: 121.1214128032166}, transit: "LRT2"}
  ];

  const lengthMrt3 = mrt3stations.length;
  const lengthLrt1 = lrt1stations.length;
  const lengthLrt2 = lrt2stations.length;

  // Creating markers during google map initialization
  for (var i = 0; i < lengthMrt3; i++) {
    addStationMarker(mrt3stations[i]);
  }

  for (var i = 0; i < lengthLrt1; i++) {
    addStationMarker(lrt1stations[i]);
  }

  for (var i = 0; i < lengthLrt2; i++) {
    addStationMarker(lrt2stations[i]);
  }

  // draws path of the train tracks
  drawPath (mrt3stations[0].coordinates, mrt3stations[12].coordinates, 'MRT3')
  drawPath(lrt1stations[0].coordinates, lrt1stations[19].coordinates, 'LRT1');
  drawPath(lrt2stations[0].coordinates, lrt2stations[12].coordinates, 'LRT2');

  searchLocation();
}

// initialize the station markers of MRT 3, LRT 1, LRT 2
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

// compares the distance of the arrival and departure markers among all the markers
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

  return markers[closest];
}

// get the input from search box to search for the optimized route when travelling via train
function searchLocation() {
  
  var departure = new google.maps.places.SearchBox(document.getElementById('departure'));
  var destination = new google.maps.places.SearchBox(document.getElementById('arrival'));

  // polyline for the shown direction
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
  
  // set the img for departure and destination/arrival marker
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

  // set departure location of user when the marker has been dragged
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

  // set destination location of user when the marker has been dragged
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

// Drawing the path and displaying the transit and transfer in results
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

      const move = response.routes[0].legs[0].steps; // accessing travel whether walking or via train
      const moveLength = response.routes[0].legs[0].steps.length; // number of walking and riding a train

      let panelContent = '';
      let panelHTML = '';

      let mrt3Stations = ["Taft Avenue", "Magallanes", "Ayala", "Buendia", "Guadalupe", 
                              "Boni Pioneer Bus Stop", "Shaw Boulevard", "Ortigas", "Santolan-Annapolis", 
                              "Araneta Center-Cubao", "GMA Kamuning Station", "Quezon Avenue", "North Avenue"]
      let lrt1Stations = ["Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
                          "Quirino Station", "Pedro Gil", "United Nations", "Central Terminal",
                          "Carriedo LRT Station", "Doroteo Jose", "Bambang LRT Station", "Tayuman", "Blumentritt",
                          "Abad Santos", "R.Papa LRT Station", "5th Avenue", "Monumento", "Balintawak",
                          "Fernando Poe Jr."]
      let lrt2Stations = ["Recto", "Legarda", "Pureza", "V. Mapa", "J. Ruiz", "Gilmore",
                          "Betty Go-Belmonte", "Araneta Center - Cubao Station", "Anonas", "Katipunan", "Santolan MRT-2 Station",
                              "Marikina", "Antipolo"]

      
      // Accessing the route Google has provided
      for (let i=0, j=1; i<moveLength; i++) {
        var travelMode = move[i].travel_mode;
        var transitCount;

        let count=0;
        let transitOrder;

        console.log(moveLength)

        // counts the number of riding a train
        for (let k=0; k<moveLength; k++) {
          if (move[k].travel_mode === "TRANSIT") { count++; }
          }
        
        if (travelMode === 'TRANSIT') {
          let departureStation = move[i].transit.departure_stop.name;
          let arrivalStation = move[i].transit.arrival_stop.name;
          let departureTransit
          let arrivalTransit

          let line = move[i].transit.line.short_name
          let line2 = move[i].transit.line.name
          let distance;

          // Determining the transit of departure station
          if (mrt3Stations.includes(departureStation)) { departureTransit = "MRT3"} 
          else if (lrt1Stations.includes(departureStation)) { departureTransit = "LRT1" }
          else if (lrt2Stations.includes(departureStation)) { departureTransit = "LRT2" }

          // Determining the transit of arrival station
          if (mrt3Stations.includes(arrivalStation)) { arrivalTransit = "MRT3"} 
          else if (lrt1Stations.includes(arrivalStation)) { arrivalTransit = "LRT1" }
          else if (lrt2Stations.includes(arrivalStation)) { arrivalTransit = "LRT2" }

          // Assigning a different value for fare computation in MRT Line 3
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
                        <div class="station-frame">
                            <img src="../assets/${departureTransit}-line-up.svg" class="line-color"/>
                            <div class="station-name">
                            <!-- change the name of the departure station -->
                            <label id="departure-label">${departureStation}</label>
                             </div>
                            <img src="../assets/line-name-${departureTransit}.png" class="train-line"/> <!-- change the train line -->
                        </div>

                        <div class="station-frame"> 
                            <img src="../assets/${arrivalTransit}-line-down.svg" class="line-color"/>
                            <div class="station-name">
                            <!-- change the name of the departure station -->
                            <label id="arrival-label">${arrivalStation}</label>
                            </div>
                            <img src="../assets/line-name-${arrivalTransit}.png" class="train-line"/> <!-- change the train line -->
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
          transitCount = 1
        }
        
        // determines if the current mode, walking is in between the two modes, transit
        // Only displays when walking is in between the two modes, transit
        else if (travelMode === "WALKING" && transitCount == 1 && count == 2) {

          let destinationStation = move[i+1].transit.departure_stop.name
          let currentStation = move[i-1].transit.arrival_stop.name
          let current
          let destination
          let instructions =  move[i].instructions
          let duration = findTransferTime(currentStation)

          // Determining the departure station
          if (mrt3Stations.includes(currentStation)) { current = "MRT3"} 
          else if (lrt1Stations.includes(currentStation)) { current = "LRT1" }
          else if (lrt2Stations.includes(currentStation)) { current = "LRT2" }

          // Determining arrival station
          if (mrt3Stations.includes(destinationStation)) { destination = "MRT3"} 
          else if (lrt1Stations.includes(destinationStation)) { destination = "LRT1" }
          else if (lrt2Stations.includes(destinationStation)) { destination = "LRT2" }

          console.log("WALKING")
          console.log(move[i])
        
            panelContent = 
              `<div class="transfer-container"> 
              <h3 class="transfer-title">Transfer</h3>
              <div class="current-station"><img class="img-station" src="../assets/${current}-line-up.svg">${currentStation}<img class="img-station" src="../assets/line-name-${current}.png"></div>
              <div class="directions-container">
              ${duration}
              <div class="instruction">&#160${instructions}</div></div>
              <div class="destination-station"><img class="img-station" src="../assets/${destination}-line-down.svg">${destinationStation}<img class="img-station" src="../assets/line-name-${destination}.png"></div>
              </div>`
            panelHTML+=panelContent;
        }

        // Displays directions when walking is not in between two travel mode, transit
        else if (travelMode === 'WALKING') {

          console.log("WALKING TRAVEL")
          let instructions =  move[i].instructions
          console.log(move[i])


          // Assigning values to station depending on the order of walking travel mode
          panelContent = 
              `<div class="transfer-container"> 
              <h3 class="transfer-title">Transfer</h3>
              <div class="directions-container-dir">
              <div class="instruction">${instructions}</div></div>
              </div>`
            panelHTML+=panelContent;
        }
      }

      // another else if for walking after the last travel mode, transit
      document.querySelector(".js-result-panel").innerHTML = panelHTML;

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
}

// when called returns the corresponding time taken in transfer in accordance to the arrival station
function findTransferTime(arrivalStation) {

  if (arrivalStation === 'Recto' || arrivalStation === 'Doroteo Jose' || arrivalStation === 'Taft Avenue' || arrivalStation === 'EDSA') {
    return `<div class="duration">5 Minutes </div>`
    } 
  else if (arrivalStation === 'Araneta Center - Cubao Station' || arrivalStation === 'Araneta Center-Cubao') {
      return `<div class="duration">7 Minutes </div>`
      }
  
  if (arrivalStation === "Fernando Poe Jr." || arrivalStation === "North Avenue") {
    return `<div class="duration">22 Minutes </div>`
  }
}

// draws a polyline, used in map initialization to display the pathway of MRT 3, LRT 1, and LRT 2 transits
function drawPath (origin, destination, type) {

  var directionsService = new google.maps.DirectionsService;

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

// resturns the values of the corresponding fare in accordance to distance, mode, and transit line
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