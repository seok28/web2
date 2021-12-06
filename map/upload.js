const mapContainer = document.getElementById("map");
const mapOption = {
    center: new daum.maps.LatLng(37.64886686994668,127.06420729758642),
    level:3,
};

let map = new daum.maps.Map(mapContainer,mapOption);


let infowindow = new daum.maps.InfoWindow({
    zIndex:1, //지도보다 위
});

let markerList =[];

let ps = new daum.maps.services.Places();

// 키워드 받고 검색하는 함수
searchPlaces();

function searchPlaces() {
    let keyword = $("#keyword").val(); // 검색하는 태그인 input 태그에 id 의 텍스트 값을 keyword 변수안에 담음
    ps.keywordSearch(keyword, placesSearchRS);    // placesSearch result -> placesSearchRS
}

function placesSearchRS (data,status) {
    if(status === daum.maps.services.Status.OK) {
        console.log(data);
    } else if (status === daum.maps.services.Status.ZERO_RESULT){
        alert('검색 결과가 존재하지 않습니다.');
        return;
    }else if(status === daum.maps.services.Status.ERROR) {
        alert('검색결과 중 오류가 발생하였습니다.');
        return;
    }
 }
