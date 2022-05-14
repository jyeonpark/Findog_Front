/*global kakao */
import React, { useEffect, useState } from "react";
import { markerData } from "../assets/markerData";
import styled from "styled-components";

const MapWrapper = styled.div`
  /* position: sticky; */
  margin-bottom: 100px;
  border-radius: 5px;
  position: relative;
  width: 80%;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
  text-align: start;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Pagination = styled.div`
  text-align: center;
  a {
    color: black;
    font-size: 20px;
    text-decoration: none;
    margin: 0 10px;

    &.on {
      color: orange;
      font-weight: bold;
    }
  }
`;

const PlacesList = styled.ul`
  &.markerbg {
    float: left;
    position: absolute;
    width: 36px;
    height: 37px;
    margin: 10px 0 0 10px;
    background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
      no-repeat;
  }
`;

export default function CenterMap() {
  var searchPlace = "유기동물 보호소";
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 13,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          let content = (
            <div style="padding:5px;font-size:12px;"> + title + </div>
          );

          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [searchPlace]);

  return (
    <MapWrapper>
      <Map id="myMap"></Map>
      <ListWrapper id="menu_wrap">
        <div class="option">
          <div>
            <form style={{ textAlign: "center" }}>
              <input
                type="text"
                value="유기동물 보호소"
                id="keyword"
                size="20"
                style={{
                  width: "200px",
                  height: "30px",
                  border: "solid",
                  borderColor: "rgba(0,0,0,0.2)",
                  borderWidth: "1px",
                }}
              ></input>
              <button
                type="submit"
                style={{
                  backgroundColor: "rgb(255, 224, 166)",
                  borderColor: "rgba(0, 0, 0,0.1)",
                  height: "30px",
                }}
              >
                검색
              </button>
            </form>
          </div>
        </div>
        {/* {Places.map((item, i) => (
          <div key={i} style={{ marginTop: "20px" }}>
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
        ))} */}
        <PlacesList id="placesList"></PlacesList>
        <Pagination id="pagination"></Pagination>
      </ListWrapper>
    </MapWrapper>
  );
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
