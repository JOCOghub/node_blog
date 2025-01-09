const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_update_get = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(blog => {
            if (!blog) {
                return res.status(404).render('404', { title: 'Blog Not Found' });
            }
            res.render('update', { title: 'Update Blog', blog }); // Pass blog data to the view
        })
        .catch(err => {
            console.log(err);
            res.status(500).render('500', { title: 'Server Error' });
        });
};

const blog_update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    Blog.findByIdAndUpdate(id, updatedData, { new: true })
        .then(result => {
            res.redirect('/blogs'); // Redirect to index page after successful update
        })
        .catch(err => {
            console.log(err);
            res.status(500).render('500', { title: 'Server Error' });
        });
};





module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update,
    blog_update_get
}