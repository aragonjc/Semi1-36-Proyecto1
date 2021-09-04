const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.listen(port,()=> {
    console.log(`App Runnig on http://localhost:${port}`);
})