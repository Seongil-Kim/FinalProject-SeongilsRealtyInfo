const port = 8000;

const express=require("express");
const helmet = require("helmet");
const morgan = require('morgan');

express()
    .use(helmet())
    .use(morgan('tiny'))
    .get('/', (req, res) => {
          // res.send('Hello World!')
          res.status(200).json({status: 200, message: "Hi"})
    }
        )
    .listen(port, () => {
        console.log(`Server launched on port ${port}`)
      }); 