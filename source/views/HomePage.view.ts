import { Div, RxDiv } from 'reactronic-dom'
import { PageView } from './Page.view'
import { style } from './Page.css'
import { App, ProjectLink } from '../models/App'

export function HomePageView(app: App) {
  return (
    PageView(app.homePage, (node, e) => {
      node.render()
      RxDiv('Description', null, e => {
        e.className = style.class.Description
      })
    }, (node, e) => {
      node.render()
      Div('Picture', e => {
        e.className = style.class.Picture
      })
    })
  )
}
