const numberBtnContainer = document.querySelector(".number-container");
const operatorBtnContainer = document.querySelector(".operator-container");
let currentNumber;
numberBtnContainer.addEventListener("click", (e) => {
  let number;
  if (e.target.className == "number-btn btn") {
    number = Number(e.target.firstChild.textContent);
  } else if (e.target.parentNode.className == "number-btn btn") {
    number = Number(e.target.textContent);
  }
  if (number != null) {
    const displayNumber = document.querySelector(".display-container");
    if (displayNumber.textContent.length >= 18) {
      alert("Too much digits!");
    } else {
      displayNumber.textContent += number;
    }
  }
});
