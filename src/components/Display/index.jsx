import React from "react";
import { useSelector } from "react-redux";
import { selectValue } from "../../features/calculator/calculatorSlice";
import "./index.scss";
export default function Display() {
  const { expression, inputValue } = useSelector(selectValue);
  return (
    <div id="display">
      <h3>{expression}</h3>
      <h2>{inputValue}</h2>
    </div>
  );
}
