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
	const powerfulEPValue = +powerfulEP.getAttribute('value');
	const versatileEPValue = +versatileEP.getAttribute('value');
	const weaknessEPValue = +weaknessEP.getAttribute('value');
	const consistentEPValue = consistentEP.hasAttribute('selected') ? 1 : 0;
	const gimmickEPValue = gimmickEP.hasAttribute('selected') ? -1 : 0;
	return powerfulEPValue + versatileEPValue + weaknessEPValue + consistentEPValue + gimmickEPValue;
}

function updateEPLabel() {
	const availableEP = getTotalAvailableEP();
	const costEP = getCostEP();

	window.epLabel.textContent = `${costEP} EP / ${availableEP} EP`;
	window.epLabel.ariaLabel = `Cost: ${costEP} EP out of ${availableEP} EP`;
}

// have all controls trigger updateEPLabel
const radioButtons = document.querySelectorAll('ep-radio-button');
const checkButtons = document.querySelectorAll('ep-check-button');
const counterButtons = document.querySelectorAll('ep-button-counter');
[...radioButtons, ...checkButtons, ...counterButtons].forEach((button) =>
	button.addEventListener('click', updateEPLabel)
);

const toggleDisplay = (event) => {
	// hide all description blocks
	effectDescription.querySelectorAll('[category]').forEach((descriptionBlock) => {
		descriptionBlock.style.display = '';
	});

	// get the target description block and set the display to block
	const category = event.target.getAttribute('description');
	const descriptionBlock = effectDescription.querySelector(`[category=${category}]`);
	descriptionBlock.style.display = 'block';
};

// on any of the effect selections being focused, update the side-panel
effectSelection.querySelectorAll('ep-button-counter, ep-radio-button, ep-check-button').forEach((effectControl) => {
	effectControl.addEventListener('focus', toggleDisplay);
});
