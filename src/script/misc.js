const disableEditMode = () => {
	const editModeButtons = document.querySelectorAll('.edit-mode-buttons');
	if (editModeButtons) {
		editModeButtons.forEach((element) => {
			element.firstElementChild.click();
		});
	}
};

const saveChanges = () => {
	disableEditMode();
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

const addElementsToContainer = (container, elementsArray) => {
	elementsArray.forEach((element) => {
		container.appendChild(element);
	});
};

const clickElementOnEnterPress = (element, elementToPress) => {
	element.addEventListener('keyup', (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			elementToPress.click();
		}
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
		object.saveOnClick ? button.addEventListener('click', saveChanges) : 0;
	}
	return button;
};
