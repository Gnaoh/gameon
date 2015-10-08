var map;
var markers = [];
var LatLng = { lat: 37.09, lng: -95.71};
var ltlg;
var arrayOfCities = [];

$( document ).ready(function() {
	$(".player").YTPlayer();
});
 // ex: https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

	function renderMap(loc, htmlTag){
		
		var address = loc.replace(" ","+");	
		$.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : address}, function (data) {
		ltlg = data.results[0].geometry.location;

     //function below needs to be called at the end of callback function
		MakeCityEventMap(ltlg,htmlTag);

		});
	}

 	
 	function MakeCityEventMap(point, idHTMLtag){
 		map = new google.maps.Map(document.getElementById(idHTMLtag), {
 			center: point,
 			zoom:10
 		});
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


// function setMapOnAll(map) {
// 	for (var i = 0; i < markers.length; i++) {
// 		markers[i].setMap(map);
// 	}
// };


// 	function markerPush(arr) {
// 		arr.forEach(function(el) {
// 			link = el.name.replace(/\s/g, '-')
// 			var marker = new google.maps.Marker({
// 				position: el.LatLng,
// 				map: map,
// 				url: "http://localhost:3000/cities/" + link,
// 				title: el.name
// 		})
// 			var info = createInfoWindow(el.description);
// 		google.maps.event.addListener(marker, 'mouseover', function() {
// 			info.open(map,marker);
// 		});
// 		google.maps.event.addListener(marker, 'mouseout', function() {
// 			info.close(map,marker);
// 		});
// 		google.maps.event.addListener(marker, 'click', function() {
// 			window.location.href =  marker.url;
// 		});
// 			markers.push(marker)
// 		});
// 	};

// 	function setMapOnAll(map) {
// 		for (var i = 0; i < markers.length; i++) {
// 			markers[i].setMap(map);
// 		}
// 	};

// 	function createInfoWindow(text){
// 		var infowindow = new google.maps.InfoWindow({
// 			content: text
// 		});
// 		return infowindow;
// 	}
// });

