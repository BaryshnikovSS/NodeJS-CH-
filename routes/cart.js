const {Router} = require('express');
const router = Router();
const Course = require('../models/course');
const Cart = require('../models/cart');

router.get('/', async (_, res) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses: cart.courses,
        price: cart.price
    });
});

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id).lean();
    await Cart.add(course);
    res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id);
    res.status(200).json(cart);
});



module.exports = router;