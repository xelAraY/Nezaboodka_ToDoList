import { cached, isnonreactive, nonreactive, ReactiveObject } from 'reactronic'

export class Page extends ReactiveObject {
  @isnonreactive readonly pagePath: string
  menuName: string
  title: string
  topicPath: string
  content: string
  isActive: boolean

  constructor(pathBase: string) {
    super()
    this.pagePath = pathBase
    this.menuName = ''
    this.title = ''
    this.topicPath = ''
    this.content = ''
    this.isActive = false
  }
}
