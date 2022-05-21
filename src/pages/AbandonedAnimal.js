import React, { Component, useState, useEffect } from "react";
import OptionTab from "../components/OptionTab";
import AnimalItem from "../components/AnimalItem";
import styled from "styled-components";
import AnimalPopup from "../components/AnimalPopup";
import API from "./../utils/api";
import Pagination from "./../components/Pagination";

export const AbandonedAnimal = () => {
  const size = 6;
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAnimalList(page, size);
  }, [page, reload]);


  // 유기동물 리스트 조회하기
  const getAnimalList = (page, size) => {
    API.get("/animals", {
      params: { page: page, size: size },
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
      } else {
        console.log(response);
      }
    });
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
      <OptionTab
        InterestText="관심 동물 보기"
        ImgSearchVisibility
        WriteVisibility={false}
      ></OptionTab>
      <Body>
        <Container>
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

      <footer>
        <Pagination total={pageCount} page={page} setPage={setPage} />
      </footer>
    </div>
  );
};

export default AbandonedAnimal;

const Container = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Body = styled.div`
  margin-bottom: 100px;
`;
