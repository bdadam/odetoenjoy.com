import { Router } from 'express';
import Image from '../models/image-model';

const router = Router();

router.get('/img/count', (req, res) => {
    Image.count().then(c => {
        res.send(c);
    });
});

router.get('/img/:id', (req, res) => {
    Image.findById(req.params.id).then(img => {
        res.type('jpg').send(img.image);
    });
});

export default router;
