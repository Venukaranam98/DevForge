const express = require("express")

const app = express()


app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Node Backend Running",

        data: null

    })

})


app.listen(5000, () => {

    console.log("Server Running")

})