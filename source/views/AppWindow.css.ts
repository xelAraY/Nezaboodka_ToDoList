import { css } from '@emotion/css'
import { restyler } from 'reactron'

export const style = restyler(() => {
  return {

    Body: css`
      background-image: url(../assets/background.jpg);
      background-size: cover;
      height: 100vh;
      width: 100%;
    `,
  }
})
