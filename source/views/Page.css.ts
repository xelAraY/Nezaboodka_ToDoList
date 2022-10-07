import { css } from '@emotion/css'
import { restyler } from 'reactronic-dom'

export const style = restyler(() => {

  return {
    Page: css`
      margin: 0;
      gap: 2em 4em;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 1fr 1.2fr;
      overflow-x: hidden;
      position: relative;
      overflow-y: hidden;
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
      overflow: auto scroll;
      height: calc(100vh - 180px);
    `,

    Input_Block: css`
      display: flex;
      position: fixed;
      bottom: 20px;
      width: 100%;
      margin: 15px;
      right: 15px;
      left: 0;
    `,

    Input_Area: css`
      font-size: 20px;
      resize: none;
      height: 35px;
      width: calc(100vw - 73px);
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgba(254, 255, 254, 0.7);
      }
      transition: background-color .5s;
      border: 2px solid rgb(7, 68, 175);
      border-radius: 6px 0 0 6px;
      border-right: none;
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
      border-radius: 0 6px 6px 0;
      border-left: none;
      margin-right: 32px;
    `,

    Submit_Img: css`
      height: 25px;
      width: 25px;
      margin: 5px;
    `,

    Priority: css`
      align-items: center;
      cursor: pointer;
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgba(254, 255, 254, 0.7);
      }
      transition: background-color .5s;
      border: 2px solid rgb(7, 68, 175);
      border-left: none;
      border-right: none;
    `,

    Priority_Name: css`
      text-align: center;
      color: white;
      font-size: 30px;
      margin-top: 15px;
    `
  }
})
