// function to get the total Effect points available
function getTotalAvailableEP() {
	// get EP from selected table button
	const startingEP = baseEPRadioGroup.getAttribute('value') || '0';

	// check if isAce is checked
	const aceEP = isAce.hasAttribute('selected') ? 1 : 0;
	return parseInt(startingEP) + aceEP;
}

// function to get the total Effect Point cost
function getCostEP() {
	const epEffectInputs = document.querySelectorAll('[ep-input]');
	let cost = 0;
	epEffectInputs.forEach((input) => {
		cost += parseInt(input.value);
	});
	return cost;
}

function updateEPLabel() {
	const availableEP = getTotalAvailableEP();
	const costEP = getCostEP();

	window.epLabel.textContent = `${costEP} EP / ${availableEP} EP`;
	window.epLabel.ariaLabel = `Cost: ${costEP} EP out of ${availableEP} EP`;
}

// update the top baseline EP table to trigger the `updateEPLabel`
const tableButtons = window.epTable.querySelectorAll('ep-radio-button');
tableButtons.forEach((button) => button.addEventListener('click', updateEPLabel));

// update the Ace button to also trigger the `updateEPLabel`
isAce.addEventListener('click', updateEPLabel);

// on any of the effect selections being focused, update the side-panel
[...effectSelection.children].forEach((effectControl) => {
	effectControl.addEventListener('focus', (event) => {
		console.log(event.target);
	});
});
