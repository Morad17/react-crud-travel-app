import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()

const app = express()

const db = mysql.createConnection({
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
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Insert new trip //
app.post("/new-trip",(req,res) => {
    const q = "INSERT INTO holidaytrips (`place_name`,`date_to_visit`,`how_long`,`activities`,`google_maps_link`) VALUES (?)"
    const val = [
        req.body.place_name,
        req.body.date_to_visit,
        req.body.how_long,
        req.body.activities, 
        req.body.google_maps_link]
    db.query(q, [val],(err,data) => {
        if(err) return res.json(err)
        return res.json("success")
    })
})

app.listen(8000, () => {
    console.log("connected to backend");
})