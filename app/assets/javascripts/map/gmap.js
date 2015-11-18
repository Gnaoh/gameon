var map;
var markers = [];
var LatLng = { lat: 37.09, lng: -95.71};
var ltlg;
var arrayOfCities = [];
//var for autocomplete
var placeSearch;
var autocomplete;

$( document ).ready(function() {
	$(".player").YTPlayer();
});
 // ex: https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
function renderMap(locationEvent, htmlTag, addresses){
	var loc;
	var address;
	if (!Array.isArray(addresses)){
	loc = addresses;
	console.log("it is not an array")
	address = loc.replace(" ","+") || "SanFrancisco";	
	$.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : address}, function (data) {
	ltlg = data.results[0].geometry.location;

   //function below needs to be called at the end of callback function
   console.log("calling MakeCityEventMap")
	MakeCityEventMap(ltlg, htmlTag);

	});
    }
    else{
    	loc = locationEvent;
    	console.log("it is an ARRAY!")
		address = loc.replace(" ","+") || "SanFrancisco";	
		$.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : address}, function (data) {
		ltlg = data.results[0].geometry.location;

	   //function below needs to be called at the end of callback function

		console.log("calling makeMap")
		makeMap(ltlg, htmlTag, addresses);
		});
        }

}

function MakeCityEventMap(point, idHTMLtag){
	map = new google.maps.Map(document.getElementById(idHTMLtag), {
		center: point,
		zoom:12,zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
	});
	 markerPush(point);
}

function makeMap(config, selector, addresses) {
	map = new google.maps.Map(document.getElementById(selector), {
		center: config.center || config,
		zoom: config.zoom || 12,
		scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
	});
		citiesLntLng(addresses);
}

//functions finds the latitude and longitude of the cities passed in the array CityNames

function citiesLntLng(cityOrEvent){
	cityOrEvent.forEach(function(city){
 		var oneCity = city.replace(" ","+");
 		//Ajax request to find the lat & long of the array of cities that I am passing
	 	$.get("https://maps.googleapis.com/maps/api/geocode/json?" , { "address" : oneCity}, function (response){
	 		LatLng = response.results[0].geometry.location;
	 		console.log("this is lat and long" , LatLng);
	 		//Ajax response cannot be predicted. Passing answer as received as arg to the markerPush function
	 		markerPush(LatLng)
	 	});	
	});
	
}
	//function builds marker when receive. No need to build an arrays of objects
function markerPush(latsNlongs){
		var marker = new google.maps.Marker({
			position: latsNlongs,
			map: map
		});
}

var defaultBounds; 
defaultBounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(71.3867745,-66.9502861),
	new google.maps.LatLng(18.9110642,172.4458955)
);

var options = {
	bounds: defaultBounds
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), options);

}

