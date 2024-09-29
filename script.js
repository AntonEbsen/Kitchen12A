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

            // Opret en knap til at markere opgaven som fuldført
            const completeButton = document.createElement('button');
            completeButton.textContent = "Fuldført";
            completeButton.addEventListener('click', () => {
                li.classList.add('completed');  // Markér opgaven som fuldført
                completeButton.disabled = true;  // Deaktivér knappen, når opgaven er fuldført
            });

            // Tilføj knappen til opgaven
            li.appendChild(completeButton);
            taskList.appendChild(li);
        });
    }
}
