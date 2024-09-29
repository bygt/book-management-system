import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export interface IBook extends Document {
    title: string;
    authorId: mongoose.Schema.Types.ObjectId;
    price: number;
    ISBN: string;
    language: string;
    pages: number;
    publisherId: mongoose.Schema.Types.ObjectId;
  }

  
const bookSchema = new Schema({
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },  // refence to author
    price: { type: Number, required: true },
    ISBN: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    publisherId: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true }, // reference to publisher
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
