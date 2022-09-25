import { css } from '@emotion/css'
import { restyler } from 'reactronic-dom'
import { themes } from './Themes'

export const style = restyler(() => {

  return {
    Page: css`
      margin: 0;
      gap: 2em 4em;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 1fr 1.2fr;
      overflow-x: hidden;
    `,

    Title: css`
      text-align: center;
      font-size: 300%;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
    `,

    Content: css`
      grid-row: 2 / span 1;
      grid-column: 1 / span 2;
      font-size: 100%;
      line-height: 1.2;
      padding-bottom: 0.5ch;
      overflow: hidden;
    `,

    List: css`

    `,

    Input_Block: css`
      display: flex;
      margin: 15px 15px 0 15px;
    `,

    Input_Area: css`
      font-size: 20px;
      resize: none;
      width: 100%;
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgba(254, 255, 254, 0.7);
      }
      transition: background-color .5s;
      border: 2px solid rgb(7, 68, 175);
      border-radius: 10px;
    `,

    Submit: css`
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgba(254, 255, 254, 0.7);
      }
      transition: background-color .5s;
      border: 2px solid rgb(7, 68, 175);
      border-radius: 10px;
    `,

    Submit_Img: css`
      height: 25px;
      width: 25px;
      margin: 5px;
    `,

    Description: css`
      font-size: 110%;

      img {
        height: 0.93ch;
        margin-left: 1ch;
        margin-right: 1ch;
      }

      b {
        font-weight: inherit;
      }

      a {
        border-bottom: 0.05em dashed ${themes.active.emphasizedText};
      }
    `
  }
})
