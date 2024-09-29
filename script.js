// script.js

// Prædefinerede opgaver for alle personer
const tasks = [
    "Take out the trash",
    "Wipe the kitchen counter with universal cleaner and a cloth",
    "Clean the sink with all-purpose cleaner, followed by descaling solution",
    "Clean the stovetops with stovetop cleaner",
    "Wipe the windowsill with Universal cleaner and a cloth",
    "Wipe the dining table with Universal cleaner and a cloth",
    "Wipe the coffee table with Universal cleaner and a cloth",
    "Wipe the TV table",
    "Vacuum the floor",
    "Mop the floor",
    "Wash dish towels, cloths, sponges, and hand towels at 90 degrees Celsius",
    "Hang dish towels, cloths, sponges, and hand towels to dry or use a dryer",
    "Put dish towels, cloths, sponges, and hand towels back in the drawer when dry",
    "Take returnable bottles to a supermarket and buy relevant kitchen items",
    "Descale the electric kettle"
];

// Funktion til at indlæse opgaver baseret på den valgte person
function loadTasks() {
    const person = document.getElementById('person-select').value;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Nulstil opgavelisten

    if (person !== "") {  // Tjek at der er valgt en person
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;

            // Opret en knap til at markere opgaven som fuldført
            const completeButton = document.createElement('button');
            completeButton.textContent = "Done";
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
