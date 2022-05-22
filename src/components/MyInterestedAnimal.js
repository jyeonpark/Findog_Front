import React, { Component, useState } from "react";
import AnimalItem from "../components/AnimalItem";
import styled from "styled-components";
import AnimalPopup from "../components/AnimalPopup";
import AbandonedAnimal from "../pages/AbandonedAnimal";

export const MyInterestedAnimal = () => {
  return (
    <div style={{marginTop:"100px", marginLeft:"100px"}}>
      <AbandonedAnimal myInterest={true}></AbandonedAnimal>
    </div>
  );
};

export default MyInterestedAnimal;
