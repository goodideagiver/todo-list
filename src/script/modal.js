const modalBackdrop = document.querySelector('.modal-container');
modalBackdrop.style.display = 'none';

const disableModal = () => {
	document.querySelector('.modal-box').remove();
	modalBackdrop.style.display = 'none';
};

const modalGenerator = (title, modal) => {
	if (title) {
		const modalElement = createCustomNode('div', { customClassname: 'modal-box' });
		const titleElement = createCustomNode('h2', { text: title });
		modalElement.append(titleElement);
		const modalAction = createCustomNode('div', { customClassname: 'modal-action' });

		if (modal && modal.lowerText) {
			const modalText = createCustomNode('p', { text: modal.lowerText });
			modalElement.append(modalText);
		}
		if (modal && modal.yesNo) {
			const yesBtn = createCustomNode('button', {
				customClassname: 'btn-danger',
				text: 'Yes',
			});
			const noBtn = createCustomNode('button', {
				customClassname: 'btn-normal',
				text: 'No',
			});
			noBtn.addEventListener('click', disableModal);
			if (modal.yesFunc) {
				yesBtn.addEventListener('click', (e, button) => {
					modal.yesFunc(e, button);
					disableModal();
				});
			}
			addElementsToContainer(modalAction, [yesBtn, noBtn]);
		} else {
			const cancel = createCustomNode('button', {
				customClassname: 'btn-normal',
				text: 'Ok',
			});
			cancel.addEventListener('click', disableModal);
			modalAction.append(cancel);
		}
		modalElement.append(modalAction);
		return modalElement;
	}
};

const showModal = (title, modal) => {
	modalBackdrop.style.display = '';
	modalBackdrop.append(modalGenerator(title, modal));
};

modalBackdrop.addEventListener('click', (e) => {
	e.target === modalBackdrop ? disableModal() : 0;
});
