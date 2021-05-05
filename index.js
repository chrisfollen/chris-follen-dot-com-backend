const express = require('express')
const app = express()
const port = 4000

app.get('/fun', (request, response) => {
    response.send({message: 'whatever'})
})

app.listen(port, () => console.log(`listening on port ${port}`))
