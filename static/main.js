$(window).ready(function(){
	create_map();
    $("#go").on("click", create);
});

var map;
var placemarker_listener;
var center_marker;

function create(){
    var inp = $("#radius").val();
    alert(center_marker.getPosition());
}

function create_map(){
    var center = new google.maps.LatLng(46.0, 9.0);
    var mapOptions = {
        center: center,
        zoom: 12
    };
    map = new google.maps.Map($("#map-canvas")[0], mapOptions);
    placemarker_listener = google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location){
    center_marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Center here!"
    });
    google.maps.event.removeListener(placemarker_listener);
}
