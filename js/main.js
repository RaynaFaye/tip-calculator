const form = document.querySelector('.calculator__form');
const billInput = form.bill;
let billInputValue = 0;
const peopleInput = form.people;
let peopleInputValue = 0;
const tipButtons = form.tip;
const tipCustom = form.tipcustom;
let tipPercentage = 0;

//Get Tip Percentage Value
//Remove checked on labels
function removeCheckedLabels() {
  tipButtons.forEach((tipButton) => {
    tipButton.previousElementSibling.classList.remove('checked');
  });
}
tipButtons.forEach((tipButton) => {
  tipButton.addEventListener('click', function (event) {
    removeCheckedLabels();
    event.target.previousElementSibling.classList.add('checked');
    tipPercentage = event.target.value;
  });
});
tipCustom.addEventListener('focusout', function (event) {
  if (event.target.value === '' || isNaN(event.target.value)) {
    event.target.value = 0;
  }
  tipPercentage = event.target.value;
});

//Get Value from input and set Value of that input
function getInputValue(theInput, theValue) {
  if (isNaN(parseFloat(theInput.value))) {
    theInput.value = '';
    return;
  }
  if (parseFloat(theInput.value) === 0) {
    theInput.labels[0].nextElementSibling.style.display = 'block';
    theInput.classList.add('error');
    return;
  }
  theInput.labels[0].nextElementSibling.style.display = 'none';
  theInput.classList.remove('error');
  theValue = parseFloat(theInput.value);
  theInput.value = parseFloat(theInput.value);
  console.log(theInput, theValue);
}

//Get Bill Value
billInput.addEventListener('focusout', function () {
  getInputValue(billInput, billInputValue);
});

//Get Number of People Value
peopleInput.addEventListener('focusout', function () {
  getInputValue(peopleInput, peopleInputValue);
  console.log(peopleInput.labels[0].nextElementSibling);
});
