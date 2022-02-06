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
			addElementsToContainer(modalAction, [yesBtn, noBtn]);
		} else {
			const cancel = createCustomNode('button', {
				customClassname: 'btn-normal',
				text: 'Cancel',
			});
			modalAction.append(cancel);
		}
		modalElement.append(modalAction);
		return modalElement;
	}
};
