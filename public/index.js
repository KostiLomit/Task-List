document.addEventListener('DOMContentLoaded', () => {

    const todosContainer = document.getElementById('todo-container');
    const addBtn = document.querySelector('.add-button');
    const inputTask = document.querySelector('.header_input');

    addBtn.addEventListener('click', () => {
        if (inputTask.value.trim() !== '') {
            const newTodo = createNewItem(inputTask.value, todosContainer.childElementCount + 1);
            todosContainer.appendChild(newTodo);
            inputTask.value = ''; // Очистка поля ввода
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
        itemRight.classList.add('item-right');

        const date = document.createElement('span');
        date.classList.add('item-date');
        date.textContent = getNewDate();

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('item-button__delete');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            todoItem.remove(); // Удаление элемента
            updateStats(); // Обновление статистики
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
        updateStats(); // Обновление статистики после удаления всех задач
    });

    deleteLast.addEventListener('click', () => {
        const todos = document.querySelectorAll('.todo-item');
        if (todos.length > 0) {
            todos[todos.length - 1].remove();
            updateStats(); // Обновление статистики после удаления последней задачи
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

    const showAll = document.querySelector('.showAll-button');
    const showCompl = document.querySelector('.showCompleted-button');

    showAll.addEventListener('click', () => {
        const todos = document.querySelectorAll('.todo-item');
        todos.forEach(todo => todo.style.display = 'flex');
    });

    showCompl.addEventListener('click', () => {
        const todos = document.querySelectorAll('.todo-item');
        todos.forEach(todo => {
            if (todo.querySelector('input[type="checkbox"]').checked) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        });
    });

    function getNewDate() {
        const date = new Date();
        return date.toLocaleString();
    }

    const showTodos = 12;
    let todosData = [];

    async function getTodos() {
        try {
            if (!todosData.length) {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const result = await response.json();
                todosData = result;
            }
        } catch (err) {
            console.log('error:', err);
            alert('Не удалось загрузить todos. Пожалуйста, попробуйте снова позже.');
        }
    }

    function renderStartPage(data) {
        const array = data.slice(0, showTodos);
        createToDos(array);
        updateStats(); // Обновление статистики после рендеринга начальной страницы
    }

    function createToDos(data) {
        const container = document.getElementById('todo-container');
        data.forEach(todo => {
            const { userId, id, title, completed } = todo;

            const todoEl = `
            <div class="todo-item">
                <div class="item-left">
                    <span class="todo-number">${id}</span>
                    <input type="checkbox" class="item-checkbox" ${completed ? 'checked' : ''}>
                    <h3 class="item-title">${title}</h3>
                </div>
                <div class="item-right">
                    <span class="item-date">${getNewDate()}</span>
                    <button class="item-button close-button">X</button>
                </div>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', todoEl);
        });
    }

    const jsonplaceBtn = document.querySelector('.jsonplaceholder-button');
    getTodos();

    jsonplaceBtn.addEventListener('click', () => {
        renderStartPage(todosData);
    });

    function updateStats() {
        const totalCount = document.querySelectorAll('.todo-item').length;
        const completedCount = document.querySelectorAll('.todo-item input[type="checkbox"]:checked').length;
        document.getElementById('count-all').textContent = `Total: ${totalCount}`;
        document.getElementById('count-completed').textContent = `Completed: ${completedCount}`;
    }

    const observer = new MutationObserver(() => {
        updateStats();
    });

    observer.observe(todosContainer, {
        childList: true,
        subtree: true,
    });

    todosContainer.addEventListener('change', updateStats);
});
