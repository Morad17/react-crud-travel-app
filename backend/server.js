import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})


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
    const q = "INSERT INTO holidaytrips ('palce-name', 'date-to-visit', 'how-long', 'activities', 'google-maps-link')"
    const val = ["bali","2023-10-23","surfing,rafting,snorkeling,fire show", "https://jasnjda"]
    db.query(q, [val],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8000, () => {
    console.log("connected to backend");
})