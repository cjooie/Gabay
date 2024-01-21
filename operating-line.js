function getLocationPoints(){
    document.getElementsByClassName("textbox");
}

function interchangeLocation() {
    var departure_value = document.getElementById("departure").value;
    var arrival_value = document.getElementById("arrival").value;

    var temp = departure_value;
    document.getElementById("departure").value = arrival_value;
    document.getElementById("arrival").value = temp;

}

function toggleSidebar() {
    var toggle_sidebar = document.getElementById("btnControl");
    
    if (toggle_sidebar.checked) {
                document.getElementById("mySidebar").style.width = "0";
        document.getElementById("map").style.marginLeft = "0";

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
    
    else {
        document.getElementById("mySidebar").style.width = "450px";
        document.getElementById("map").style.marginLeft = "450px";

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