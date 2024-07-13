import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from  './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
// opt 1: Allow all origins with default of cors(*)
app.use(cors());
//opt 2: allow custom origins, gives more control
// app.use(
//     cors({
//         origin: 'https://localhost:5555/books',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders : ['Content-Type'],
//     })
// );


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send(`Welcome to the turorial`)
});
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log(`App connected to database`);
    
app.listen(PORT, () => {
    console.log(`App is listening to : ${PORT}`);
});
    })
    .catch((error) => {
        console.log(error);
    });

    