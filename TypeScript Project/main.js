"use strict";
var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes[PriorityTypes["low"] = 0] = "low";
    PriorityTypes[PriorityTypes["medium"] = 1] = "medium";
    PriorityTypes[PriorityTypes["high"] = 2] = "high";
})(PriorityTypes || (PriorityTypes = {}));
class TaskManager {
    constructor() {
        var _a;
        this.tasks = [
            {
                id: 3,
                title: 'First Task | EXAMPLE',
                addedTime: '2023-06-11 11:11:22',
                description: 'Example | Select a title, priority and a description for your task and then click the "Add" button.',
                isCompleted: false,
                priority: PriorityTypes.low,
            },
            {
                id: 8,
                title: 'Second Task | EXAMPLE',
                addedTime: '2023-06-11 11:11:22',
                description: 'Example| You can delete a task by clicking on the "❌" button, Complete a task by clicking the "✔️" button. Completed tasks will become grey-meaning they are no longer open but are there for display.',
                isCompleted: false,
                priority: PriorityTypes.high,
            },
            {
                id: 15,
                title: 'Third Task | EXAMPLE ',
                addedTime: '2023-06-11 11:11:22',
                description: 'Example | Each Task is marked by color by priority. Green is low priority Red is high priority and Orange is medium priority.',
                isCompleted: false,
                priority: PriorityTypes.medium,
            },
        ];
        this.showTasks();
        const elem = document.querySelector("header");
        (_a = elem === null || elem === void 0 ? void 0 : elem.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", ev => {
            const elemTitle = elem === null || elem === void 0 ? void 0 : elem.querySelector("input");
            const elemPriority = elem === null || elem === void 0 ? void 0 : elem.querySelector("select");
            const elemDesc = elem === null || elem === void 0 ? void 0 : elem.querySelector("textarea");
            const title = (elemTitle === null || elemTitle === void 0 ? void 0 : elemTitle.value) || '';
            const priority = (elemPriority === null || elemPriority === void 0 ? void 0 : elemPriority.value) || '';
            const description = (elemDesc === null || elemDesc === void 0 ? void 0 : elemDesc.value) || '';
            if (elemTitle) {
                elemTitle.value = "";
            }
            if (elemPriority) {
                elemPriority.value = "";
            }
            if (elemDesc) {
                elemDesc.value = "";
            }
            this.addTask(title, description, +priority);
        });
    }
    addTask(title, description, priority) {
        const ids = this.tasks.map(x => x.id);
        const max = Math.max(...ids);
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        const h = now.getHours();
        const mn = now.getMinutes();
        const s = now.getSeconds();
        const addedTime = `${y}-${(m < 10 ? '0' + m : m)}-${d} ${h}:${mn}:${s}`;
        this.tasks.push({
            id: max + 1,
            title,
            addedTime,
            description: description,
            isCompleted: false,
            priority: priority || PriorityTypes.low,
        });
        this.showTasks();
        this.snackBarADD();
    }
    snackBarADD() {
        const snackbar = document.querySelector('#snackbar');
        if (snackbar) {
            snackbar.innerHTML = 'Task Added Successfully!';
            snackbar.classList.add('showAdd');
            setTimeout(() => {
                snackbar.classList.remove('showAdd');
            }, 5 * 1000);
        }
    }
    snackBarRemove() {
        const snackbar = document.querySelector('#snackbar');
        if (snackbar) {
            snackbar.innerHTML = 'Task Removed Successfully!';
            snackbar.classList.add('showRe');
            setTimeout(() => {
                snackbar.classList.remove('showRe');
            }, 5 * 1000);
        }
    }
    removeTask(taskId) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);
        this.snackBarRemove();
        this.showTasks();
    }
    completeTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        if (item) {
            item.isCompleted = true;
        }
        this.showTasks();
    }
    unCompleteTask(taskId) {
        const item = this.tasks.find(x => x.id == taskId);
        if (item) {
            item.isCompleted = false;
        }
        this.showTasks();
    }
    showTasks() {
        const elem = document.querySelector("div.tasks");
        if (elem) {
            elem.innerHTML = "";
        }
        this.tasks.forEach(t => {
            var _a, _b, _c;
            const div = document.createElement("div");
            if (t.isCompleted) {
                div.classList.add('completed');
            }
            switch (t.priority) {
                case PriorityTypes.low:
                    div.classList.add('low');
                    break;
                case PriorityTypes.medium:
                    div.classList.add('medium');
                    break;
                case PriorityTypes.high:
                    div.classList.add('high');
                    break;
            }
            div.innerHTML = `
                <h3>${t.title}</h3>
                <p class="cardText"><b>Time Created:</b> ${t.addedTime}</p>
                <p class="cardText"><b>Description:</b> ${t.description || '*No Description*'}</p>

                <footer>
                    <button class="remove">❌</button>
                    ${t.isCompleted ? '<button class="uncomplete">Uncomplete</button>' : '<button class="complete">✔️</button>'}
                </footer>
            `;
            (_a = div.querySelector('.remove')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.removeTask(t.id));
            (_b = div.querySelector('.complete')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.completeTask(t.id));
            (_c = div.querySelector('.uncomplete')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.unCompleteTask(t.id));
            elem === null || elem === void 0 ? void 0 : elem.appendChild(div);
        });
    }
}
const tasks = new TaskManager;
document.addEventListener('DOMContentLoaded', function () {
    const imageDisplay = document.getElementById('example');
    let i = 1;
    setInterval(() => {
        i++;
        if (i === 5) {
            i = 1;
        }
        if (imageDisplay instanceof HTMLImageElement) {
            imageDisplay.src = `/TypeScript Project/Images/ss${i}.png`;
        }
    }, 3 * 1000);
});
