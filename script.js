let tasks = JSON.parse(localStorage.getItem('todo-data')) || [];
let filter = 'all';

function show() {
    localStorage.setItem('todo-data', JSON.stringify(tasks));
    const listEl = document.getElementById('list');
    listEl.innerHTML = '';

    let doneCount = tasks.filter(t => t.completed).length;
    document.getElementById('stats').innerText = `Total: ${tasks.length} | Done: ${doneCount}`;

    tasks.forEach((t, index) => {

        if (filter === 'done' && !t.completed) return;

        let li = document.createElement('li');
        li.innerHTML = `
            <span class="${t.completed ? 'done' : ''}" onclick="toggle(${index})">${t.text}</span>
            <button onclick="del(${index})">x</button>
        `;
        listEl.appendChild(li);
    });
}

function add() {
    let input = document.getElementById('in');
    if (input.value) {
        tasks.push({ text: input.value, completed: false });
        input.value = '';
        show();
    }
}

function toggle(i) {
    tasks[i].completed = !tasks[i].completed;
    show();
}

function del(i) {
    tasks.splice(i, 1);
    show();
}

function setFilter(f) {
    filter = f;
    show();
}

show();
