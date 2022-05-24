/*global kakao */
import React, { useEffect } from "react";
import styled from "styled-components";
import doghouse from "../images/doghouse.png";

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  margin-left: 15%;
  margin-bottom: 10px;
`;
const HomeImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const Intro = styled.div`
  font-size: x-large;
  font-weight: bolder;
  text-align: left;
  color: orange;
`;

const MapWrapper = styled.div`
  /* position: sticky; */
  margin-bottom: 100px;
  position: relative;
  width: 70%;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 350px;
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
  border-radius: 10px;
  border: solid;
  border-color: orange;
  border-width: 5px;
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
  margin-top: 20px;

  li {
    list-style: none;

    &.item {
      position: relative;
      border-bottom: 1px solid #888;
      overflow: hidden;
      cursor: pointer;
      min-height: 65px;

      span {
        display: block;
        margin-top: 4px;
      }
    }
  }
`;

export default function CenterMap() {
  var keyword = "유기동물 보호소";

  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  var markers = [];
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 13,
  };

  useEffect(() => {
    const container = document.getElementById("myMap");
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      // // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        map.setBounds(bounds);
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
        bounds = new kakao.maps.LatLngBounds();

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
    function getListItem(index, place) {
      const imgHeight = 10 + index * 46;
      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '" style="float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;  background-position: 0 -' +
          imgHeight +
          'px;"></span>' +
          '<div class="info" style="padding:10px 0 10px 55px;">' +
          "   <h5>" +
          place.place_name +
          "</h5>";

      if (place.road_address_name) {
        itemStr +=
          "    <span>" +
          place.road_address_name +
          "</span>" +
          '   <span class="jibun gray" style="color:#8a8a8a; padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;">' +
          place.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + place.address_name + "</span>";
      }

      itemStr +=
        '  <span class="tel" style="color:#009900;">' +
        place.phone +
        "</span>" +
        "</div>";

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
      var content =
        '<div style="padding:10px; width:max-content;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, []);

  return (
    <div>
      <Container>
        <HomeImg src={doghouse}></HomeImg>
        <Intro>전국 유기동물 보호소</Intro>
      </Container>

      <MapWrapper>
        <Map id="myMap"></Map>
        <ListWrapper id="menu_wrap">
          <PlacesList id="placesList"></PlacesList>
          <Pagination id="pagination"></Pagination>
        </ListWrapper>
      </MapWrapper>
    </div>
  );
}
