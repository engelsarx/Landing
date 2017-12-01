var map;
var oficinaBarcelona = { lat: 41.363939, lng: 2.135084 };
var oficinaCasablanca = { lat: 33.586435, lng: -7.632269 };
var oficinaCdmx = { lat: 19.429483, lng: -99.205600 };
var oficinaLisboa = { lat: 38.746839, lng: -9.147594 };
var oficinaLondres = { lat: 51.515628, lng: -0.174768 };
var oficinaMadrid = { lat: 40.439172, lng: -3.678735 };
var oficinaQueretaro = { lat: 20.613279, lng: -100.405359 };
var oficinaSevilla = { lat: 37.349605, lng: -6.053173 };

/**
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: 'ChIJwYIugJeYpBIRuTUEslPNVFI'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            barcelona.addEventListener('click', function () {
                map.setCenter(oficinaBarcelona);
                var marker = new google.maps.Marker({
                    position: oficinaBarcelona,
                    map: map,
                    title: 'Oficina Babel Barcelona',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Barcelona</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Barcelona.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + place.international_phone_number.replace(/\s/g, '');
                linkPhoneSpan.innerHTML = place.formatted_phone_number;
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJFXcJ2ZTSpw0R0TQT8VGNhy0'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            casablanca.addEventListener('click', function () {
                map.setCenter(oficinaCasablanca);
                var marker = new google.maps.Marker({
                    position: oficinaCasablanca,
                    map: map,
                    title: 'Oficina Babel Casablanca',
                    icon: "images/map-marker.svg"
                });

                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Casablanca</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Casablanca.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + place.international_phone_number.replace(/\s/g, '');
                linkPhoneSpan.innerHTML = place.formatted_phone_number;
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJvQnnGPYB0oURKtA3ShXamxQ'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            cdmx.addEventListener('click', function () {
                map.setCenter(oficinaCdmx);
                var marker = new google.maps.Marker({
                    position: oficinaCdmx,
                    map: map,
                    title: 'Oficina Babel Ciudad de México',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Ciudad de México</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Ciudad-de-Mexico-2.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + '91711600';
                linkPhoneSpan.innerHTML = '9171 1600';
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJ02FIDwczGQ0RNe0FMcXspCE'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            lisboa.addEventListener('click', function () {
                map.setCenter(oficinaLisboa);
                var marker = new google.maps.Marker({
                    position: oficinaLisboa,
                    map: map,
                    title: 'Oficina Babel Lisboa',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Lisboa</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Lisboa.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + '217615810';
                linkPhoneSpan.innerHTML = '217 615 810';
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJo6AKuLIadkgROW3QQdRvOEY'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            londres.addEventListener('click', function () {
                map.setCenter(oficinaLondres);
                var marker = new google.maps.Marker({
                    position: oficinaLondres,
                    map: map,
                    title: 'Oficina Babel Londres',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Londres</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Londres.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + '2034322152';
                linkPhoneSpan.innerHTML = '203 432 2152';
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJhxJI-AEpQg0RbD3KV1qJRys'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            madrid.addEventListener('click', function () {
                map.setCenter(oficinaMadrid);
                var marker = new google.maps.Marker({
                    position: oficinaMadrid,
                    map: map,
                    title: 'Oficina Babel Madrid',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Madrid</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Madrid.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + place.international_phone_number.replace(/\s/g, '');
                linkPhoneSpan.innerHTML = place.formatted_phone_number;
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJXaRRN-ha04UROk-29mnupk8'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            queretaro.addEventListener('click', function () {
                map.setCenter(oficinaQueretaro);
                var marker = new google.maps.Marker({
                    position: oficinaQueretaro,
                    map: map,
                    title: 'Oficina Babel Querétaro',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Querétaro</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Queretaro.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + '4421897498';
                linkPhoneSpan.innerHTML = '442 1897498';
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

    service.getDetails({
        placeId: 'ChIJ5SsKrOhsEg0RNtIGUjA4llw'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            sevilla.addEventListener('click', function () {
                map.setCenter(oficinaSevilla);
                var marker = new google.maps.Marker({
                    position: oficinaSevilla,
                    map: map,
                    title: 'Oficina Babel Sevilla',
                    icon: "images/map-marker.svg"
                });
                var address = document.getElementById('address-container');
                address.innerHTML = '<h4>Babel Sevilla</h4><p>' +
                    place.formatted_address + '</p>';
                var addressBlock = document.getElementById('offices__address');
                var linkMap = document.getElementById('link-map');
                var linkPhone = document.getElementById('link-phone');
                var linkPhoneSpan = document.getElementById('link-phone-string');
                var photo = document.getElementById('place-photo');
                photo.src = "images/Oficina-de-BABEL-en-Sevilla.jpg";
                addressBlock.classList.remove("no-visible");
                linkMap.href = place.url;
                linkPhone.href = 'tel:' + place.international_phone_number.replace(/\s/g, '');
                linkPhoneSpan.innerHTML = place.formatted_phone_number;
                marker.addListener('click', function () {
                    addressBlock.classList.remove("no-visible");
                });
            });
        }
    });

}

function initMap() {
    map = new google.maps.Map(document.getElementById('offices-map'), {
        zoom: 15,
        center: oficinaMadrid,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    var marker = new google.maps.Marker({
        position: oficinaMadrid,
        map: map,
        title: 'Oficina Babel Madrid',
        icon: "images/map-marker.svg"
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var request = {
                location: userPosition,
                radius: '50000',
                keyword: 'babel sistemas de informacion'
            };
            var serviceDistance = new google.maps.DistanceMatrixService();
            var servicePlaces = new google.maps.places.PlacesService(map);
            servicePlaces.nearbySearch(request, nearbyOffice);
            function nearbyOffice(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var resultado = results[i];
                        var positionResult = resultado.geometry.location
                        console.log(resultado.vicinity);
                        serviceDistance.getDistanceMatrix({
                            origins: [userPosition],
                            destinations: [positionResult],
                            travelMode: 'WALKING',
                            unitSystem: google.maps.UnitSystem.METRIC,
                            avoidHighways: false,
                            avoidTolls: false
                        }, function (response, status) {
                            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                                var distance = response.rows[0].elements[0].distance.value;
                                var stepValue = 1.7;
                                var pedoMeter = stepValue * distance;
                                console.log(distance)
                                var stepsSpan = document.getElementById('step-counter');
                                stepsSpan.innerHTML = Math.round(pedoMeter).toLocaleString();
                            } else {
                                alert("No podemos calcular la distancia via caminando");
                            }
                        });
                    }
                }
            }

        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}


