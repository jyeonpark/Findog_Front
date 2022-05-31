import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Pagination({ total, page, setPage }) {
  const PAGES_PER_LIST = 5;
  const [showingNum, setShowingNum] = useState({
    start: 1,
    end: PAGES_PER_LIST,
  });

  const arrowHandler = (prev, sign, totalPage) => {
    const nextIndex = prev.end + PAGES_PER_LIST;
    let res;
    if (sign === 1) {
      res = nextIndex > totalPage ? totalPage : nextIndex;
    } else if (sign === -1) {
      res =
        prev.end - prev.start < 4
          ? prev.start + 4 - PAGES_PER_LIST
          : prev.end - PAGES_PER_LIST;
    }
    return { ...prev, start: prev.start + PAGES_PER_LIST * sign, end: res };
  };

  const changePageNumbersBackward = () => {
    page > PAGES_PER_LIST &&
      setShowingNum((prev) => arrowHandler(prev, -1, total));
  };

  const changePageNumberForward = () => {
    showingNum.end <= total &&
      setShowingNum((prev) => arrowHandler(prev, 1, total));
  };

  useEffect(() => {
    const lessThanFive = total <= PAGES_PER_LIST;
    lessThanFive
      ? setShowingNum((prev) => ({ ...prev, start: 1, end: total }))
      : setShowingNum((prev) => ({ ...prev, start: 1, end: PAGES_PER_LIST }));
  }, [total]);

  useEffect(() => {
    setPage(showingNum.start);
  }, [showingNum, setPage]);

  const isFirstPage = showingNum.start === 1;
  const isLastPage = showingNum.end === total;
  const pages = getEmptyArray(showingNum.start, showingNum.end);

  function getEmptyArray(start, end) {
    const array = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    }
    return array;
  }

  function PageButton({ page, setCurrentPage, isActive }) {
    const handleClickButton = () => {
      setCurrentPage(page);
    };

    return (
      <Nav isActive={isActive}>
        <Button onClick={handleClickButton} isActive={isActive}>
          {page}
        </Button>
      </Nav>
    );
  }

  return (
    <div style={{marginBottom:"20px"}}>
      <Nav>
        <Button onClick={changePageNumbersBackward} disabled={isFirstPage}>
          &lt;
        </Button>
        {pages.map((p, idx) => {
          return (
            <PageButton
              key={`pageNumber-${idx + 1}`}
              page={p}
              setCurrentPage={setPage}
              isActive={p === page}
            />
          );
        })}
        <Button onClick={changePageNumberForward} disabled={isLastPage}>
          &gt;
        </Button>
      </Nav>
    </div>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px;
  margin: 0px;
  text-align: center;

`;

const Button = styled.button`
  box-shadow: 5px 5px 5px rgba(255, 164, 91, 0.1);
  border: none;
  border-radius: 8px;
  padding: 1vw;
  margin: 5px;
  background: ${(props) =>
    props.isActive ? "#FFA45B" : "white"};
  color: white;
  font-size: 2vw;
  color: ${(props) => (props.isActive ? "white" : "black")};

  &:hover {
    background: #FFA45B;
    cursor: pointer;
    transform: translateY(-5px);
  }

  &[disabled] {
    background: white;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
