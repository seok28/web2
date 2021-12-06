var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
};
var map = new naver.maps.Map('map', mapOptions);


const data = [
    {
        title: '대학교',
        address:'한국성서대',
        lat: '37.64886686994668',
        lng: '127.06420729758642',
    }
];
// 인포윈도우와 마커의 구분을 위해 빈 리스트 생성
let markerList = [];
let infowindowList = [];
// 클릭 핸들러함수
const getClickHandler = (i) => () => {
    const marker = markerList[i];
    const infowindow = infowindowList[i];
    if(infowindow.getMap()) {
        infowindow.close();
    }else {
        infowindow.open(map,marker);
    }
};
const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
}


for(let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    let marker = new naver.maps.Marker({
        map : map,
        position : latlng,
        icon: {
            content:`<div class = "marker"></div>`,
            anchor: new naver.maps.Point(7.5,7.5),
        },
    });
    // infowindow 정보 창 
    const content = `
        <div class ="infowindow_shape">
         <div class = "infowindow_title"> ${target.title} </div>
         <div class = "infowindow_address"> ${target.address} </div>
        </div>
    `;
    // 인포 윈도우
    const infowindow = new naver.maps.InfoWindow({
        content:content,
        backgroundColor : "#00ff0000",
        borderColor:"#00ff0000",
        anchorSize: new naver.maps.Size(0 ,0),
    });
    markerList.push(marker);
    infowindowList.push(infowindow);
}

// 클릭했을 떄 인포윈도우 띄워주는 함수 및 반복문
for (let i=0, ii=markerList.length; i<ii; i++) {
    naver.maps.Event.addListener(markerList[i],"click",getClickHandler(i)); //마커 클릭
    naver.maps.Event.addListener(map,"click",getClickMap(i)); // 맵 클릭
}


