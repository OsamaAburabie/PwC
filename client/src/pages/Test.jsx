import React from "react";
import { useParams } from "react-router-dom";
function Test() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Test;
