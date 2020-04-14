const {Router} = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', (_, res) => {
    res.status('200');
    res.render('add', {
        title: 'Add course',
        isAdd: true
    })
});

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch(err) {
        console.log(err);
    }

})

module.exports = router;