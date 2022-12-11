var map,mapWindow,marker;
let place=document.createElement("div");
place.setAttribute("id","map");
place.classList.add("map");
console.log(document.body);
document.getElementById("app_container").appendChild(place);
function init() {
    var options = {
      center: { lat:0 , lng: 150.644 },
      zoom: 16,     
    }
    map=new google.maps.Map(place,options);
    console.log("executed");
    mapWindow=new google.maps.InfoWindow;
    //takes coords as parameter,adds the marker on the map on given lat and lng
   function addMarker(coords) {
      if(coords!={})
      {
        coords.lat=Number(coords.lat);
        coords.lng=Number(coords.lng);
        marker =  new google.maps.Marker({
          position:coords,
          map:map
      });
    }
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
  function createTable(sectionhead) {
    let table=document.createElement("table");
    table.setAttribute("id","formatted_address"); 
    let head=document.createElement("tr");
    let heading=document.createElement("th");
    heading.innerHTML=sectionhead;
    head.appendChild(heading);
    head.classList.add("thead");
    table.appendChild(head);
    table.classList.add("table");
    return table;
}
function createRow(formattedAddress) {
  let row=document.createElement("tr");
  let value=document.createElement("td");
  //let button=addSaveButton();
  value.innerHTML=formattedAddress;
  row.appendChild(value);
  //row.appendChild(button);
  return row;
}
 function showTable()
{
   let table=createTable("Formatted Address");
   firebase.database().ref('users/1').on("value",function(snapshot){
     console.log(snapshot.val(Address));
   })
}
showTable();


  
  