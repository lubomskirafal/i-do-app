const exportTasks = (tasks)=> {

    localStorage.setItem('tasks', JSON.stringify(tasks));

};

const importTasks = ()=> {

    const tasks = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')):[];

    return tasks;

};

export {
    exportTasks,
    importTasks
};