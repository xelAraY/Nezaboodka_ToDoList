import { css } from '@emotion/css'
import { restyler } from 'reactronic-dom'

export const style = restyler(() => {
  return {

    Task: css`
      display: flex;
      margin: 15px 15px 0 15px;
    `,

    Active_Task_text: css`
      font-size: 20px;
      width: 100%;
      background-color: rgb(254, 255, 254);
      cursor: pointer;
      :hover {
        background-color: rgba(0, 255 , 0, 0.5);
      }
      transition: background-color .5s;
      border: 2px solid rgb(7, 68, 175);
      border-radius: 6px 0 0 6px;
      border-right: none;
    `,

    Done_Task_text: css`
      font-size: 20px;
      width: 100%;
      background-color: rgb(254, 255, 254);
      cursor: pointer;
      :hover {
        background-color: rgba(0, 255 , 0, 0.5);
      }
      transition: background-color .5s;
      color: rgb(170, 217, 219);
      text-decoration: line-through;
      border: 2px solid rgb(7, 68, 175);
      border-radius: 6px 0 0 6px;
      border-right: none;
    `,

    Task_edit: css`
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgb(255, 255, 0);
      }
      transition: background-color .5s;
      cursor: pointer;
      border: 2px solid rgb(7, 68, 175);
      border-left: none;
      border-right: none;
    `,

    Task_delete: css`
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgb(255, 0, 0);
      }
      transition: background-color .5s;
      cursor: pointer;
      border-radius: 0 6px 6px 0;
      border: 2px solid rgb(7, 68, 175);
      border-left: none;
    `,

    Input_text: css`
      font-size: 20px;
      resize: none;
      width: 100%;
      background-color: rgb(254, 255, 254);
      border: 2px solid rgb(7, 68, 175);
      border-radius: 6px 0 0 6px;
      border-right: none;
    `,

    Edit_Icon: css`
      height: 25px;
      width: 25px;
      margin: 5px;
    `,

    Delete_Icon: css`
      height: 25px;
      width: 25px;
      margin: 5px;
    `,
  }
})