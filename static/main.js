$(window).ready(function () {
    create_map();
});

var map;

function create_map() {
    var center = new google.maps.LatLng(45.6, 8.85);
    var mapOptions = {
        center: center,
        zoom: 12
    };
    map = new google.maps.Map($("#map-canvas")[0], mapOptions);
    google.maps.event.addListener(map, 'click', function (event) {
        placeSetMarker(event.latLng);
    });
}

function placeMarkerToRoad(location){
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin:location,
      destination:location,
      travelMode: google.maps.TravelMode.DRIVING
      };
    directionsService.route(request,function(result, status){
        var nearest_point_on_road = result.routes[0].legs[0].start_location;
        placeMarker(nearest_point_on_road);
    });
}

function placeSetMarker(location) {
    var distance = get_user_input();
    placeMarkerToRoad(location);
    placeMarkerToRoad(location.destinationPoint(0, distance));
    placeMarkerToRoad(location.destinationPoint(120, distance));
    placeMarkerToRoad(location.destinationPoint(240, distance));
}

function get_user_input(){
    var d = $("#distance").val();
    if (d == "") {
        d = 2;
    }
    return d;
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Center here!"
        });
    google.maps.event.addListener(marker, "click", function(event){alert(marker.getPosition());});
}

google.maps.LatLng.prototype.destinationPoint = function (brng, dist) {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
    Number.prototype.toDeg = function () {
        return this * 180 / Math.PI;
    }
    dist = dist / 6371;
    brng = brng.toRad();
    var lat1 = this.lat().toRad(),
        lon1 = this.lng().toRad();
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
    var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) * Math.cos(lat1),
    Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2));
    if (isNaN(lat2) || isNaN(lon2)) return null;
    return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}
