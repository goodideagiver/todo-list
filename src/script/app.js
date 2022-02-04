const createDeleteButton = () => {
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-entry-button');
	deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
	return deleteButton;
};

const createUpDownButtons = () => {
	const up = document.createElement('button');
	const down = document.createElement('button');
	const buttonsContainer = document.createElement('div');
	buttonsContainer.classList.add('up-down-container');
	up.innerHTML = '<i class="fas fa-angle-up"></i>';
	down.innerHTML = '<i class="fas fa-angle-down"></i>';
	[up, down].forEach((btn) => {
		buttonsContainer.appendChild(btn);
	});
	return buttonsContainer;
};

const createEntryButtons = () => {
	const entryButtonsContainer = document.createElement('section');
	entryButtonsContainer.classList.add('list-entry-buttons');
	[createUpDownButtons(), createDeleteButton()].forEach((button) => {
		entryButtonsContainer.appendChild(button);
	});
	return entryButtonsContainer;
};

const createEntry = (e, userInputText) => {
	const entryLine = document.createElement('div');
	const entryText = document.createElement('section');
	entryText.innerText = userInputText;
	entryText.classList.add('user-entry-text');
	entryLine.classList.add('list-entry');
	entryLine.appendChild(entryText);
	entryLine.appendChild(createEntryButtons());
	return entryLine;
};
