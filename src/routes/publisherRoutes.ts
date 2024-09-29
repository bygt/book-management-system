import Router from 'express';
import { addPublisherC, deletePublisherC, getAllPublisherC, getOnePublisherC, updatePublisherC } from '../controllers/publisherController';

const router = Router();

// add publishers
router.post('/add', addPublisherC);
router.get('/:id', getOnePublisherC);
router.get('/', getAllPublisherC);
router.delete('/delete/:id', deletePublisherC);
router.put('/update/:id', updatePublisherC);

export default router;