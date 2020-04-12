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
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save(); 
    // console.log('course:', course)

    res.redirect('/courses');
})

module.exports = router;