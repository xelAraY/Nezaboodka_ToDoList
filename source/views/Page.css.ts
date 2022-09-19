import { css } from '@emotion/css'
import { restyler } from 'reactronic-dom'
import { themes } from './Themes'

export const style = restyler(() => {

  const RightSide = css`
    grid-row: 1 / span 2;
    grid-column: 3;
    overflow: hidden;

    @media screen and (max-width: 450px) {
      grid-row: 2 / span 1;
      grid-column: 1 / span 2;
      justify-self: center;
    }
  `

  return {
    Page: css`
      margin: 0;
      gap: 2em 4em;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 1fr 1.2fr;
      overflow-x: hidden;

      @media screen and (max-width: 450px) {
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 1fr 1fr;
      }
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

      @media screen and (max-width: 450px) {
        grid-row: 3 / span 1;
        font-size: 120%;
      }
    `,

    RightSide,

    List: css`

    `,

    Completed_Tasks: css`

    `,

    Input_Block: css`
      display: flex;
      margin: 15px 15px 0 15px;
      border: solid black;
    `,

    Input_Area: css`
      font-size: 15px;
      resize: none;
      width: 100%;
      background-color: rgba(0, 0 ,0 , 0.4);
      :hover {
        background-color: rgba(136, 149, 144, 0.1);
      }
      transition: background-color .5s;
      border: none;
    `,

    Submit: css`
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.4);
      :hover {
        background-color: rgba(136, 149, 144, 0.1);
      }
      transition: background-color .5s;
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
    `,

    Picture: css`
      ${RightSide}

      img {
        width: 100%;
        height: auto;
      }

      @media screen and (max-width: 450px) {
        width: 60%;
      }
    `,
  }
})
