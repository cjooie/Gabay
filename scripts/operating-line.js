/*function getLocationPoints(){
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    document.getElementById("departure-label").textContent = departure_value;
    document.getElementById("arrival-label").textContent = arrival_value;
}**/

function showResult() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;
    var resultSection = document.querySelector(".result-section");
    var searchSection = document.getElementById("search");

    if (departure_value !== "" && arrival_value !== "") {
        searchSection.classList.add("activate"); // Add the class to apply styles
        resultSection.style.visibility = "visible";

    } else {
        alert("Incomplete location points");
        resultSection.style.visibility = "hidden";
        searchSection.classList.remove("activate"); // Remove the class to reset styles
    }

    fareValue(document.getElementById("single-journey"));
    displayEstDistanceAndTime();
}

function interchangeLocation(){
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    var temp = departure_value;
    document.getElementById("departure").value = arrival_value;
    document.getElementById("arrival").value = temp;

}

function fareValue(button, beep, singleJourney, num){
    /** change the value of the fares according to the fare matrix */
    var fare_option = button.id 
    var fare_value = 0;

    /* Place fare value here */

    if (fare_option == `beep-${num}`){
        fare_value = beep;                        
        document.getElementById(`beep-${num}`).classList.remove("active");
        document.querySelector(`.fare-label-${num}`).innerText = "₱" + fare_value;
    }
    
    else if (fare_option == `single-journey-${num}`){
        fare_value = singleJourney;
        document.getElementById(`single-journey-${num}`).classList.add("active");
        document.querySelector(`.fare-label-${num}`).innerText = "₱" + fare_value;
    }
}

function displayEstDistanceAndTime(distance, duration){
    var distance_value = document.getElementById("distance");
    var time_value = document.getElementById("time");

    distance_value.innerText = distance + " m";
    time_value.innerText = duration + " mins";
}

function toggleSidebar(){
    var toggle_sidebar = document.getElementById("btnControl");
    
    if (toggle_sidebar.checked){
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("map-placeholder").style.marginLeft = "0";

        var style = `
        .sidebar-btn{
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);
    }
    else{
        document.getElementById("mySidebar").style.width = "450px";
        document.getElementById("map-placeholder").style.marginLeft = "450px";

        var style = `
        .sidebar-btn{
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);
    }
}