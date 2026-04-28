let tasks = JSON.parse(localStorage.getItem('pro-todo')) || [];
let filter = 'all';
let draggedItemIndex = null;

function show() {
    localStorage.setItem('pro-todo', JSON.stringify(tasks));
    const listEl = document.getElementById('list');
    listEl.innerHTML = '';

    const completedCount = tasks.filter(t => t.completed).length;
    document.getElementById('stats').innerText = `Total: ${tasks.length} | Done: ${completedCount}`;

    tasks.forEach((t, i) => {
        if (filter === 'pending' && t.completed) return;
        if (filter === 'completed' && !t.completed) return;

        let li = document.createElement('li');
        li.draggable = true;
        
        li.ondragstart = () => draggedItemIndex = i;
        li.ondragover = (e) => e.preventDefault();
        li.ondrop = () => {
            const temp = tasks[draggedItemIndex];
            tasks.splice(draggedItemIndex, 1);
            tasks.splice(i, 0, temp);
            show();
        };

        li.innerHTML = `
            <span class="${t.completed ? 'done' : ''}" onclick="toggle(${i})">
                <strong>${t.text}</strong> <br>
                <small>${t.date || 'No date'}</small> 
                <span class="prio-tag">${t.prio == 3 ? 'High' : t.prio == 2 ? 'Mid' : 'Low'}</span>
            </span>
            <button onclick="del(${i})">Delete</button>
        `;
        listEl.appendChild(li);
    });
}

function add() {
    const text = document.getElementById('in').value;
    const date = document.getElementById('date-in').value;
    const prio = document.getElementById('prio-in').value;

    if (text) {
        tasks.push({ text, date, prio, completed: false });
        document.getElementById('in').value = '';
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

function sortTasks(type) {
    if (type === 'date') tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (type === 'prio') tasks.sort((a, b) => b.prio - a.prio);
    show();
}

function setFilter(f) {
    filter = f;
    show();
}

function toggleDark() {
    document.body.classList.toggle('dark');
}

show();
