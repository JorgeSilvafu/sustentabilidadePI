const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');



// @route GET /comments/getComments
// @desc Get All Comments
// @access Private
router.get('/getComments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// @route GET /comments/getComment/:id
// @desc Get Comment
// @access Private
router.get('/getComment/:id', getComment, (req, res) => {
    res.send(res.comment);
});

// @route POST /comments/createComment
// @desc Create Comment
// @access Private
router.post('/createComment', async (req, res) => {
    const comment = new User({
        titulo: req.body.titulo,
        username: req.body.username,
        comentario: req.body.comentario,
        data: req.body.data
    })
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route POST /comments/updateComment/:id
// @desc Update Comment
// @access Private
router.patch('/updateComment/:id', getComment, async (req, res) => {
    if (res.body.titulo != null) {
        res.comment.titulo = req.body.titulo;
    }
    if (res.body.comentario != null) {
        res.comment.comentario = req.body.comentario;
    }
    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// @route GET /comments/deleteComment/:id
// @desc Delete Comment
// @access Private
router.delete('/deleteComment/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comentario eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

async function getComment(req, res, next) {
    let comment;
    try {
        comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Comentario inexistente' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.comment = comment;
    next();
}

module.exports = router;