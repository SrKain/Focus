const btnNewTaks = document.querySelector('.app__button--add-task');
const formNewTask = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea');
const ul = document.querySelector('.app__section-task-list');
const btnCancel = document.querySelector('.app__form-footer__button--cancel')

const TaskList = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTasks () {
    localStorage.setItem('tasks', JSON.stringify(TaskList));
}

function ElementTask(task){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF">
            </circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E">
            </path>
        </svg>
`
    const p = document.createElement('p');
    p.textContent = task.description;
    p.classList.add('app__section-task-list-item-description')

    const bt = document.createElement('button');
    bt.classList.add('app_button-edit');
    bt.onclick = () => {
        const newDescription = prompt(`Qual será a nova descrição para => "${task.description}"`)
        if (newDescription) {
            p.textContent =  newDescription;
            task.description = newDescription;
            updateTasks();}
        };   

    const btImg = document.createElement('img');
    btImg.setAttribute('src', '/imagens/edit.png')
    bt.append(btImg);
    li.append(svg);
    li.append(p)
    li.append(bt);

    return li;
}

btnNewTaks.addEventListener('click', () => {
    formNewTask.classList.toggle('hidden')
})

btnCancel.addEventListener('click', ()=> {
    textArea.value = '';
    formNewTask.classList.toggle('hidden');
})

formNewTask.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    const task = {
        description: textArea.value
    }

    TaskList.push(task);
    const taskElement = ElementTask(task);
    updateTasks();
    ul.append(taskElement)
    textArea.value = '';
    formNewTask.classList.add('hidden');
    })

    TaskList.forEach(task => {
        const taskElement = ElementTask(task);
        ul.append(taskElement);
    })

