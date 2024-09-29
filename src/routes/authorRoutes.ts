import { Router } from 'express';
import { addAuthorC, getAllAuthorsC, deleteAuthorC, updateAuthorC, getOneAuthorC } from '../controllers/authorController';

const router = Router();

router.post('/add', addAuthorC);
router.get('/', getAllAuthorsC);
router.delete('/delete/:id', deleteAuthorC);
router.put('/update/:id', updateAuthorC);
router.get('/:id', getOneAuthorC);


export default router;