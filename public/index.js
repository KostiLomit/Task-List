document.addEventListener('DOMContentLoaded', () => {

    const todosContainer = document.getElementById('todo-container');
    const addBtn = document.querySelector('.add-button');
    const inputTask = document.querySelector('.header_input');

    addBtn.addEventListener('click', () => {
        if (inputTask.value.trim() !== '') {
            const newTodo = createNewItem(inputTask.value, todosContainer.childElementCount +1);
            todosContainer.appendChild(newTodo);
            inputTask.value = ' ';
        }
    });
    
    

function createNewItem(text, id) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const itemLeft = document.createElement('div');
    itemLeft.classList.add('item-left');

    const numberOfItem = document.createElement('span');
    numberOfItem.classList.add('todo-number');
    numberOfItem.textContent = id;

    const checkbox = document.createElement('input');
    checkbox.classList.add('item-checkbox');
    checkbox.type = 'checkbox';

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                title.classList.add('item-title__strikethrough');
            } else {
                title.classList.remove('item-title__strikethrough');
            }
        });

    const title = document.createElement('h3');
    title.classList.add('item-title');
    title.textContent = text;

        itemLeft.appendChild(numberOfItem);
        itemLeft.appendChild(checkbox);
        itemLeft.appendChild(title);

    const itemRight = document.createElement('div');
    itemRight.classList.add('item-right')
    
    const date = document.createElement('span');
    date.classList.add('item-date');
    date.textContent = getNewDate();

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('item-button__delete');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        todoItem.style.display = 'none';
    });

        itemRight.appendChild(date);
        itemRight.appendChild(deleteBtn);

    todoItem.appendChild(itemLeft);
    todoItem.appendChild(itemRight);

    return todoItem;
}
const deleteAll = document.querySelector('.deleteAll-button');
const deleteLast = document.querySelector('.deleteLast-button');

deleteAll.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo-item');
    todos.forEach(todo => todo.remove());
});
deleteLast.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo-item');
    if (todos.length > 0) {
        todos[todos.length-1].remove();
    }
});

const search = document.querySelector('.footer_input');

search.addEventListener('input', () => {
    const filter = search.value.toLowerCase();
    const todos = document.querySelectorAll('.todo-item');

    todos.forEach(todo => {
        const titleElement = todo.querySelector('.item-title');
        const text = titleElement.textContent.toLowerCase();
        if (text.includes(filter)) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
});

// function updateStats() {
//     const total = document.querySelectorAll('.todo-item').length;
//     const completed = document.querySelectorAll('.todo-item input[type="checkbox"]:checked').length;
//     document.getElementById('count-all').textContent = `Total: ${totalCount}`;
//     document.getElementById('count-completed').textContent = `Completed: ${completedCount}`;
//     const observer = new MutationObserver(() => {
//         updateStats(); 
//     })
// }
 
function getNewDate() {
    const date = new Date();
    return date.toLocaleString();
};

});


