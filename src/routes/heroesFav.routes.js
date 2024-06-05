import { Router } from 'express';
import pool from '../database.js';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

router.post('/add', upload.single('file'), async (req, res) => {
    try {

        const { name, powers, weakness, age } = req.body;
        let newHeroeFav = {};
        if (req.file) {
            const file = req.file;
            const imagen_original = file.originalname;
            const imagen = file.filename;
            newHeroeFav = { name, powers, weakness, age, imagen };
        } else {
            newHeroeFav = { name, powers, weakness, age };
        }
        await pool.query('INSERT INTO heroesFav SET ?', [newHeroeFav]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM heroesfav');
        console.log(result)
        res.render('heroesFav/list', { heroesfav: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM heroesFav WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [heroeFav] = await pool.query('SELECT * FROM heroesFav WHERE id = ?', [id]);
        const heroeFavEdit = heroeFav[0];
        res.render('heroesFav/edit', { heroeFav: heroeFavEdit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id', upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, powers, weakness, age } = req.body;
        let heroeFavEdit = {};
        if (req.file) {
            const file = req.file;
            const imagen_original = file.originalname;
            const imagen = file.filename;
            heroeFavEdit = { name, powers, weakness, age, imagen };
        } else {
            heroeFavEdit = { name, powers, weakness, age };
        }
        await pool.query('UPDATE heroesFav SET ? WHERE id = ?', [heroeFavEdit, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
