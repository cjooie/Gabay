/** fetches the location points given by the user */
function getLocationPoints(){
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;
    
    document.getElementById("departure-label").textContent = departure_value;
    document.getElementById("arrival-label").textContent = arrival_value;

    showResult();
}

/** displays the result */
function showResult() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;
    var resultSection = document.querySelector(".result-section");
    var searchSection = document.querySelector("#search");

    if (departure_value !== "" && arrival_value !== "") {
        resultSection.style.visibility = "visible";
        searchSection.style.height = 0;
    } else {
        alert("Incomplete location points");
        resultSection.style.visibility = "hidden";
    }
}

/** option to interchange value of departure and arrival stations */
function interchangeLocation() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    var temp = departure_value;
    document.getElementById("departure").value = arrival_value;
    document.getElementById("arrival").value = temp;

}

/** fetch and display the fare value */
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

/** shows the estimated distance and time travelled */
function displayEstDistanceAndTime(distance, duration){
    var distance_value = document.getElementById("distance");
    var time_value = document.getElementById("time");

    distance_value.innerText = distance + " m";
    time_value.innerText = duration + " mins";
}

/** animation for the user interface */
function toggleSidebar() {
    var toggle_sidebar = document.getElementById("btnControl");
    
    if (toggle_sidebar.checked) {
        document.getElementById("mySidebar").style.height = "0px";
        document.getElementById("map").style.marginBottom = "0px";
        var style = `
        .sidebar-btn{
            transform: rotate(90deg);
            .textbox, .btn-interchange{
                display: flex;
            }
            
            #search.section{
                height: 80px;
            }

        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);
    } 
    
    else {
        document.getElementById("mySidebar").style.height = "500px";
        document.getElementById("map").style.marginBottom = "0px";

        var style = `
        .sidebar-btn{
            transform: rotate(270deg);
        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);

    }
}
function hideBar(){
    var hamburger_menu = document.getElementById("hamburger-menu");

    if(hamburger_menu.checked){
        var style = `
        .sidebar-btn{
            height: 0px;
            width: 0px;
        }
        `
        
    } 
    
    else {
        var style = `
        .sidebar-btn{
            height: 40px;
            width: 40px;
            transition-delay: 0.3s;
        }
        `
    }

    var stylesheet = document.createElement("style");
    stylesheet.innerText = style;
    document.head.appendChild(stylesheet);
}