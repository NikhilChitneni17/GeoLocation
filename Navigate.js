
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
    console.log("executed");
    mapWindow=new google.maps.InfoWindow;
    console.log(positions);
    addMarker({lat:0,lng:150.644});
    document.getElementById("table_container").addEventListener("click",function(){
        console.log("center_changed",positions);
        return addMarker(positions);
    })
    let params=readUrl();
    console.log(params.get("location"));
    if(params.get("location")!=null)
    {
      console.log(params.get("lat"),params.get("lng"));
      addMarker({lat:Number(params.get("lat")),lng:Number(params.get("lng"))});
    }
    //takes coords as parameter,adds the marker on the map on given lat and lng
   function addMarker(coords) {
      if(coords!={})
      {
        coords.lat=Number(coords.lat);
        coords.lng=Number(coords.lng);
      console.log("addmarker");
        marker =  new google.maps.Marker({
          position:coords,
          map:map
      });
      console.log("executed");
    }
    console.log(markers);
     markers.push(marker);
   // let searchLoc=document.getElementById("address").value;
    //mouseover event listener on the maps,opens the mapwindow on the mouseover
    
    google.maps.event.addListener(marker, "mouseover", (function(markers,mapWindow,formattedAdd,marker) {
      return function() {
        console.log(formattedAdd);
        for(let i=0;i<markers.length;i++)
        {
          if(marker==markers[i])
          {
            console.log(formattedAdd,formattedAdd[i-counter],i-counter);
            mapWindow.setContent(" Location="+formattedAdd[i-counter]);
            mapWindow.open(map, markers[i]);
          }
        }
      }
    })(markers,mapWindow,formattedAdd,marker));
    console.log(marker);
  }
  }
  
