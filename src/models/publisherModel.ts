import mongoose from 'mongoose';

export interface IPublisher {
    name: string;
    address : string;
    phone: string;
    email: string;
}

const publisherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address : { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

const Publisher = mongoose.model('Publisher', publisherSchema);

export default Publisher;
