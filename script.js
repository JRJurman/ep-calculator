// function to get the total Effect points available
function getTotalAvailableEP() {
	// get EP from selected table button
	const startingEP = epTable.querySelector('[selected]')?.getAttribute('value') || '0';

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
const tableButtons = window.epTable.querySelectorAll('button');
tableButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		tableButtons.forEach((button) => button.removeAttribute('selected'));
		event.target.setAttribute('selected', '');
	});
});
tableButtons.forEach((button) => button.addEventListener('click', updateEPLabel));

// update the Ace button to also trigger the `updateEPLabel`
isAce.addEventListener('click', () => {
	isAce.toggleAttribute('selected');
});
isAce.addEventListener('click', updateEPLabel);

// on any of the effect point selectors updating, update the EP cost
const epEffectInputs = document.querySelectorAll('[ep-input]');
epEffectInputs.forEach((input) => {
	input.addEventListener('change', updateEPLabel);
});
