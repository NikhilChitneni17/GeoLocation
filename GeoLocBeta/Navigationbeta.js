var map,mapWindow,marker;
let place=document.createElement("div");
place.setAttribute("id","map");
place.classList.add("map");
console.log(document.body);
document.getElementById("app_container").appendChild(place);
/**
 * init is the callback function used in requesting the google maps api javascirpt
 * we can use the google maps api functions without actually downloading the total script file
 */
function init() {
    var options = {
      center: { lat:0 , lng: 150.644 },
      zoom: 16,     
    }
    map=new google.maps.Map(place,options);
    mapWindow=new google.maps.InfoWindow;
  }