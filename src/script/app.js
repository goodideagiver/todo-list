const mainListNodeContainer = document.querySelector('#listsContainer');
const addListButton = document.querySelector('#addList');

const createDeleteButton = () => {
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-entry-button');
	deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
	deleteButton.addEventListener('click', () => {
		deleteButton.closest('.list-entry').remove();
	});
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

const createListEntry = (userInputText) => {
	const entryLine = document.createElement('div');
	const entryText = document.createElement('section');
	entryText.innerText = userInputText;
	entryText.classList.add('user-entry-text');
	entryLine.classList.add('list-entry');
	entryLine.appendChild(entryText);
	entryLine.appendChild(createEntryButtons());
	return entryLine;
};

const getUserListName = () => {
	return document.querySelector('#listName').value;
};

const createListNav = () => {
	const listForm = document.createElement('section');
	listForm.classList.add('list-nav');
	const addButton = document.createElement('button');
	addButton.classList.add('add-list-entry');
	addButton.innerText = 'Add';
	const entryInput = document.createElement('input');
	entryInput.placeholder = 'List entry name';
	addButton.addEventListener('click', () => {
		if (entryInput.value > '') {
			const entryContainer = addButton.parentElement;
			entryContainer.parentElement
				.querySelector('.list-entry-container')
				.appendChild(createListEntry(entryInput.value));
		} else {
			alert('Cannot add an empty list entry');
		}
	});
	listForm.appendChild(entryInput);
	listForm.appendChild(addButton);
	return listForm;
};

const createListDeleteButton = () => {
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-list-button');
	deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
	return deleteButton;
};

const createListNode = (userInputName) => {
	if (getUserListName() > '') {
		const listContainer = document.createElement('div');
		listContainer.classList.add('list-container');
		const listHeader = document.createElement('header');
		const listDelete = createListDeleteButton();
		const listName = document.createElement('h2');
		listName.innerText = userInputName;
		listHeader.appendChild(listName);
		listHeader.appendChild(listDelete);

		const listEntryContainer = document.createElement('main');
		listEntryContainer.classList.add('list-entry-container');

		[listHeader, , createListNav(), listEntryContainer].forEach(
			(element) => {
				listContainer.appendChild(element);
			}
		);
		console.log(listContainer);
		return listContainer;
	} else {
		alert('List name cannot be empty');
		return;
	}
};

addListButton.addEventListener('click', () => {
	mainListNodeContainer.appendChild(createListNode(getUserListName()));
});
