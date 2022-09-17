import { ReactiveObject, reaction, Transaction, isnonreactive, nonreactive, transaction } from 'reactronic'
import { Page } from './Page'
import { Task } from './Task'

export const ProjectLink = 'https://github.com/xelAraY/Nezaboodka_ToDoList'

export class App extends ReactiveObject {
  @isnonreactive readonly version: string
  @isnonreactive readonly homePage: Page;
  tasksList: Task[] = []

  constructor(version: string) {
    super()
    this.version = version
    this.homePage = new Page('/home')
  }

  convertText(text: string): string {
    while (text.includes('\n')) {
      text.replace('\n', '<br/>')
    }
    return text
  }

  @transaction
  addTask(text: string): void {
    this.tasksList.push(new Task(this.convertText(text)))
  }

  @transaction
  deleteTask(task: Task): void {
    this.tasksList.splice(this.tasksList.indexOf(task), 1)
  }

  @transaction
  editTask(task: Task, newText?: string): void {
    if (task.isEdit) {
      if (newText != null) {
        task.text = this.convertText(newText)
      }
      task.isEdit = !task.isEdit
    }
    else
      task.isEdit = !task.isEdit
  }
}
