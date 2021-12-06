const mapContainer = document.getElementById("map");
const mapOption = {
    center: new daum.maps.LatLng(37.64886686994668,127.06420729758642),
    level:3,
};

let map = new daum.maps.Map(mapContainer,mapOption);