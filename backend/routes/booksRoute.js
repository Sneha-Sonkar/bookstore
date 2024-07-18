import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

//Route for Save a new book
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            note: request.body.note,
            rating: request.body.rating,
        };
        const book = await Book.create(newBook);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});
//to show all the books
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
    });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//to find a book 
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//to update a book
router.put('/:id', async (request, response) => {
    try{
        
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        else{
            return response.status(200).json({message: 'Book updated successfully'});            
        }
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//deleting a book
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
    
    return response.status(200).send({message: 'Book deleted succesfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.post('/:id/rate', async (req, res) => {
    const bookId = req.params.id;
    const { rating } = req.body;

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5' });
    }

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).send('Book not found');

        const totalRating = book.rating * book.ratingsCount + rating;
        book.ratingsCount += 1;
        book.rating = totalRating / book.ratingsCount;

        await book.save();
        res.status(200).json({ message: 'Rating updated successfully', book });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



export default router;