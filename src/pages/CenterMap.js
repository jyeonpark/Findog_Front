/*global kakao */
import React, { useEffect, useState } from "react";
import { markerData } from "../assets/markerData";
import styled from "styled-components";

const MapWrapper = styled.div`
  /* position: sticky; */
  width: 800px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  border-radius: 5px;
`;

export default function CenterMap() {
  
  var searchPlace = "유기동물 보호소";
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 13,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      let content = 
      '<div style="padding:5px;font-size:12px;">' +
      place.place_name +
      '</div>';

      let customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(place.y, place.x),
        content: content,
      });


      kakao.maps.event.addListener(marker, 'mouseover', function() {
        customOverlay.setMap(map);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function() {
      customOverlay.setMap();
    });
    }
  }, [searchPlace])

  return (
    <div style={{display:"flex"}}>
      <MapWrapper
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></MapWrapper>
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}


// 맨 처음 방법
// useEffect(() => {
//   mapscript();
// }, []);

// const mapscript = () => {
//   let container = document.getElementById("map");
//   let options = {
//     center: new kakao.maps.LatLng(35.95, 128.25),
//     level: 13,
//   };

//   //map
//   const map = new kakao.maps.Map(container, options);

//   markerData.forEach((el) => {
//     var imageSrc = "https://cdn-icons-png.flaticon.com/512/1759/1759401.png",
//       imageSize = new kakao.maps.Size(45, 45), // 마커이미지의 크기입니다
//       imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

//     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
//     var markerImage = new kakao.maps.MarkerImage(
//       imageSrc,
//       imageSize,
//       imageOption
//     );

//     // 마커를 생성합니다
//     let marker = new kakao.maps.Marker({
//       //마커가 표시 될 지도
//       map: map,
//       //마커가 표시 될 위치
//       position: new kakao.maps.LatLng(el.lat, el.lng),
//       image: markerImage,
//       // clickable: true,
//     });

//     let content =
//       '<div class="customoverlay">' +
//       '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
//       '    <span class="title">구의야구공원</span>' +
//       "  </a>" +
//       "</div>";

//     let customOverlay = new kakao.maps.CustomOverlay({
//       position: position,
//       content: content,
//     });

//     kakao.maps.event.addListener(
//       marker,
//       "mouseover",
//       makeOverListener(map, marker, infowindow)
//     );
//     kakao.maps.event.addListener(
//       marker,
//       "mouseout",
//       makeOutListener(infowindow)
//     );
//   });
// };
