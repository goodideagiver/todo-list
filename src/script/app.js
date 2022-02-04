const mainListNodeContainer = document.querySelector('#listsContainer');
const addListButton = document.querySelector('#addList');

const getListEntryIndex = (element) => {
	const listEntry = element.closest('.list-entry');
	const allParentListElements = listEntry.parentElement.children;
	let foundIndex;
	for (let i = 0; i < allParentListElements.length; i++) {
		foundIndex =
			allParentListElements[i] === listEntry ? i : 'match not found';
		if (i === foundIndex) {
			break;
		}
	}
	return foundIndex;
};

const moveListItem = (e) => {
	const buttonClassTypes = {
		up: 'up-list-btn',
		down: 'down-list-btn',
	};
	const clickedButton = e.target;
	const listArray = clickedButton.closest('.list-entry-container').children;
	const listItemIndex = getListEntryIndex(clickedButton);
	const clickedButtonType = clickedButton.closest('button').className;
	const clickedEntry = clickedButton.closest('.list-entry');

	if (listArray.length === 1) {
		alert('Cant move entry when there is only one');
		return;
	} else if (
		listArray.length - 1 === listItemIndex &&
		clickedButtonType === buttonClassTypes.down
	) {
		alert('Cant move down entry that is last');
		return;
	} else if (
		listItemIndex === 0 &&
		clickedButtonType === buttonClassTypes.up
	) {
		alert('Cant move up entry that is first');
		return;
	}

	switch (clickedButtonType) {
		case buttonClassTypes.up:
			clickedEntry.parentElement.insertBefore(
				clickedEntry,
				listArray[listItemIndex - 1]
			);
			break;
		case buttonClassTypes.down:
			clickedEntry.parentElement.insertBefore(
				listArray[listItemIndex].nextSibling,
				clickedEntry
			);
			break;
		default:
			return;
	}
};

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
	up.classList.add('up-list-btn');
	down.classList.add('down-list-btn');
	down.innerHTML = '<i class="fas fa-angle-down"></i>';
	[up, down].forEach((btn) => {
		buttonsContainer.appendChild(btn);
	});
	up.addEventListener('click', moveListItem);
	down.addEventListener('click', moveListItem);
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
	const newListNameElement = document.querySelector('#listName');
	const newListName = newListNameElement.value;
	newListNameElement.value = '';
	return newListName;
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
			entryInput.value = '';
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
	if (userInputName > '') {
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
	const getListName = getUserListName();
	if (getListName > '') {
		mainListNodeContainer.appendChild(createListNode(getListName));
	}
});
