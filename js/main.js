const form = document.querySelector('.calculator__form');
const billInput = form.bill;
let billInputValue = 0;
const peopleInput = form.people;
let peopleInputValue = 0;
const tipButtons = form.tip;
const tipCustom = form.tipcustom;
let tipPercentage = 0;
let resultsButton = document.querySelector('.results__button');

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
});

//Get Number of People Value
peopleInput.addEventListener('focusout', function () {
  getInputValue(peopleInput, peopleInputValue);
});

//Clear form and disable button again
resultsButton.addEventListener('click', function () {
  resultsButton.disabled = true;
  billInput.value = '';
  peopleInput.value = '';
  removeCheckedLabels();
});
