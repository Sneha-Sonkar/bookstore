import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    publishYear:{
        type: String,
        required: true,
    },
    note:{
        type:String
    },
    rating:{
        type:Number,
        default: 0
    },
    ratingsCount:{
        type:String,
        default: 0
    }

},
{
    timestamps: true,
});
export const Book = mongoose.model('Cat', bookSchema);
