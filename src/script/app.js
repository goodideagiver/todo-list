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

const createCustomNode = (elementType, object) => {
	const button = document.createElement(elementType);
	if (object) {
		object.callbackFunc ? button.addEventListener('click', object.callbackFunc) : 0;
		object.customClassname ? button.classList.add(object.customClassname) : 0;
		object.icon ? (button.innerHTML = object.icon) : 0;
		object.placeholder ? (button.placeholder = object.placeholder) : 0;
		object.text ? (button.innerText = object.text) : 0;
		object.input ? (button.value = object.input) : 0;
	}
	return button;
};

const createUpDownButtons = () => {
	const buttonsContainer = createCustomNode('div', {
		icon: null,
		customClassname: 'up-down-container',
	});
	const up = createCustomNode('button', {
		icon: '<i class="fas fa-angle-up"></i>',
		customClassname: 'up-list-btn',
		callbackFunc: moveListItem,
	});
	const down = createCustomNode('button', {
		icon: '<i class="fas fa-angle-down"></i>',
		customClassname: 'down-list-btn',
		callbackFunc: moveListItem,
	});
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
	const confirm = createCustomNode('button', {
		icon: '<i class="fas fa-check"></i>',
		callbackFunc: () => editModeRestore(confirm),
	});
	const decline = createCustomNode('button', {
		icon: '<i class="fas fa-times"></i>',
		callbackFunc: () => editModeRestore(decline, oldText),
	});
	const wrapper = createCustomNode('section', {
		customClassname: 'edit-mode-buttons',
	});
	addElementsToContainer(wrapper, [confirm, createUpDownButtons(), decline]);
	return wrapper;
};

const createEditModeElements = (userText) => {
	const editModeWrapper = createCustomNode('div', {
		customClassname: 'edit-mode',
	});
	const listInput = createCustomNode('input', { input: userText });
	const buttonsWrapper = createEditModeButtons(userText);
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
	createCustomNode('button', {
		icon: '<i class="fas fa-wrench"></i>',
		customClassname: 'entry-edit-button',
		callbackFunc: editModeLauncher,
	});

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
	createCustomNode('button', {
		icon: '<i class="fas fa-trash-alt"></i>',
		customClassname: 'delete-entry-button',
		callbackFunc: (e) => e.target.closest('.list-entry').remove(),
	});

const createEntryButtons = () => {
	const entryButtonsContainer = createCustomNode('section', {
		customClassname: 'list-entry-buttons',
	});
	addElementsToContainer(entryButtonsContainer, [
		createEditButton(),
		createUpDownButtons(),
		createDeleteEntryButton(),
	]);
	return entryButtonsContainer;
};

const createListEntry = (userInputText) => {
	const entryLine = createCustomNode('div', {
		customClassname: 'list-entry',
	});
	const entryText = createCustomNode('section', {
		customClassname: 'user-entry-text',
	});
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
	const ListNodeEntryInput = createCustomNode('section', {
		customClassname: 'list-nav',
	});
	const addButton = createCustomNode('button', {
		customClassname: 'add-list-entry',
		callbackFunc: () => {
			if (entryInput.value > '') {
				const entryContainer = addButton.parentElement;
				entryContainer.parentElement
					.querySelector('.list-entry-container')
					.appendChild(createListEntry(entryInput.value));
				entryInput.value = '';
			} else {
				alert('Cannot add an empty list entry');
			}
		},
	});
	addButton.innerText = 'Add';
	const entryInput = createCustomNode('input', { placeholder: 'List entry name' });
	addElementsToContainer(ListNodeEntryInput, [entryInput, addButton]);
	return ListNodeEntryInput;
};

const createListDeleteButton = () =>
	createCustomNode('button', {
		icon: '<i class="fas fa-trash-alt"></i>',
		customClassname: 'delete-list-button',
		callbackFunc: (e) => e.target.closest('.list-container').remove(),
	});

const createListEntryContainer = () =>
	createCustomNode('main', { customClassname: 'list-entry-container' });

const createListNodeHeader = (listInputName) => {
	const listHeader = document.createElement('header');
	const listName = createCustomNode('h2', { text: listInputName });
	addElementsToContainer(listHeader, [listName, createListDeleteButton()]);
	return listHeader;
};

const createListNode = (userInputName) => {
	if (userInputName > '') {
		const listContainer = createCustomNode('div', {
			customClassname: 'list-container',
		});
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

// const lists = [
// 	createListObject(
// 		'Test 1',
// 		'This is entry test number two',
// 		'You can edit and move entries, (Even in edit mode!)'
// 	),
// 	createListObject(
// 		'Second list, wow',
// 		'You can create as many lists as you like',
// 		'Hovewer the lists are stored until you reset or close this website (there is no backend)'
// 	),
// 	createListObject(
// 		'Thats fun',
// 		'Check links at the bottom to check out more of my projects',
// 		'Lorem ipsum'
// 	),
// ];

// lists.forEach((list) => {
// 	createFullList(list.name, list.entries);
// });

// const todoListApp = {
// 	list: {
// 		create: createFullList,
// 		listItem: {
// 			create: {
// 				entry: createListEntry,
// 			},
// 		},
// 	},
// };

// todoListApp.list.create('Test list', ['test']);

const getEntriesText = (parentList) => {
	let textList = [];
	parentList.querySelectorAll('.list-entry').forEach((element) => {
		textList.push(element.querySelector('.user-entry-text').innerText);
	});
	return textList;
};

const saveChanges = () => {
	const editModeButtons = document.querySelectorAll('.edit-mode-buttons');
	if (editModeButtons) {
		editModeButtons.forEach((element) => {
			element.firstElementChild.click();
		});
	}
	const lists = [];
	mainListNodeContainer.childNodes.forEach((list) => {
		const listObj = {
			listName: list.querySelector('header h2').innerText,
			listEntries: getEntriesText(list),
		};
		lists.push(listObj);
	});
	console.log('Saving lists', lists);
	localStorage.setItem('lists', JSON.stringify(lists));
};

//saveChanges();

if (localStorage.getItem('lists')) {
	const lists = JSON.parse(localStorage.getItem('lists'));
	console.log('loaded from local storage', lists);
	mainListNodeContainer.innerHTML = '';
	for (let i = 0; i < lists.length; i++) {
		createFullList(lists[i].listName, lists[i].listEntries);
	}
}
