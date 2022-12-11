function Search(){
    this.positions={};
    this.formattedAddress="";
    this.locations;
    this.table;
}
Search.prototype.geocode=function(address,key) {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+address.value+"&key="+key); 
    xhr.onload=function() {
        console.log(xhr.response);
        this.locations=xhr.response;
    }
    xhr.responseType="json";
    xhr.send();
}
Search.prototype.createTable=function() {
    this.table=document.createElement("table");
    this.table.setAttribute("id","formatted_address"); 
    let head=document.createElement("tr");
    let heading=document.createElement("th");
    heading.innerHTML=sectionhead;
    head.appendChild(heading);
    head.classList.add("thead");
    this.table.appendChild(head);
    this.table.classList.add("table");
}
Search.prototype.craeteRow=function() {
    let row=document.createElement("tr");
    let value=document.createElement("td");
    value.innerHTML=formattedAddress;
    row.appendChild(value);
    return row;
}
Search.prototype.urlUpdate=function() {
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
Search.prototype.clickableRows=function() {
    let table_length=table.rows.length;
    for(let i=1; i<table_length; i++) {
        table.deleteRow(1);
    }
    console.log(table);
    
    for(let i=0; i<locations.results.length; i++) //
    {
        var formattedAddress=locations.results[i].formatted_address;
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