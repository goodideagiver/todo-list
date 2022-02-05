const addListButton = document.querySelector('#addList');
const newListNameElement = document.querySelector('#listName');

const getNewListName = () => {
	const newListName = newListNameElement.value;
	newListNameElement.value = '';
	return newListName;
};

const createListNodeEntryInput = () => {
	const ListNodeEntryInput = createCustomNode('section', {
		customClassname: 'list-nav',
	});
	const addButton = createCustomNode('button', {
		text: 'Add',
		customClassname: 'add-list-entry',
		saveOnClick: true,
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
	const sortList = createCustomNode('button', {
		text: 'Sort',
		callbackFunc: (e) => sortEntryList(e.target),
	});
	const entryInput = createCustomNode('input', { placeholder: 'List entry name' });
	clickElementOnEnterPress(entryInput, addButton);
	addElementsToContainer(ListNodeEntryInput, [entryInput, addButton, sortList]);
	return ListNodeEntryInput;
};

const createListDeleteButton = () =>
	createCustomNode('button', {
		icon: '<i class="fas fa-trash-alt"></i>',
		customClassname: 'delete-list-button',
		saveOnClick: true,
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

clickElementOnEnterPress(newListNameElement, addListButton);
