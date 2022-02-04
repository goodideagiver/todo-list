const mainListNodeContainer = document.querySelector('#listsContainer');
const addListButton = document.querySelector('#addList');

const getListEntryIndex = (element) => {
	const listEntry = element.closest('.list-entry');
	const allParentListElements = listEntry.parentElement.children;
	let foundIndex;
	for (let i = 0; i < allParentListElements.length; i++) {
		foundIndex = allParentListElements[i] === listEntry ? i : 'match not found';
		if (i === foundIndex) {
			break;
		}
	}
	return foundIndex;
};

const addElementsToContainer = (container, elementsArray) => {
	elementsArray.forEach((element) => {
		container.appendChild(element);
	});
};

const createCustomNode = (elementType, icon, customClassname, callbackFunc) => {
	const button = document.createElement(elementType);
	if (icon) {
		button.innerHTML = icon;
	}
	if (customClassname) {
		button.classList.add(customClassname);
	}
	if (callbackFunc) {
		button.addEventListener('click', callbackFunc);
	}
	return button;
};

const createUpDownButtons = () => {
	const buttonsContainer = createCustomNode('div', null, 'up-down-container');
	const up = createCustomNode(
		'button',
		'<i class="fas fa-angle-up"></i>',
		'up-list-btn',
		moveListItem
	);
	const down = createCustomNode(
		'button',
		'<i class="fas fa-angle-down"></i>',
		'down-list-btn',
		moveListItem
	);
	addElementsToContainer(buttonsContainer, [up, down]);
	return buttonsContainer;
};

const editModeRestore = (element, oldText = '') => {
	const listEntry = element.closest('.list-entry');
	const userText = oldText > '' ? oldText : listEntry.querySelector('input').value;
	const editedEntry = createListEntry(userText);
	listEntry.parentElement.insertBefore(editedEntry, listEntry);
	listEntry.remove();
};

const createEditModeButtons = (oldText) => {
	const confirm = createCustomNode('button', '<i class="fas fa-check"></i>', null, () =>
		editModeRestore(confirm)
	);
	const decline = createCustomNode('button', '<i class="fas fa-times"></i>', null, () =>
		editModeRestore(decline, oldText)
	);
	const wrapper = createCustomNode('section', null, 'edit-mode-buttons');
	addElementsToContainer(wrapper, [confirm, createUpDownButtons(), decline]);
	return wrapper;
};

const createEditModeElements = (userText) => {
	const editModeWrapper = createCustomNode('div', null, 'edit-mode');
	const listInput = document.createElement('input');
	const buttonsWrapper = createEditModeButtons(userText);
	listInput.value = userText;
	addElementsToContainer(editModeWrapper, [listInput, buttonsWrapper]);
	return editModeWrapper;
};

const editModeLauncher = (e) => {
	const editButton = e.target;
	const listEntry = editButton.closest('.list-entry');
	const userEntryElement = listEntry.querySelector('.user-entry-text');
	listEntry.innerHTML = '';
	listEntry.appendChild(createEditModeElements(userEntryElement.innerText));
};

const createEditButton = () =>
	createCustomNode(
		'button',
		'<i class="fas fa-wrench"></i>',
		'entry-edit-button',
		editModeLauncher
	);

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
	} else if (listItemIndex === 0 && clickedButtonType === buttonClassTypes.up) {
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

const createDeleteEntryButton = () =>
	createCustomNode(
		'button',
		'<i class="fas fa-trash-alt"></i>',
		'delete-entry-button',
		(e) => e.target.closest('.list-entry').remove()
	);

const createEntryButtons = () => {
	const entryButtonsContainer = createCustomNode('section', null, 'list-entry-buttons');
	addElementsToContainer(entryButtonsContainer, [
		createEditButton(),
		createUpDownButtons(),
		createDeleteEntryButton(),
	]);
	return entryButtonsContainer;
};

const createListEntry = (userInputText) => {
	const entryLine = createCustomNode('div', null, 'list-entry');
	const entryText = createCustomNode('section', null, 'user-entry-text');
	entryText.innerText = userInputText;
	addElementsToContainer(entryLine, [entryText, createEntryButtons()]);
	return entryLine;
};

const getNewListName = () => {
	const newListNameElement = document.querySelector('#listName');
	const newListName = newListNameElement.value;
	newListNameElement.value = '';
	return newListName;
};

const createListNodeEntryInput = () => {
	const ListNodeEntryInput = createCustomNode('section', null, 'list-nav');
	const addButton = createCustomNode('button', null, 'add-list-entry', () => {
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
	addButton.innerText = 'Add';
	const entryInput = document.createElement('input');
	entryInput.placeholder = 'List entry name';
	addElementsToContainer(ListNodeEntryInput, [entryInput, addButton]);
	return ListNodeEntryInput;
};

const createListDeleteButton = () =>
	createCustomNode(
		'button',
		'<i class="fas fa-trash-alt"></i>',
		'delete-list-button',
		(e) => e.target.closest('.list-container').remove()
	);

const createListEntryContainer = () =>
	createCustomNode('main', null, 'list-entry-container');

const createListNodeHeader = (listInputName) => {
	const listHeader = document.createElement('header');
	const listName = document.createElement('h2');
	listName.innerText = listInputName;
	addElementsToContainer(listHeader, [listName, createListDeleteButton()]);
	return listHeader;
};

const createListNode = (userInputName) => {
	if (userInputName > '') {
		const listContainer = createCustomNode('div', null, 'list-container');
		const listHeader = createListNodeHeader(userInputName);
		addElementsToContainer(listContainer, [
			listHeader,
			createListNodeEntryInput(),
			createListEntryContainer(),
		]);
		return listContainer;
	} else {
		alert('List name cannot be empty');
		return;
	}
};

addListButton.addEventListener('click', () => {
	const getListName = getNewListName();
	if (getListName > '') {
		mainListNodeContainer.appendChild(createListNode(getListName));
	} else {
		alert('List name cannot be empty');
	}
});

const createFullList = (listName, nodeList = 0) => {
	const newList = createListNode(listName);
	const listEntryContainer = newList.querySelector('.list-entry-container');
	mainListNodeContainer.appendChild(newList);
	for (let i = 0; i < nodeList.length; i++) {
		listEntryContainer.appendChild(createListEntry(nodeList[i]));
	}
};

const createListObject = (listName, ...entries) => {
	const obj = {
		name: listName,
		entries: entries,
	};
	return obj;
};

const lists = [
	createListObject(
		'Test 1',
		'This is entry test number two',
		'You can edit and move entries, (Even in edit mode!)'
	),
	createListObject(
		'Second list, wow',
		'You can create as many lists as you like',
		'Hovewer the lists are stored until you reset or close this website (there is no backend)'
	),
	createListObject(
		'Thats fun',
		'Check links at the bottom to check out more of my projects',
		'Lorem ipsum'
	),
];

lists.forEach((list) => {
	createFullList(list.name, list.entries);
});

const todoListApp = {
	list: {
		create: createFullList,
		listItem: {
			create: {
				entry: createListEntry,
			},
		},
	},
};

todoListApp.list.create('Testowa lista', ['test']);
