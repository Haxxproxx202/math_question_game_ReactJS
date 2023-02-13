import React from "react";
import ReactDOM from "react-dom";
import MathQuestionGame from "./MathQuestionGame";

ReactDOM.render(
    <MathQuestionGame />,
    document.getElementById("game")
);

































// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import MathQuestionGame from "./MathQuestionGame";
//
// const App = () => {
//     const operatorsArray = ["-", "+", "*"];
//     const randomOperator = operatorsArray[Math.floor(Math.random() * operatorsArray.length)];
//     const num1 = Math.floor(Math.random() * (11 - 1) + 1);
//     const num2 = Math.floor(Math.random() * (11 - 1) + 1);
//
//     return (
//         <MathQuestionGame operator={randomOperator} number1={num1} number2={num2}/>
//     );
// };
//
//
// ReactDOM.render(
//   <App />,
//   document.getElementById("app")
// );
