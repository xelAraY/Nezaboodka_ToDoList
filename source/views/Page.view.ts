import { Div, Render } from 'reactron'
import { App } from '../models/App'
import { style } from './Page.css'

export function PageView(app: App, customizeContent?: Render<HTMLElement>, customizeRightSide?: Render<HTMLElement>) {
  return (
    Div('PageView-', e => {
      e.className = style.class.Page
      Div('Title', e => {
        e.className = style.class.Title
        e.innerHTML = 'My to-do list'
      })
      Div('Content', e => {
        e.className = style.class.Content

      }).wrapBy(customizeContent)
    }).wrapBy(customizeRightSide)
  )
}
