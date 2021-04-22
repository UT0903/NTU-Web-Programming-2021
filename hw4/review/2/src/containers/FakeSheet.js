import React from "react";
import { Reset } from "styled-reset";

import Sheet from "../components/Sheet";

const FakeSheet = () => {
  return (
    <>
      <Reset />
      
      <Sheet numberOfRows={101} numberOfColumns={27} />
    </>
  );
};

export default FakeSheet;

