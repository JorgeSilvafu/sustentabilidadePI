const Content = require('../../models/content');

var content = new Content({
    informacao: 'Informação de teste'
});

content.save();