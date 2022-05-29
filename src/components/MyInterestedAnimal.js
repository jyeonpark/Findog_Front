import React from "react";

import AbandonedAnimal from "../pages/AbandonedAnimal";

export const MyInterestedAnimal = () => {
  return (
    <div style={{marginTop:"100px"}}>
      <AbandonedAnimal myInterest={true}></AbandonedAnimal>
    </div>
  );
};

export default MyInterestedAnimal;
