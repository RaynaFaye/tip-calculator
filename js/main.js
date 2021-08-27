const form = document.querySelector('.calculator__form');
const billInput = form.bill;
let billInputValue = '';
const peopleInput = form.people;
let peopleInputValue = '';
const tipButtons = form.tip;
const tipCustom = form.tipcustom;
let tipPercentage = 0;
let resultsButton = document.querySelector('.results__button');
let tipAmount = document.querySelector('.results__number__tip-value');
let tipAmountValue = 0;
let totalAmount = document.querySelector('.results__number__total-value');

//Update the value boxes when entering value in each input or selecting radio button
function updateValue(input, value) {
  switch (input) {
    case 'bill':
      billInputValue = value;
      break;
    case 'people':
      peopleInputValue = value;
      break;
    case 'tip':
      tipPercentage = value;
      break;
    case 'tipcustom':
      tipPercentage = value;
      break;
  }
}

function clearValues() {
  resultsButton.disabled = true;
  billInput.value = '';
  billInputValue = '';
  peopleInput.value = '';
  peopleInputValue = '';
  tipCustom.value = '';
  removeCheckedLabels();
  tipPercentage = 0;
  tipAmountValue = 0;
  tipAmount.textContent = '0.00';
  totalAmount.textContent = '0.00';
}

//Calculate tip per person
function calculateTipPerPerson() {
  if (billInputValue === '' || peopleInputValue === '') {
    return;
  }
  let percentage = parseFloat(tipPercentage / 100);
  let tipValue = ((billInputValue / peopleInputValue) * percentage).toFixed(2);
  tipAmount.textContent = tipValue;
  tipAmountValue = parseFloat(tipValue);
}
//Calculate total per person
function calculateTotalPerPerson() {
  if (billInputValue === '' || peopleInputValue === '') {
    return;
  }
  totalAmount.textContent = (billInputValue / peopleInputValue + tipAmountValue).toFixed(2);
}

//Get Tip Percentage Value
//Remove checked on labels
function removeCheckedLabels() {
  tipButtons.forEach((tipButton) => {
    tipButton.previousElementSibling.classList.remove('checked');
    tipButton.checked = false;
  });
}
tipButtons.forEach((tipButton) => {
  tipButton.addEventListener('click', function (event) {
    removeCheckedLabels();
    tipButton.checked = true;
    event.target.previousElementSibling.classList.add('checked');
    tipPercentage = parseFloat(event.target.value);
    resultsButton.disabled = false;
    updateValue(tipButton, tipPercentage);
    calculateTipPerPerson();
    calculateTotalPerPerson();
  });
});
tipCustom.addEventListener('focusin', removeCheckedLabels);
tipCustom.addEventListener('focusout', function (event) {
  removeCheckedLabels();
  if (event.target.value === '' || isNaN(event.target.value)) {
    event.target.value = 0;
  }
  tipPercentage = parseFloat(event.target.value);
  updateValue(tipCustom, tipPercentage);
  calculateTipPerPerson();
  calculateTotalPerPerson();
});

//Get Value from input and set Value of that input
function getInputValue(theInput, theValue) {
  if (isNaN(parseFloat(theInput.value))) {
    theInput.value = '';
    return;
  }
  resultsButton.disabled = false;
  if (parseFloat(theInput.value) === 0) {
    theInput.labels[0].nextElementSibling.style.display = 'block';
    theInput.classList.add('error');
    return;
  }
  theInput.labels[0].nextElementSibling.style.display = 'none';
  theInput.classList.remove('error');
  theValue = parseFloat(theInput.value);
  theInput.value = parseFloat(theInput.value);
  updateValue(theInput.name, theValue);
}

//Get Bill Value
billInput.addEventListener('focusout', function () {
  getInputValue(billInput, billInputValue);
  calculateTipPerPerson();
  calculateTotalPerPerson();
});
billInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    getInputValue(billInput, billInputValue);
    calculateTipPerPerson();
    calculateTotalPerPerson();
  }
});

//Get Number of People Value
peopleInput.addEventListener('focusout', function () {
  getInputValue(peopleInput, peopleInputValue);
  calculateTipPerPerson();
  calculateTotalPerPerson();
});
peopleInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    getInputValue(peopleInput, peopleInputValue);
    calculateTipPerPerson();
    calculateTotalPerPerson();
  }
});

//Clear form and disable button again
resultsButton.addEventListener('click', clearValues);
