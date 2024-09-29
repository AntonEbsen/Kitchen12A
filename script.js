// script.js

// Prædefinerede opgaver til personer
const tasks = {
    person1: ["Rengør køkkenbord", "Tøm opvaskemaskinen", "Fej gulvet"],
    person2: ["Rengør køleskabet", "Ryd op på hylderne", "Tør komfur af"],
    person3: ["Rengør mikroovnen", "Tør overflader af", "Tag skraldet ud"]
};

// Funktion til at indlæse opgaver baseret på den valgte person
function loadTasks() {
    const person = document.getElementById('person-select').value;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Nulstil opgavelisten

    if (tasks[person]) {
        tasks[person].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            li.addEventListener('click', () => {
                li.classList.toggle('completed');  // Marker opgave som fuldført
            });
            taskList.appendChild(li);
        });
    }
}
