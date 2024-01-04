export default class Jobs {

    constructor() {
        this.jobs = {};
    }

    addJob(id) {
        this.jobs[id] = [];
    }

    addTask(id, task) {
        this.jobs[id].push(task);
    }

    getTasks(id) {
        return this.jobs[id];
    }
}