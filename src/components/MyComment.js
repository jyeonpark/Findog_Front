import React from "react";
import styled from "styled-components";


const Title = styled.div`
  margin-top: 100px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(0,0,0,0.1);
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 900px;
  height: fit-content;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 100px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr 1fr;
`;

function MyComment() {
  return (
    <div>
       <Title> 내가 작성한 댓글</Title>
      <Divider></Divider>
      <Container></Container>
    </div>
  );
}

export default MyComment;
