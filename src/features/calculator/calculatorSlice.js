import { createSlice } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";
export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    expression: "0",
    inputValue: "0",
  },
  reducers: {
    clear: (state) => {
      state.inputValue = "0";
      state.expression = "0";
    },
    equal: (state) => {
      state.inputValue = evaluate(state.expression);
      state.expression = state.expression + "=" + evaluate(state.expression);
    },
    input: (state, action) => {
      const firstLetter = state.inputValue.charAt(0);
      const decimalCount = state.inputValue.indexOf(".");
      const updateDisplay = () => {
        state.inputValue += action.payload;
        state.expression += action.payload;
      };
      if (decimalCount !== -1 && action.payload === ".") {
      } else if(state.inputValue.length<23){
        switch (firstLetter) {
          case "0":
            if (action.payload !== "." && state.inputValue.length === 1) {
              state.inputValue = state.inputValue.slice(1) + action.payload;
              state.expression = state.inputValue;
            } else {
              updateDisplay();
            }
            break;
          case "+":
          case "-":
          case "x":
          case "/":
            updateDisplay();
            state.inputValue = state.inputValue.slice(1)
            break;
          default:
            updateDisplay();
            break;
        }
      }else{
        alert('Digit Limit Met')
      }
    },
    overRide:(state,action) => {
      state.inputValue = action.payload;
      state.expression = state.inputValue
    },
    operation: (state, action) => {
      const length = state.expression.length;
      const multiplySubstract = () =>{
        if (action.payload === "x") {
          state.expression += "*";
        }else if (action.payload === "-" && state.expression.length === 1){
          state.expression = state.expression.slice(1) + action.payload;
        }else {
          state.expression += action.payload;
        }
      }
      const updateExpression = () => {
        state.inputValue = action.payload;
        if(state.expression.indexOf("=") !== -1) {
          state.expression = state.expression.split("=")[1];
          multiplySubstract()
        }else{
          multiplySubstract()
        }
      };
      if (state.expression.charAt(length - 1).match(/[0-9.]/)) {
        updateExpression();
      } else if (
        state.expression.charAt(length - 2).match(/[0-9]/) &&
        action.payload === "-"
      ) {
        updateExpression();
      }
    },
  },
});

export const { clear, input, equal, operation,overRide } = calculatorSlice.actions;

export const selectValue = (state) => state.calculator;

export default calculatorSlice.reducer;
