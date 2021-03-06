const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (_, res) => {
    const courses = await Course.find().lean();
    res.status('200');
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    })
});

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) return res.redirect('/');
    const course = await Course.findById(req.params.id).lean();
    res.render('courseEdit', {
        title: `Edit ${course.title}`,
        course
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).lean();
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
})

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body).lean();
    res.redirect('/courses');
})

router.post('/remove', async (req, res) => {
    try{
        await Course.deleteOne({_id: req.body.id});
        res.redirect('/courses')
    } catch(err) {
        console.log(err)
    }
    
})

module.exports = router;