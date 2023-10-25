const precentsArr = [
  {
    text: "5%",
    id: "1",
  },
  {
    text: "10%",
    id: "2",
  },
  {
    text: "15%",
    id: "3",
  },
  {
    text: "25%",
    id: "4",
  },
  {
    text: "50%",
    id: "5",
  },
];

const billInput = document.querySelector(".total-bill-input");
const precentsContainer = document.querySelector(".precents");
const peopleInput = document.querySelector(".people-input");
const customPercentInput = document.querySelector(".custom-tip-input");
const tipPerpersonField = document.querySelector(".tip-per-person");
const billPerPersonField = document.querySelector(".bill-per-person");
const resetButton = document.querySelector(".reset");

const contentLength = tipPerpersonField.textContent.length;
const contentLengthtotal = billPerPersonField.textContent.length;
const fontSize = Math.max(30, 10 - contentLength) + "px";
tipPerpersonField.style.fontSize = fontSize;
billPerPersonField.style.fontSize = fontSize;

let SelectedTipPercentage = 0;

const onClickHandler = (e) => {
  const clickedClass = e.target.classList[1]; // second class is the identifier

  const selectedOption = precentsArr.find((item) => item.id === clickedClass);

  if (selectedOption) {
    SelectedTipPercentage = parseFloat(selectedOption.text) / 100; // Convert the percentage to a decimal
    console.log(SelectedTipPercentage);
    calculateTipAndTotal();
  }
};

const createPrecentBox = function () {
  precentsArr.forEach((item) => {
    const precentBox = document.createElement("div");
    precentBox.classList.add("tip-precent");
    precentBox.classList.add(item.id);
    const percentSpan = document.createElement("span");

    percentSpan.classList.add(item.id);
    percentSpan.innerHTML = item.text;
    precentBox.appendChild(percentSpan);
    precentsContainer.appendChild(precentBox);
    precentsContainer.addEventListener("click", onClickHandler);
  });
};
createPrecentBox();
customPercentInput.addEventListener("input", () => {
  const customPercent = parseFloat(customPercentInput.value);
  if (!isNaN(customPercent) && customPercent >= 0) {
    SelectedTipPercentage = customPercent / 100;
    calculateTipAndTotal();
  }
});

const calculateTipAndTotal = () => {
  const billAmount = parseFloat(billInput.value);
  const numberOfPeople = parseFloat(peopleInput.value);

  if (
    !isNaN(billAmount) &&
    billAmount !== 0 &&
    billAmount > 0 && // Ensure billAmount is not zero and grater that zero
    !isNaN(numberOfPeople) &&
    numberOfPeople !== 0 // Ensure numberOfPeople is not zero
  ) {
    const tipAmount = billAmount * SelectedTipPercentage;
    const tipAmoutPerPerson = tipAmount / numberOfPeople;
    const totalAmount = billAmount + tipAmount;
    const totalAmountPerPerson = totalAmount / numberOfPeople;
    tipPerpersonField.innerHTML = tipAmoutPerPerson.toFixed(2);
    billPerPersonField.innerHTML = totalAmountPerPerson.toFixed(2);
  }
};

resetButton.addEventListener("click", () => {
  console.log("clicked");
  billPerPersonField.innerHTML = "0.00";
  tipPerpersonField.innerHTML = "0.00";
  billInput.value = "0";
  peopleInput.value = "0";
  customPercentInput.value = "";
});

billInput.addEventListener("input", calculateTipAndTotal);
peopleInput.addEventListener("input", calculateTipAndTotal);
