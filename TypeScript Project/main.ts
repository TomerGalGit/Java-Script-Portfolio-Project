interface Task {
    id: number;
    title: string;
    description: string;
    addedTime: string;
    priority: PriorityTypes;
    isCompleted: boolean;
}

enum PriorityTypes {
    low,
    medium,
    high,
}

class TaskManager {
    tasks: Task[] = [
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

    constructor() {
        this.showTasks();

        const elem = document.querySelector("header");

        elem?.querySelector("button")?.addEventListener("click", ev => {
            const elemTitle = elem?.querySelector<HTMLInputElement>("input");
            const elemPriority = elem?.querySelector<HTMLSelectElement>("select");
            const elemDesc = elem?.querySelector<HTMLTextAreaElement>("textarea");

            const title = elemTitle?.value || '';
            const priority = elemPriority?.value || '';
            const description = elemDesc?.value || '';

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

    addTask(title: string, description:string ,priority?: PriorityTypes) {
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
        const snackbar: HTMLDivElement | null = document.querySelector('#snackbar');
        if (snackbar) {
          snackbar.innerHTML = 'Task Added Successfully!';
          snackbar.classList.add('showAdd');
          setTimeout(() => {
            snackbar.classList.remove('showAdd');
          }, 5 * 1000);
        }
      }

      snackBarRemove() {
        const snackbar: HTMLDivElement | null = document.querySelector('#snackbar');
        if (snackbar) {
          snackbar.innerHTML = 'Task Removed Successfully!';
          snackbar.classList.add('showRe');
          setTimeout(() => {
            snackbar.classList.remove('showRe');
          }, 5 * 1000);
        }
      }

    removeTask(taskId: number) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);
        this.snackBarRemove();
        this.showTasks();
    }

    completeTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);

        if (item) {
            item.isCompleted = true;
        }

        this.showTasks();
    }

    unCompleteTask(taskId: number) {
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
            const div: HTMLDivElement | null = document.createElement("div");

            
            if (t.isCompleted) {
                div.classList.add('completed');
              }
            switch (t.priority) {
                case PriorityTypes.low : div.classList.add('low'); break;
                case PriorityTypes.medium : div.classList.add('medium'); break;
                case PriorityTypes.high : div.classList.add('high'); break;
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

            div.querySelector('.remove')?.addEventListener("click", () => this.removeTask(t.id));
            div.querySelector('.complete')?.addEventListener("click", () => this.completeTask(t.id));
            div.querySelector('.uncomplete')?.addEventListener("click", () => this.unCompleteTask(t.id));

            elem?.appendChild(div);
        });
    }
}
const tasks = new TaskManager;

document.addEventListener('DOMContentLoaded', function() {
    const imageDisplay: HTMLElement | null = document.getElementById('example');
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