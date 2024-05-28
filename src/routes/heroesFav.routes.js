import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

router.get('/add', (req, res) => {
    res.render('heroesFav/add')
});

router.post('/add', upload.single('file') , async (req, res) => {
    try {
        const  { name, powes, weakness, age,} = req.body
        let newheroeFav = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newheroeFav = { name, powes, weakness, age, imagen}
        }else{
            newheroeFav = { name, powes, weakness, age}
        }
        await pool.query('INSERT INTO heroesFav SET ?', [newheroeFav]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM heroesFav');
        res.render('heroesFav/list', { heroesFav: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM heroesFav WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [heroeFav] = await pool.query('SELECT * FROM heroeFav WHERE id = ?', [id]);
        const heroeFavEdit =heroeFav[0]
        res.render('heroeFav/edit', { heroeFav: heroeFavEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, powes, weakness, age,} = req.body
        let heroeFavEdit = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            heroeFavEdit ={ name, powes, weakness, age, imagen}
        }else{
            heroeFavEdit = { name, powes, weakness, age}
        }
        await pool.query('UPDATE heroesFav SET ? WHERE id = ?', [heroeFavEdit, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;