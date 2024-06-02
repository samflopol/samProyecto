/* -------------------------- importar dependencias ------------------------- */
import express from 'express'
import morgan from 'morgan';

import{join,dirname} from 'path'
import{fileURLToPath} from 'url'
import{engine}from 'express-handlebars'
import heroesFavRoutes from './routes/heroesFav.routes.js'
import exp from 'constants';



/* ----------------------------- initializacion ----------------------------- */
const app = express();
/* ---------------------------- ecitar coliciones --------------------------- */
const __dirname=dirname(fileURLToPath(import.meta.url)) ;

/* --------------------------------- setting -------------------------------- */
app.set('port',process.env.PORT || 3000)

app.set('views',join (__dirname,'views'))

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'),'layouts'),
    partialsDir:join(app.get('views'),'partials'),
    extname:'.hbs',

}))
app.set('view engine', '.hbs');

/* ------------------- app.use(express.static('public')); ------------------- */

/* ------------------------------- middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* --------------------------------- routes --------------------------------- */

app.get('/',(req,res)=>{
res.render('index')
});


app.get('/list', (req, res) => {
    res.render('heroesFav/list');
});

app.get('/edit', (req, res) => {
    res.render('heroesFav/edit');
});

app.get('/add', (req, res) => {
    res.render('heroesFav/add');
});

app.get('/somos', (req, res) => {
    res.render('heroesFav/somos');
});

app.get('/sub', (req, res) => {
    res.render('subcripcion/sub');
});

app.post('/add', (req, res) => {
    res.render('heroesFav/list');
});



app.use('/heroesFav', heroesFavRoutes);


/* ------------------------------ public files ------------------------------ */
app.use(express.static(join(__dirname,'public')));

/* ------------------------------- run server ------------------------------- */
app.listen(app.get('port'),()=>{
    console.log('server listening on port',app.get('port'))
});