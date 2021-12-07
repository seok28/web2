var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);


let markerList =[];
let infowindowList =[];

// 마커를 클릭했을 때 인포 윈도우 보여주고 닫는 함수
const getClickHandler = (i) => () => {
     const marker = markerList[i];
     const infowindow = infowindowList[i];
     if(infowindow.getMap()){
         infowindow.close();
     }else {
         infowindow.open(map, marker);
     }
};
// 맵 클릭했을 때 인포 윈도우를 닫는 함수
const getClickMap =(i) => () => {
     const infowindow = infowindowList[i];
     infowindow.close();
}

// 마커
for(let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat,target.lng);

    let marker = new naver.maps.Marker({
        map: map,
        position: latlng,
        icon: {
            content: `<div class="marker"></div>`,
            anchor: new naver.maps.Point(7.5, 7.5),
        }
    });

  const content = `
  <div class ="infowindow_wrap">
    <div class = "infowindow_title"> ${target.title}</div>
    <div class = "infowindow_address"> ${target.address}</div>
  </div>
  `;

  // 인포 윈도우(클릭했을 때 마커의 정보)
  const infowindow = new naver.maps.InfoWindow({
      content: content,
      backgroundColor:"#00ff0000",
      borderColor:"00ff0000",
      anchorSize: new naver.maps.Size(0,0),
  });
  
  markerList.push(marker);
  infowindowList.push(infowindow);
}

for (let i=0, ii=markerList.length; i<ii; i++) {
    naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
    naver.maps.Event.addListener(map, "click", getClickMap(i));
}