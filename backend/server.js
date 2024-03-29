import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"
import cors from 'cors'
import multer from "multer";
import crypto from 'crypto'

import { google } from 'googleapis'
import fs from "fs"
// AWS S3 //
import { S3Client, PutObjectCommand ,GetObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "console";



dotenv.config()

const app = express()

const mdb = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,  
})

app.use(express.json())
app.use(cors()) 

// Get All Queries //
app.get("/trips", (req,res) => {
    const q = 'SELECT * FROM holidaytrips'
    mdb.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    }) 
})

// Get All Tags //
app.get("/tags", (req,res) => {
    const q = 'SELECT * FROM tags'
    mdb.query(q, (err,data) => {
        if(err) return res.json(err) 
        return res.json(data)
    })
})

// Add new trip // 
app.post("/new-trip",(req,res) => {
    const q = "INSERT INTO holidaytrips (`place_name`,`date_to_visit`,`how_long`,`activities`,`google_maps_link`) VALUES (?)" 
    const val = [
        req.body.place_name,
        req.body.date_to_visit,
        req.body.how_long,
        req.body.activities, 
        req.body.google_maps_link]
    mdb.query(q, [val],(err,data) => {
        if(err) return res.json(err)
        return res.json("success")
    })
})

// Delete Trip
app.delete("/trips/:id", (req,res)=> {
    const tripId = req.params.iddb
    const q = "DELETE FROM holidaytrips WHERE id = ?"

    mdb.query(q, [tripId], (err,data)=>{
        if (err) return res.send(err)
        return res.json(data)
    })
})

//Get One Trip

app.get("/trips/:id", (req,res) => {
    const tripId = req.params.id
    const q = 'SELECT * from holidaytrips WHERE id = ?'

    mdb.query(q, [tripId],(err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})

//Update Trip
app.put("/trips/:id", (req,res)=> {
    const tripId = req.params.id
    const q = "UPDATE holidaytrips SET `place_name` = ?,`date_to_visit`= ?,`how_long` = ?,`activities` = ?,`google_maps_link` = ? WHERE id = ?"
    const values =[
        req.body.place_name,
        req.body.date_to_visit,
        req.body.how_long,
        req.body.activities, 
        req.body.google_maps_link]

    mdb.query(q, [...values,tripId], (err,data)=>{
        if (err) return res.send(err)
        return res.json(data)
    })
})
 
//Port for Mysql
app.listen(process.env.MYSQL_PORT, () => {
    console.log(`connected to port ${process.env.MYSQL_PORT}`); 
})

//--------AWS S3 Bucket

const storage = multer.memoryStorage()
const upload = multer({ storage: storage})
const randomImageName = (bytes = 32 ) => crypto.randomBytes(bytes).toString('hex')

app.post('/admin/photos', upload.single('images'), async (req,res) => {
    console.log("body", req.body)
    const imageName = randomImageName()
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })
    await s3.send(command) 

    
    const q = "INSERT INTO holidayphotos (`photo_name`,`date`, `place_name`,`province`,`city`,`country`, `tags`) VALUES (?)" 
    const val = [
        imageName,
        req.body.date,
        req.body.place_name,
        req.body.province,
        req.body.city,
        req.body.country,
        req.body.tags    
    ]
    mdb.query(q, [val],(err,data) => {
        if(err) console.log(err)
        else console.log(data)
        res.send(data)  
    })
})

app.get('/admin/all-photos',async (req,res) => {

    // const q = "SELECT * FROM holidayphotos"
    // mdb.query(q, (err,data) => {
    //         if(err) console.log(err)
    //         else console.log(data)
    //         res.json(data)  
    //     })

    const qu ="SELECT photo_name FROM holidayphotos"
    const ar = []
    const photo = mdb.query(qu, (err, data) => {
        return new Promise((success, rej) => {
            data.forEach((d)=> {
            const getObjectParams= {
                Bucket: process.env.BUCKET_NAME,
                Key: d.photo_name}
            const command = new GetObjectCommand(getObjectParams);
            const url = getSignedUrl(s3, command, { expiresIn: 3600 });
            console.log(url);
                success(d.imageUrl = url)   
       }
       )}) 
    })
    
})

app.delete('/admin/posts/:id', async (req,res) => {
    const id = req.params.id
    res.send({})
})


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION_NAME
})