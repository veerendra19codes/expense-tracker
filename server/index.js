import express from "express";
import cors from "cors";
import {} from 'dotenv/config';
import mongoose from "mongoose";
import Transaction from "./models/Transaction.js";
const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get("/api/test", (req, res) => {
    res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
    const {name, description, datetime, price } = req.body;
        //object from db      //model/Schema
    const transaction = await Transaction.create({name, description, datetime, price});
    res.json(transaction);
});

// delete transaction
// app.delete('/api/transaction/:id',  async (req, res) => {
//     try {
//         const property = await Transaction.findById(req.params.id)

//         //else
//         await Transaction.delete()

//         return res.status(200).json({ msg: "Successfully deleted property" })
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// })

app.get("/api/transactions", async(req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(PORT);
