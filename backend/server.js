import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"
import cors from 'cors'

import { google } from 'googleapis'
import fs from "fs"



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

//---------------------------Google Drive

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)
// check if creds are present in a text file
try{
    const creds = fs.readFileSync("creds.json")
    oauth2Client.setCredentials(JSON.parse(creds))
} catch (err){
    console.log("creds not found");
}

app.get("/auth/google", (req,res)=> {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile" ,
         "https://www.googleapis.com/auth/drive"]
    })
    res.redirect(url)
})

app.get("/google/redirect", async (req,res) => {
    const { code } = req.query
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    fs.writeFileSync("creds.json", JSON.stringify(tokens))
    res.send("Success") 
})

app.get('/saveText/:sometext', (req,res) => {
    const drive = google.drive({version:'v3', auth: oauth2Client })
    const sometext = req.params.sometext

    drive.files.create({
        requestBody: {
            name: 'test.text',
            mimeType: "text/plain"
        },
        media: {
            mimeType: "text/plain",
            body: sometext,
        }
    })
    return "Success"
})

app.get('/uploadPicture', async (req,res) => {
    const drive = google.drive({version:'v3', auth: oauth2Client })

    drive.files.create({
        requestBody: {
            name: 'stock.JPG',
            mimeType: "image/JPG"
        },
        media: {
            mimeType: "image/JPG",
            body: fs.createReadStream("stock.JPG"), 
        },

    })
    return "Successfull upload"
    
})

//Port for Google Drive

app.listen(8080, () => {
    console.log(`connected to google port 8080`);
}) 