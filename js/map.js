function initMap() {

    var where = new google.maps.LatLng(25.041240, 121.568342); //要cara去的地方

    var map = new google.maps.Map(document.getElementById('map'), {
        center: where,
        scrollwheel: false,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    var mapIconImage = {
        url: 'images/main01.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(75, 75)
    };

    var marker = new google.maps.Marker({
        position: map.getCenter(),
        title: "快點來!",
        icon: mapIconImage,
        map: map
    });

    var message = '<div id="content">快來找我唷</div>';

    var coordInfoWindow = new google.maps.InfoWindow({
        content: message
    });

    directionsDisplay.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position, error) {
            setCurrentLocation(position.coords.latitude, position.coords.longitude);
        });
    } else {
        // Browser doesn't support Geolocation
        x = '25.046755';
        y = '121.562237';
    }

    function error() {
        alert("取得經緯失敗");
    };

    var cara = '';

    function setCurrentLocation(lat, lon) {
        cara = new google.maps.LatLng(lat, lon); //要cara所在地
        map.setCenter(cara);

        var request = {
            destination: cara,
            origin: where,
            travelMode: google.maps.TravelMode.WALKING
        };
        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
            }
        });
    }

    marker.addListener('click', function() {
        coordInfoWindow.open(map, marker);
    });

}