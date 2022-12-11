
/**
 * handleForm handles the form created in the html
 */
function handleForm() {
    console.log("handleform");
    let table=createTable("Formatted Address");
    console.log("handlingform");
    document.getElementById("table_container").appendChild(table);
    let search=document.getElementById("address");
    console.log(search.value);
    let key="AIzaSyCtqSZ-0fMP2eTqFYa4qXUPeRqDcv6h2bI"; //key for google API's
    document.addEventListener("submit",function(e){
        e.preventDefault();
        return geoCode(search,key,table);
    });
    checkForUrl(key);
}
/**
 * geoCode calls the Geocoding API using XHR request(GET request) and returns the response to the table
 * @param {string} search 
 * @param {string} key 
 * @param {table} table 
 */
function geoCode(search,key,table) {
    var locations;
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+search.value+"&key="+key); 
    xhr.onload=function() {
        console.log(xhr.response);
        locations=xhr.response;
        clickableRows(locations,table,search.value);
    }
    xhr.responseType="json";
    xhr.send();
}

/**
 * navigateOnClick navigates to the location (lat and lng which are described in the position) 
 * using mapWindow object and opens the map
 * @param {object} positions 
 * @param {string} formattedAddress 
 */
function navigateOnClick(positions,formattedAddress) {
    positions.lat=Number(positions.lat);
    positions.lng=Number(positions.lng);
    mapWindow.setPosition(positions);
    //map.setCenter(positions);
    mapWindow.setContent(" Location="+formattedAddress);
    mapWindow.open(map);

}
/**
 * createRow creates the row dynamically with one value and returns the row
 * @param {string} formattedAddress 
 */
function createRow(formattedAddress) {
    let row=document.createElement("tr");
    let value=document.createElement("td");
    //let button=addSaveButton();
    value.innerHTML=formattedAddress;
    row.appendChild(value);
    //row.appendChild(button);
    return row;
}

/**
 * createTable creates the table dynamically with sectionhead as heading and returns the table
 * @param {string} sectionhead 
 */
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

/**
 * clcikcableRows clears the previous row data,makes the row clickable using click event and allows to
 * navigate to the location
 * @param {object} locations 
 * @param {table} table 
 * @param {string} searchLoc 
 */
function clickableRows(locations,table,searchLoc) {
    let table_length=table.rows.length;
    for(let i=1; i<table_length; i++) {
        table.deleteRow(1);
    }
    console.log(table);
    
    for(let i=0; i<locations.results.length; i++) //
    {
        var formattedAddress=tlocations.results[i].formatted_address;
       // var postalcode=locations.results[i].address_components[0].long_name;
        let row=createRow(formattedAddress);
        let button = addSaveButton();
        row.appendChild(button);
        console.log("one");
        addresses.push(formattedAddress);
        row.addEventListener("click",function(){
            positions.lat=locations.results[i].geometry.location.lat;
            positions.lng=locations.results[i].geometry.location.lng;
            formattedAddress=locations.results[i].formatted_address;
            formattedAdd.push(formattedAddress);
            urlUpdate();
            console.log(positions);
           navigateOnClick(positions,formattedAddress);
          
          });
          button.addEventListener("click",function(e){
            alert("saved to firebase"+formattedAddress);
            firebase.database().ref('addresses/'+addresscount).set({
                Address:addresses[addresscount++]
            })
            e.stopPropagation();
            button.disabled=true;
        });
        table.appendChild(row);
        
    }

}

/**
 * urlUpdate updates the url of the page without reloading it
 */
function urlUpdate() {
    let url="?";
    for(let i in positions)
    {
        url=url+i+"="+positions[i];
        url=url+"&"
    }
    url=url+"location="
    url=url+document.getElementById("address").value;
    window.history.pushState({},"",url);
}

/**
 * readUrl reads the current url of the page and returns the parameters defined in the query string
 * Uses URLSearchParams
 */
function readUrl() {
    let url=window.location.search;  //returns parameters
    let params=new URLSearchParams(url);
    return params;
}

/**
 * checkForUrl checks for the url parameters,if paramaters are not null,makes a API request to the 
 * geocoding api and navigates to the location
 * effectively makes the sharable url
 * @param {string} key 
 */
function checkForUrl(key) {
    let params=readUrl();
    let searchLoc=params.get("location");
    var locations;
    console.log(searchLoc);
    if(searchLoc!=null)
    { 
        console.log("happened");
        var xhr=new XMLHttpRequest();
        xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+searchLoc+"&key="+key); 
        xhr.onload=function() {
            console.log(xhr.response);
            locations=xhr.response;
            console.log(params.get("lat"),params.get("lng"));
            console.log(locations.results[0].geometry.location.lat);
           // console.log(locations.results[1].geometry.location.lat);
            for(let i=0;i<locations.results.length;i++)
            {
                var formattedAddress=locations.results[i].formatted_address;
            if((locations.results[i].geometry.location.lat==params.get("lat"))) {
                console.log("executed");
                formattedAdd.push(formattedAddress);
            positions.lat=locations.results[i].geometry.location.lat;
            positions.lng=locations.results[i].geometry.location.lng;
            }
            navigateOnClick(positions,formattedAddress);
            }
        }
        xhr.responseType="json";
        xhr.send();
    }
}
console.log(handleForm());
function addSaveButton() {
    let button = document.createElement("input");
    button.setAttribute("id","save");
    button.setAttribute("type","button");
    button.setAttribute("value","save");
    return button;
}