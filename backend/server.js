const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('server in running');
})

app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}`);
})

