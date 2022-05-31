import React, { useState, useEffect } from "react";
import AnimalItem from "../components/AnimalItem";
import styled from "styled-components";
import AnimalPopup from "../components/AnimalPopup";
import API from "./../utils/api";
import Pagination from "./../components/Pagination";
import AnimalOptionTab from "./../components/AnimalOptionTab";

export const AbandonedAnimal = ({ myInterest, Notice }) => {
  var size = 6;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState([]);
  const [reload, setReload] = useState(false);
  const [inputs, setInputs] = useState({
    word: "",
    region: "",
    category: "",
    breed: "",
    status: "",
  });
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    var url = "";
    if (isFiltered) {
      url = "/animals/search";
    } else if (myInterest === true) {
      url = "/animals/mypage";
      size = 4;
    } else {
      url = "/animals";
    }

    getAnimalList(page, size, url);
  }, [page, reload]);

  const setOptions = (inputs) => {
    setInputs(inputs);
    setPage(1);
  };

  useEffect(() => {
    // filter 안된 것
    var url = "";
    if (!Object.values(inputs).some((element) => element !== "")) {
      if (myInterest === true) {
        url = "/animals/mypage";
      } else {
        url = "/animals";
      }
      console.log("필터안됨");
    }
    // filter 된것
    else {
      url = "/animals/search";
      console.log("필터됨");
    }
    setIsFiltered(Object.values(inputs).some((element) => element !== ""));
    console.log("useeeffect", inputs);
    getAnimalList(page, size, url);
  }, [inputs]);

  // 유기동물 리스트 조회하기
  const getAnimalList = (page, size, url) => {
    const params = Object.assign({}, inputs);
    params.page = page;
    params.size = size;

    if (sessionStorage.getItem("userJWT") === null) {
      console.log("null");
      API.get(url, {
        params,
        headers: {
          "X-ACCESS-TOKEN": "",
        },
      }).then((response) => {
        if (response.data.isSuccess) {
          const pageCriteria = response.data.result.pageCriteria;
          const animalSimpleInfo = response.data.result.animalSimpleInfo;

          console.log(response.data);
          setPageCount(pageCriteria.totalPage);
          setAnimals(animalSimpleInfo);
        } else {
          console.log(response);
        }
      });
    } else {
      API.get(url, {
        params,
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
        },
      }).then((response) => {
        if (response.data.isSuccess) {
          const pageCriteria = response.data.result.pageCriteria;
          const animalSimpleInfo = response.data.result.animalSimpleInfo;

          console.log(response.data);
          setPageCount(pageCriteria.totalPage);
          setAnimals(animalSimpleInfo);

          if (
            myInterest === true &&
            response.data.result.animalSimpleInfo.length === 0
          ) {
            Notice();
            console.log("ㅠㅠ");
          }
        } else {
          console.log(response);
        }
      });
    }
  };

  const onClose = () => {
    setDialog(false);
    setReload(true);
  };

  const onView = (key) => {
    setCurrentAnimal(animals.find((item) => item.animalId === key));
  };

  const onClick = () => {
    setDialog(true);
    setReload(false);
  };

  return (
    <div>
      {!myInterest && (
        <AnimalOptionTab setOptions={setOptions}></AnimalOptionTab>
      )}
      <Body>
        <Container myInterest={myInterest}>
          {animals.map((item) => {
            return (
              <AnimalItem
                item={item}
                key={item.animalId}
                onClick={onClick}
                onView={onView}
              ></AnimalItem>
            );
          })}
        </Container>
      </Body>
      {dialog ? (
        <AnimalPopup
          item={currentAnimal}
          key={currentAnimal.animalId}
          onClose={onClose}
          likeFlag={currentAnimal.likeFlag}
        ></AnimalPopup>
      ) : null}
      {animals.length !== 0 && (
        <footer>
          <Pagination total={pageCount} page={page} setPage={setPage} />
        </footer>
      )}
    </div>
  );
};

export default AbandonedAnimal;

AbandonedAnimal.defaultProps = {
  myInterest: false,
};

const Container = styled.div`
  width: 90%;
  height: min-content;
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-row-gap: 4vh;
  grid-column-gap: 2vw;
  grid-template-columns: ${(props) =>
    props.myInterest === true ? "1fr 1fr" : "1fr 1fr 1fr"};
  @media screen and (max-width: 650px) {
    grid-template-columns: ${(props) =>
    props.myInterest === true ? "1fr" : "1fr 1fr"};
  }
`;

const Body = styled.div`
  height: fit-content;
`;
