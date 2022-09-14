import { ReactiveObject, reaction, Transaction, isnonreactive, nonreactive } from 'reactronic'
import { Page } from './Page'

export const ProjectLink = 'https://github.com/xelAraY/Nezaboodka_ToDoList'

export class App extends ReactiveObject {
  @isnonreactive readonly version: string
  @isnonreactive readonly homePage: Page;

  @isnonreactive readonly pages: Page[];
  activePage: Page;

  constructor(version: string) {
    
    super()
    this.version = version
    this.homePage = new Page('/home')
    this.pages = [this.homePage]
    this.activePage = this.homePage

  }
}
