const form = document.querySelector('.calculator__form');
const billInput = form.bill;
let billInputValue = 0;
const peopleInput = form.people;
let peopleInputValue = 0;
const tipButtons = form.tip;
const tipCustom = form.tipcustom;
let tipPercentage = 0;

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
