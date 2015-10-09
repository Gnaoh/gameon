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
	function renderMap(loc, htmlTag){
		
		var address = loc.replace(" ","+") || "SanFrancisco";	
		$.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : address}, function (data) {
		ltlg = data.results[0].geometry.location;

     //function below needs to be called at the end of callback function
		MakeCityEventMap(ltlg, htmlTag);

		});
	}
	
 	function MakeCityEventMap(point, idHTMLtag){
 		map = new google.maps.Map(document.getElementById(idHTMLtag), {
 			center: point,
 			zoom:14

 		});
 		markerPush(point)
 	}

	function makeMap(selector, config) {
		map = new google.maps.Map(document.getElementById(selector), {
			center: config.center,
			zoom: config.zoom || 10
		});
	}

	//functions finds the latitude and longitude of the cities passed in the array CityNames
	function citiesLntLng(cityNames){
		cityNames.forEach(function(city){
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

// function locHandler () { 
	// below is only good for an array

//         var locArray = $('.act-loc').val().split(" ");
//         var addr = locArray.join("+");
//         $.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : addr}, function (data) {
//             LatLng = data.results[0].geometry.location;
            
//         getMap();
//         })
// }


// function markerPush(cityNames) {
// 	var pinArr = cityNames;
//    	console.log ("this is pin-loc", pinArr);
// 	pinArr.forEach(function(el) {
// 		link = el.name.replace(/\s/g, '-')
// 		var marker = new google.maps.Marker({
// 			position: el.LatLng,
// 			map: map,
// 			url: "http://localhost:3000/cities/" + link,
// 			title: el.name
// 		})
// 		var info = createInfoWindow(el.description);
// 		google.maps.event.addListener(marker, 'mouseover', function() {
// 			info.open(map,marker);
// 		});
// 		google.maps.event.addListener(marker, 'mouseout', function() {
// 			info.close(map,marker);
// 		// });
// 		google.maps.event.addListener(marker, 'click', function() {
// 			window.location.href =  marker.url;
// 		});
// 		markers.push(marker)
// 		console.log (markers);
// 	});
// };
var defaultBounds; 
defaultBounds = new google.maps.LatLngBounds(
new google.maps.LatLng(71.3867745,-66.9502861),
new google.maps.LatLng(18.9110642,172.4458955));

var options = {
	bounds: defaultBounds
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), options);

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
// function geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy
//       });
//       autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }

