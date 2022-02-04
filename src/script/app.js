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

const createEntryButtons = () => {};
