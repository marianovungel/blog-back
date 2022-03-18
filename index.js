require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const multer = require("multer")
const cors = require('cors')
const path = require("path")
const morgan = require("morgan")
//routes
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users.routes")
const postsRouter = require("./routes/posts.routes")
const categoryRouter = require("./routes/categories.routes")
const mongoose = require('mongoose');

//conexão com database
//conectar ao Bongodb Atlas
require('./services/database')

//configuração do multer para upload de fotos
app.use(express.urlencoded({extended: true}))


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(__dirname, "./", "images"));
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    },
    limits:{
        fileSize: 4*1024*1024,
    },
    fileFilter: (req, file, cb)=>{
        const allowedMimes=[
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cd(new error("Invalid file type."))
        }
    }
})


const upload = multer({storage: storage})
app.post("api/upload", upload.single("file", (req, res)=>{
    try{
        res.status(200).json("file has been uploaded")
    }catch(err){
        res.json(err)
    }
}))

app.use("/images", express.static(path.resolve(__dirname, "./", "images")))
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "/*");
    res.header("Access-Control-Allow-Methods", 'GET,POST','PUT','DELETE');
    app.use(cors())
    next();
})
app.use(cors())
app.use(morgan("dev"))

//config. routes
app.use(bodyParser.json())
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/posts", postsRouter)
app.use("/api/categories", categoryRouter)

app.listen("5000", (req, res)=>{
    console.log("it up")
})