import React from 'react'
import {render, template} from 'rapscallion'
import styled from 'styled-components'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import express from 'express'

/* Simple styled component */
const Red = styled.div`
  color: red;
`

/* Define the express server */

const app = express()
app.get('/', (req, res) => {

  /* Using rapscallion's render component, this outputs a Renderer */
  const componentRenderer = render(<Red>red text?</Red>)

  /* Get styles from styleSheet */
  const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
  /*
    Output is an empty class: .sc-bdVaJa {}

    Works when using renderToString from react-dom/server,
    but not with rapscallion's render
  */


  /* Create the html template, fill with styles and component */
  const responseRenderer = template`
    <!DOCTYPE html>
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body><div id="root">${componentRenderer}</div></body>
    </html>
  `

  /* Stream and pipe out */
  responseRenderer.toStream().pipe(res)
})

app.listen(3000, () => console.log('Listening on localhost:3000'))
