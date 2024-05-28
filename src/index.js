/* -------------------------- importar dependencias ------------------------- */
import express from 'express';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import heroesFavRoutes from './routes/personas.routes.js'; // Asegúrate de que esta ruta sea correcta

/* ----------------------------- inicialización ----------------------------- */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/* --------------------------------- configuración -------------------------------- */
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));

app.engine('.hbs', engine({
defaultLayout: 'main',
layoutsDir: join(app.get('views'), 'layouts'),
partialsDir: join(app.get('views'), 'partials'),
extname: '.hbs',
}));
app.set('view engine', '.hbs');

/* ------------------------------- middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* --------------------------------- rutas --------------------------------- */
app.get('/', (req, res) => {
res.render('index');
});
app.use(heroesFavRoutes); // Asegúrate de que heroesFavRoutes esté correctamente configurado en './routes/personas.routes.js'

/* ------------------------------ archivos públicos ------------------------------ */
app.use(express.static(join(__dirname, 'public')));

/* ------------------------------- ejecutar servidor ------------------------------- */
app.listen(app.get('port'), () => {
console.log('Server listening on port', app.get('port'));
});
