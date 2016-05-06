var x=document.getElementById("demo");
var geocoder;

//For button event
function clickButton() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction, {timeout: 5000});
      initialize();
  } else {
    x.innerHTML="Geolocation is not supported by this browser.";
  }
}


//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(lat + " " + lng);
    codeLatLng(lat, lng);
    var gps = lat.toString() + " " + lng.toString();
    console.log("gps: " + gps);
    document.search_a.word.value = gps;

    latlon=new google.maps.LatLng(lat, lng)
    mapholder=document.getElementById('mapholder')
    mapholder.style.height='100px';
    mapholder.style.width='40%';

    var myOptions={
        center:latlon,zoom:17,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:true,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
    var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
    return (lat,lng);
}

//For error occur
function errorFunction(){
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
    alert("Fail to get your location (Geocoder failed)");
}

//To init geocoder
function initialize() {
	 geocoder = new google.maps.Geocoder();
}

//Get the latitude and the longitude
function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                 //formatted address
                 document.getElementById("locatelabel").innerHTML = "Location: " + results[0].formatted_address;
                 //find country name
                 for (var i=0; i<results[0].address_components.length; i++) {
                      for (var b=0;b<results[0].address_components[i].types.length;b++) {
                          //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                          if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                  //this is the object you are looking for
                                  city= results[0].address_components[i];
                                  break;
                          }
                      }
                  }
            } else {
              alert("No results found");
            }
        } else {
          alert("Geocoder failed due to: " + status);
        }
    });
}
