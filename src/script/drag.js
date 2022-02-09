// const getDragAfterElement = (container, y) => {
// 	const draggableElements = [
// 		...container.querySelectorAll('.list-entry:not(.dragging)'),
// 	];

// 	draggableElements.reduce(
// 		(closest, child) => {
// 			const box = child.getBoundingClientRect();
// 			const offset = y - box.top - box.height / 2;
// 			if (offset < 0 && offset > closest.offset) {
// 				return { offset: offset, element: child };
// 			} else {
// 				return closest;
// 			}
// 		},
// 		{
// 			offset: Number.NEGATIVE_INFINITY,
// 		}
// 	);
// };

const addDraggingFunc = targetElement => {
	const entry = targetElement;
	entry.addEventListener('dragstart', () => {
		entry.classList.add('dragging');
		entry.addEventListener('dragend', () => {
			entry.classList.remove('dragging');
		});
	});
};

// const launchDragging = () => {
// 	document.querySelectorAll('.list-entry').forEach(draggable => {
// 		draggable.addEventListener('dragstart', () => {
// 			draggable.classList.add('dragging');
// 		});

// 		draggable.addEventListener('dragend', () => {
// 			draggable.classList.remove('dragging');
// 		});
// 	});

// 	document.querySelectorAll('.list-entry-container').forEach(container => {
// 		container.addEventListener('dragover', e => {
// 			e.preventDefault();
// 			const afterElement = getDragAfterElement(container, e.clientY);
// 			const draggable = document.querySelector('.dragging');
// 			if (afterElement == null) {
// 				container.appendChild(draggable);
// 			} else {
// 				container.insertBefore(draggable, afterElement);
// 			}
// 		});
// 	});
// };

//this is not my idea
//source: https://www.youtube.com/watch?v=jfYWwQrtzzY&t
