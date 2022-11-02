import { Div, Place, Render } from 'verstak'
import { App } from '../models/App'
import { style } from './Page.css'

export function PageView(app: App, customizeContent?: Render<HTMLDivElement, unknown, Place, void>, customizeRightSide?: Render<HTMLDivElement, unknown, Place, void>) {
  return (
    Div('PageView-', undefined, e => {
      e.className = style.class.Page
      Div('Title', undefined, e => {
        e.className = style.class.Title
        e.innerHTML = 'My to-do list'
      })
      Div('Content', undefined, e => {
        e.className = style.class.Content

      }).wrapBy(customizeContent)
    }).wrapBy(customizeRightSide)
  )
}
