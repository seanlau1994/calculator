import React from "react";
import { useDispatch } from "react-redux";
import {
  clear,
  equal,
  input,
  operation,
  overRide,
} from "../../features/calculator/calculatorSlice";
import { useSelector } from "react-redux";
import { selectValue } from "../../features/calculator/calculatorSlice";
import numbers from "./numbers";
import operators from "./mathOperators";
import "./index.scss";
export default function Buttons() {
  const dispatch = useDispatch();
  const { expression } = useSelector(selectValue);
  return (
    <div id="buttons">
      <button id="equals" onClick={() => dispatch(equal())}>
        =
      </button>
      <button id="decimal" onClick={() => dispatch(input("."))}>
        .
      </button>
      <button id="clear" onClick={() => dispatch(clear())}>
        AC
      </button>
      {numbers.map((numObj) => {
        return (
          <button
            key={numObj.id}
            id={numObj.id}
            onClick={() =>
              expression.indexOf("=") === -1
                ? dispatch(input(numObj.num))
                : dispatch(overRide(numObj.num))
            }
          >
            {numObj.num}
          </button>
        );
      })}
      {operators.map((operator) => {
        return (
          <button
            key={operator.id}
            id={operator.id}
            onClick={() => dispatch(operation(operator.operator))}
          >
            {operator.operator}
          </button>
        );
      })}
    </div>
  );
}
