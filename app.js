const passwordDisplay = document.querySelector(".password");
const rangeNumber = document.getElementById("rangeNumber");
const formEl = document.querySelector("form");
const upperCheckbox = document.getElementById("uppercase");
const numberCheckbox = document.getElementById("numbers");
const symbolCheckbox = document.getElementById("symbols");

function getArray(from, to) {
  let result = [];
  for (let i = from; i <= to; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

const lowerArr = getArray(97, 122);
const upperArr = getArray(65, 90);
const numberArr = getArray(48, 57);
const symbolArr = getArray(33, 47)
  .concat(getArray(58, 64))
  .concat(getArray(91, 96));

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const hasUpper = upperCheckbox.checked;
  const hasNumber = numberCheckbox.checked;
  const hasSymbol = symbolCheckbox.checked;
  const passwordLenght = rangeNumber.value;
  const copyEl = document.querySelector(".copy");

  const password = generatePassword(
    hasUpper,
    hasNumber,
    hasSymbol,
    passwordLenght
  );

  passwordDisplay.textContent = password;
  copyEl.innerHTML = "Click to Copy";
});

function generatePassword(hasUpper, hasNumber, hasSymbol, passwordLenght) {
  let passwordArr = lowerArr;
  if (hasUpper) passwordArr = passwordArr.concat(upperArr);
  if (hasNumber) passwordArr = passwordArr.concat(numberArr);
  if (hasSymbol) passwordArr = passwordArr.concat(symbolArr);

  let randomChar = [];
  for (let i = 0; i < passwordLenght; i++) {
    let random = passwordArr[Math.floor(Math.random() * passwordArr.length)];
    randomChar.push(random);
  }
  return randomChar.join("");
}

//copy password
passwordDisplay.addEventListener("click", function () {
  let text = document.querySelector(".password").innerHTML;
  const copyEl = document.querySelector(".copy");
  navigator.clipboard.writeText(text);

  copyEl.innerHTML = "Copied";
});

//update slider
const rangeInputs = document.querySelectorAll('input[type="range"]');
function sliderUpdate(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;
  const output = document.querySelector(".output");

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}
rangeInputs.forEach((input) => {
  input.addEventListener("input", sliderUpdate);
});
