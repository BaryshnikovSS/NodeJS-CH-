const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routs/home');
const coursesRoutes = require('./routs/courses');
const addRoutes = require('./routs/add');
const cartRoutes = require('./routs/cart');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server is runing on port ${PORT}`));