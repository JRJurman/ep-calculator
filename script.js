// function to update the total Effect points available
function updateAvailableEPLabel() {
	// get EP from selected table button
	const startingEP = epTable.querySelector('[selected]')?.getAttribute('value') || '0';

	// check if isAce is checked
	const aceEP = isAce.hasAttribute('selected') ? 1 : 0;
	window.totalEPValue.textContent = parseInt(startingEP) + aceEP;
}

// function to update the total Effect Point cost
function updateCostEPLabel() {
	const epEffectInputs = document.querySelectorAll('[ep-input]');
	let cost = 0;
	epEffectInputs.forEach((input) => {
		cost += parseInt(input.value);
	});
	window.totalEPCost.textContent = cost;
}

// update the top baseline EP table to trigger the `updateAvailableEPLabel`
const tableButtons = window.epTable.querySelectorAll('button');
tableButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		tableButtons.forEach((button) => button.removeAttribute('selected'));
		event.target.setAttribute('selected', '');
	});
});
tableButtons.forEach((button) => button.addEventListener('click', updateAvailableEPLabel));

// update the Ace button to also trigger the `updateAvailableEPLabel`
isAce.addEventListener('click', () => {
	isAce.toggleAttribute('selected');
});
isAce.addEventListener('click', updateAvailableEPLabel);

// on any of the effect point selectors updating, update the EP cost
const epEffectInputs = document.querySelectorAll('[ep-input]');
epEffectInputs.forEach((input) => {
	input.addEventListener('change', updateCostEPLabel);
});
