    // 지도 초기화
    var container = document.getElementById('contactMap');
    var options = {
        center: new kakao.maps.LatLng(37.5671, 126.9687), // 중구 새문안로 22
        level: 3 // 초기 지도 확대 3레벨
    };
    var contactMap = new kakao.maps.Map(container, options);

    // 마커 추가
    var markerPosition = new kakao.maps.LatLng(37.5671, 126.9687); // 중구 새문안로 22
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(contactMap);

    // 커스텀 오버레이에 적용할 스타일과 HTML 내용
    var content = '<div class="custom-overlay-content">H&L SYSTEM</div>';

    // 커스텀 오버레이 객체 생성
    var customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,  // 마커가 표시될 위치
        content: content,          // 표시할 컨텐츠
        yAnchor: 1                 // 컨텐츠의 Y 축 기준점. 1로 설정하면 컨텐츠의 아래 가운데가 마커의 위치에 맞게 됨
    });

    // 지도에 커스텀 오버레이 추가
    customOverlay.setMap(contactMap);

    // 길찾기 링크 클릭 이벤트 핸들러 추가
    document.getElementById('findLoadLink').addEventListener('click', function() {
        var address = "중구 새문안로 22";
        var lat = 37.5671;
        var lng = 126.9687;
        var url = "https://map.kakao.com/link/to/" + encodeURIComponent(address) + "," + lat + "," + lng;
        window.open(url);
    });

    // 로드뷰 링크 클릭 이벤트 핸들러 추가
    document.getElementById('roadViewLink').addEventListener('click', function() {
        var lat = 37.5671;
        var lng = 126.9687;
        var url = "https://map.kakao.com/link/roadview/" + lat + "," + lng;
        window.open(url);
    });