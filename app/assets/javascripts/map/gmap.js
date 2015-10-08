var map;
var markers = [];
var LatLng = { lat: 37.78, lng: -122.44};
var ltlg;
var arrayOfCities = [];

$( document ).ready(function() {
	$(".player").YTPlayer();
});
 // ex: https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
 function renderMap(loc){
 		 // var loc = $('.act-loc').text();
    var address = loc.replace(" ","+");	
 	$.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : address}, function (data) {
            ltlg = data.results[0].geometry.location;
  		 
  		 getCityMap();
  		 getEventMap();
 	 	 
        });

 }

 function getEventMap(){
 		map = new google.maps.Map(document.getElementById('event-map'), {
 			center: ltlg,
 			zoom: 10
 		});
 }

function getCityMap(){
	map = new google.maps.Map(document.getElementById('city-map'), {
		center: ltlg,
		zoom: 11
	});
}
//         var locArray = $('.act-loc').val().split(" ");
//         var addr = locArray.join("+");
//         $.get("https://maps.googleapis.com/maps/api/geocode/json?", { "address" : addr}, function (data) {
//             LatLng = data.results[0].geometry.location;
            
//         getMap();
//         })
 



function getMapCitiesIndex () {

	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: LatLng,
		zoom: 3
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

 function citiesLntLng(cityNames){

 	// for(var i = 0;i<=cityNames.length;i++){
 	// var cAr = cityNames[i].replace(" ","+");
 	// console.log(cArr);
 	cityNames.forEach(function(city){
 		var oneCity = city.replace(" ","+");	
 	$.get("https://maps.googleapis.com/maps/api/geocode/json?" , { "address" : oneCity}, function (response){
 		LatLng = response.results[0].geometry.location;
 		console.log("this is lat and long" , LatLng);
 		arrayOfCities.push(LatLng);
 	});	
 	console.log("this are the lats & longs", arrayOfCities);
 	});
 	
 }

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



// function setMapOnAll(map) {
// 	for (var i = 0; i < markers.length; i++) {
// 		markers[i].setMap(map);
// 	}
// };

// // function createInfoWindow(text){
// // 	var infowindow = new google.maps.InfoWindow({
// // 		content: text
// // 	});
// // 	return infowindow;
// // }

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

