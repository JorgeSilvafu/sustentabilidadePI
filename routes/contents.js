const express = require('express');
const router = express.Router();
const Content = require('../models/content');

// @route GET /contents/getContent/:id
// @desc Get Content
// @access Private
router.get('/getContent/:id', getContent, (req, res) => {
    res.send(res.content);
});

// @route POST /contents/createContent
// @desc Create Content
// @access Private
router.post('/createContent', async (req, res) => {
    const content = new User({
        informacao: req.body.informacao
    })
    try {
        const newContent = await content.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route POST /contents/updateContent/:id
// @desc Update Content
// @access Private
router.patch('/updateContent/:id', getContent, async (req, res) => {
    if (res.body.informacao != null) {
        res.content.informacao = req.body.informacao;
    }
    try {
        const updatedContent = await res.content.save();
        res.json(updatedContent);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// @route GET /contents/deleteContent/:id
// @desc Delete Content
// @access Private
router.delete('/deleteContent/:id', getContent, async (req, res) => {
    try {
        await res.content.remove();
        res.json({ message: 'Conteudo eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

async function getContent(req, res, next) {
    let content;
    try {
        content = await Content.findById(req.params.id);
        if (content == null) {
            return res.status(404).json({ message: 'Conteudo inexistente' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.content = content;
    next();
}

module.exports = router;