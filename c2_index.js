(function () {
  let state = {
    number: undefined,
    operator: undefined,
    numberSaved: undefined,
  };

  const calculatorOutput = document.querySelector(".calculator-output");
  const inputs = document.querySelectorAll(".input");
  //   console.log("inputs: ", inputs);

  // se adauga functionalitate pe butoane:
  inputs.forEach((item) => {
    //inputs reprezinta totalitatea cifrelor (+ punctul) de pe calculator
    item.addEventListener("click", function () {
      if (
        //output-ul este 0 si data-number este diferit de punct (.)
        (calculatorOutput.innerHTML === "0" && item.dataset.number !== ".") ||
        state.numberSaved
      ) {
        //output-ul este egal cu cifra pe care apasam
        calculatorOutput.innerHTML = item.dataset.number;
        state.numberSaved = false;
        // console.log("cifra: ", item.dataset.number);
        // console.log("output", calculatorOutput);
      } else {
        //cifrele se concateneaza
        calculatorOutput.innerHTML += item.dataset.number;
      }
      //imediat cum apasam o cifra, AC devine C
      reset.innerHTML = "C";
    });
  });
  // console.log(state.operator, state.number);

  //operators este un array ce cuprinde toti operatorii
  const operators = document.querySelectorAll("button[data-operator]");
  operators.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.add("active");
      document.addEventListener("click", function (e) {
        if (!item.contains(e.target)) {
          //   console.log(item.contains(e.target));
          item.classList.remove("active");
        }
      });

      if (item.dataset.operator === "%") {
        calculatorOutput.innerHTML =
          parseFloat(calculatorOutput.innerHTML) / 100;
      } else if (state.operator && state.number) {
        //   {number: 0, operator: '+/-', numberSaved: true}
        switch (state.operator) {
          case "/":
            calculatorOutput.innerHTML =
              parseFloat(state.number) / parseFloat(calculatorOutput.innerHTML);
            // console.log(
            //   " calculatorOutput.innerHTML",
            //   calculatorOutput.innerHTML
            // );
            // console.log("parseFloat(state.number)", parseFloat(state.number));
            // console.log(
            //   "parseFloat(calculatorOutput.innerHTML)",
            //   parseFloat(calculatorOutput.innerHTML)
            // );
            break;
          case "*":
            calculatorOutput.innerHTML =
              parseFloat(state.number) * parseFloat(calculatorOutput.innerHTML);
            break;
          case "-":
            calculatorOutput.innerHTML =
              parseFloat(state.number) - parseFloat(calculatorOutput.innerHTML);
            break;
          case "+":
            calculatorOutput.innerHTML =
              parseFloat(state.number) + parseFloat(calculatorOutput.innerHTML);
            break;
          default:
            break;
        }
      }
      state.numberSaved = true;
      state.number = parseFloat(calculatorOutput.innerHTML);
      state.operator = item.dataset.operator;
      // console.log("state:" , state);
    });
  });

  const reset = document.querySelector(".reset");
  const signChange = document.querySelector(".sign-change");

  signChange.addEventListener("click", function () {
    if (calculatorOutput.innerHTML !== "0") {
      calculatorOutput.innerHTML = -parseFloat(calculatorOutput.innerHTML);
    }
  });

  reset.addEventListener("click", function () {
    switch (reset.innerHTML) {
      case "AC":
        state = {
          number: undefined,
          operator: undefined,
          numberSaved: undefined,
        };
        calculatorOutput.innerHTML = "0";
        reset.innerHTML = "AC";
        break;
      case "C":
        calculatorOutput.innerHTML = "0";
        reset.innerHTML = "AC";
        break;
      default:
        break;
    }
    // alert("Reset?");
  });
})();

