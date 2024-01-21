function getLocationPoints(){
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    document.getElementById("departure-label").textContent = departure_value;
    document.getElementById("arrival-label").textContent = arrival_value;

    checkInputAndShowResults();
}

function interchangeLocation() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    var temp = departure_value;
    document.getElementById("departure").value = arrival_value;
    document.getElementById("arrival").value = temp;

}

function checkInputAndShowResults() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;
    var resultSection = document.querySelector(".result-section");

    if (departure_value.trim() !== "" && arrival_value.trim() !== "") {
        resultSection.classList.remove("hidden");
    } else {
        resultSection.classList.add("hidden");
    }
}

function fareValue(button){ /** change the value of the fares according to the fare matrix */
    var fare_option = button.id;
    var fare_value = 0;

    if (fare_option == "beep") {
        fare_value = 20;        /* Example only */
    } else if (fare_option == "single-journey") {
        fare_value = 18;        /* Example only */
    }
    
    document.getElementsByClassName("fare-label")[0].innerText = "₱" + fare_value;
}

function toggleSidebar() {
    var toggle_sidebar = document.getElementById("btnControl");
    
    if (toggle_sidebar.checked) {
                document.getElementById("mySidebar").style.height = "0";
        document.getElementById("map").style.marginBottom = "0";

        var style = `
        .sidebar-btn{
            transform: scaleY(1);
        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);
    } 
    
    else {
        document.getElementById("mySidebar").style.height = "400px";
        document.getElementById("map").style.marginBottom = "0px";

        var style = `
        .sidebar-btn{
            transform: scaleY(-1);
        }
        `
        var stylesheet = document.createElement("style");
        stylesheet.innerText = style;
        document.head.appendChild(stylesheet);
    }
}