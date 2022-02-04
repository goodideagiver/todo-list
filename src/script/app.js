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

const editModeRestore = (element, oldText = '') => {
	const listEntry = element.closest('.list-entry');
	const userText =
		oldText > '' ? oldText : listEntry.querySelector('input').value;
	console.log(listEntry, userText);
	const editedEntry = createListEntry(userText);
	listEntry.parentElement.insertBefore(editedEntry, listEntry);
	listEntry.remove();
};

const createEditModeButtons = (oldText) => {
	const confirm = document.createElement('button');
	confirm.innerHTML = '<i class="fas fa-check"></i>';
	const decline = document.createElement('button');
	decline.innerHTML = '<i class="fas fa-times"></i>';
	const wrapper = document.createElement('section');
	wrapper.appendChild(confirm);
	wrapper.appendChild(createUpDownButtons());
	wrapper.appendChild(decline);
	decline.addEventListener('click', () => {
		editModeRestore(decline, oldText);
	});
	confirm.addEventListener('click', () => {
		editModeRestore(confirm);
	});
	return wrapper;
};

const createEditModeElements = (userText) => {
	const editModeWrapper = document.createElement('div');
	editModeWrapper.classList.add('edit-mode');
	const listInput = document.createElement('input');
	const buttonsWrapper = createEditModeButtons(userText);
	listInput.value = userText;
	buttonsWrapper.classList.add('edit-mode-buttons');
	[listInput, buttonsWrapper].forEach((element) =>
		editModeWrapper.appendChild(element)
	);
	return editModeWrapper;
};

const editModeLauncher = (e) => {
	const editButton = e.target;
	const listEntry = editButton.closest('.list-entry');
	const userEntryElement = listEntry.querySelector('.user-entry-text');
	listEntry.innerHTML = '';
	listEntry.appendChild(createEditModeElements(userEntryElement.innerText));
};

const createEditButton = () => {
	const editButton = document.createElement('button');
	editButton.innerHTML = '<i class="fas fa-wrench"></i>';
	editButton.classList.add('entry-edit-button');
	editButton.addEventListener('click', editModeLauncher);
	return editButton;
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
		clickedEntry.parentElement.insertBefore(
			clickedEntry,
			clickedEntry.parentElement.firstElementChild
		);
		return;
	} else if (
		listItemIndex === 0 &&
		clickedButtonType === buttonClassTypes.up
	) {
		clickedEntry.parentElement.appendChild(clickedEntry);
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

const createEntryButtons = () => {
	const entryButtonsContainer = document.createElement('section');
	entryButtonsContainer.classList.add('list-entry-buttons');
	[createEditButton(), createUpDownButtons(), createDeleteButton()].forEach(
		(button) => {
			entryButtonsContainer.appendChild(button);
		}
	);
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
	deleteButton.addEventListener('click', () => {
		deleteButton.closest('.list-container').remove();
	});
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
	} else {
		alert('List name cannot be empty');
	}
});

const createMultipleEntries = (...entrys) => {
	let entryNodeList = [];
	for (let i = 0; i < entrys.length; i++) {
		entryNodeList.push(createListEntry(entrys[i]));
	}
	return entryNodeList;
};

const createFullList = (listName, nodeList = 0) => {
	const newList = createListNode(listName);
	const listEntryContainer = newList.querySelector('.list-entry-container');
	mainListNodeContainer.appendChild(newList);
	for (let i = 0; i < nodeList.length; i++) {
		listEntryContainer.appendChild(nodeList[i]);
	}
};

createFullList(
	'Test list',
	createMultipleEntries(
		'Test 1',
		'This is entry test number two',
		'You can edit and move entries, (Even in edit mode!)'
	)
);

createFullList(
	'Second list, wow',
	createMultipleEntries(
		'You can create as many lists as you like',
		'Hovewer the lists are stored until you reset or close this website (there is no backend)'
	)
);

createFullList(
	'Thats fun',
	createMultipleEntries(
		'Check links at the bottom to check out more of my projects',
		'Lorem ipsum'
	)
);
