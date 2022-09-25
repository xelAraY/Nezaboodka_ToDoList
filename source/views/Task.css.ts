import { css } from '@emotion/css'
import { restyler } from 'reactronic-dom'

export const style = restyler(() => {
  return {

    Task: css`
      display: flex;
      margin: 15px 15px 0 15px;
      border: 2px solid rgb(7, 68, 175);
      animation-duration: 2s;
      animation-name: slidein;

      @keyframes slidein {
        from {
          margin-left: 100%;
          width: 300%;
        }

        to {
          margin-left: 15px;
          width: 100%;
        }
      }

    `,

    Active_Task_text: css`
      font-size: 20px;
      resize: none;
      width: 100%;
      background-color: rgb(254, 255, 254);
      cursor: pointer;
      :hover {
        background-color: rgba(0, 255 , 0, 0.5);
      }
      transition: background-color .5s;

    `,

    Done_Task_text: css`
      font-size: 20px;
      resize: none;
      width: 100%;
      background-color: rgb(254, 255, 254);
      cursor: pointer;
      :hover {
        background-color: rgba(0, 255 , 0, 0.5);
      }
      transition: background-color .5s;
      color: rgb(170, 217, 219);
      text-decoration: line-through;
    `,

    Task_edit: css`
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgb(255, 255, 0);
      }
      transition: background-color .5s;
      cursor: pointer;
    `,

    Task_delete: css`
      background-color: rgb(254, 255 ,254);
      :hover {
        background-color: rgb(255, 0, 0);
      }
      transition: background-color .5s;
      cursor: pointer;
    `,

    Input_text: css`
      font-size: 20px;
      resize: none;
      width: 100%;
      background-color: rgb(254, 255 ,254);
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