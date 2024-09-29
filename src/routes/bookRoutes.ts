
import { Router } from 'express';
import { addBookC,updateBookC, deleteBookC, getOneBookC , getAllBooksC} from '../controllers/bookController';

const router = Router();

router.post('/add', addBookC);
router.put('/update/:id', updateBookC);
router.delete('/delete/:id', deleteBookC);
router.get('/', getAllBooksC);
router.get('/:id', getOneBookC);


export default router;