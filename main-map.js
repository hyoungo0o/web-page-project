    // 지도 초기화
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5671, 126.9687), // 중구 새문안로 22
        level: 3 // 초기 지도 확대 3레벨
    };
    var map = new kakao.maps.Map(container, options);

    // 마커 추가
    var markerPosition = new kakao.maps.LatLng(37.5671, 126.9687); // 중구 새문안로 22
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);