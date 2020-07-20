"use strict";
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const options = require("../config/options.json");

function getMongoDbClient() {
    return new MongoClient(options.mongoDB.connectionString, { useUnifiedTopology: true });
}

/**
 * Função para retornar a lista de utilizadores da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getUsers(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("users");

            collection.find({}, { _id: 1, username: 1, password: 1, email: 1, role: 1 }).toArray(function (err, documents) {
                if (err) {
                    res.json({ "message": "error", "error": err });
                } else {
                    res.json({ "message": "success", "users": documents });
                }
                client.close();
            });
        }
    });
}

/**
 * Função para adicionar ou atualizar (upsert) um utilizador na BD.
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateUser(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("users");

            collection.update(
                {
                    _id: new ObjectID(req.method === 'PUT' ? req.body.id : null)
                },
                {
                    _id: req.body.id,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    role: req.body.role
                },
                {
                    multi: false,
                    upsert: true
                },
                function (err, response) {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        res.send(response.result);
                    }
                    client.close();
                }
            );
        }
    });
}

/**
 * Função para remover um utilizador da BD.
 * @param {*} req 
 * @param {*} res 
 */
function removeUser(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("users");

            collection.remove({ _id: new ObjectID(req.params._id) }, { justOne: true }, function (err) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
                client.close();
            });
        }
    });
}

/**
 * Função para retornar a lista de comentários da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getComments(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("comments");

            collection.find({}, { _id: 1, titulo: 1, username: 1, comentario: 1, data: 1 }).toArray(function (err, documents) {
                if (err) {
                    res.json({ "message": "error", "error": err });
                } else {
                    res.send({ "message": "success", "comments": documents });
                }
                client.close();
            });
        }
    });

}

/**
 * Função para adicionar ou atualizar (upsert) um comentário na BD.
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateComment(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("comments");

            collection.update(
                {
                    _id: new ObjectID(req.method === 'PUT' ? req.body.id : null)
                },
                {
                    _id: req.body.id,
                    titulo: req.body.titulo,
                    username: req.body.username,
                    comentario: req.body.comentario,
                    data: new Date(req.body.data)
                },
                {
                    multi: false,
                    upsert: true
                },
                function (err, response) {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        res.send(response.result);
                    }
                    client.close();
                }
            );
        }
    });
}

/**
 * Função para remover um comentário da BD.
 * @param {*} req 
 * @param {*} res 
 */
function removeComment(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("comments");

            collection.remove({ _id: new ObjectID(req.params._id) }, { justOne: true }, function (err) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
                client.close();
            });
        }
    });
}

/**
 * Função para retornar a lista de conteudos da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getContents(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("contents");

            collection.find({}, { _id: 1, informacao: 1}).toArray(function (err, documents) {
                if (err) {
                    res.json({ "message": "error", "error": err });
                } else {
                    res.send({ "message": "success", "contents": documents });
                }
                client.close();
            });
        }
    });

}

/**
 * Função para adicionar ou atualizar (upsert) um conteudo na BD.
 * @param {*} req 
 * @param {*} res 
 */
function createUpdateContent(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("contents");

            collection.update(
                {
                    _id: new ObjectID(req.method === 'PUT' ? req.body.id : null)
                },
                {
                    _id: req.body._id,
                    informacao: req.body.informacao,
                },
                {
                    multi: false,
                    upsert: true
                },
                function (err, response) {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        res.send(response.result);
                    }
                    client.close();
                }
            );
        }
    });
}

/**
 * Função para remover um conteudo da BD.
 * @param {*} req 
 * @param {*} res 
 */
function removeContent(req, res) {
    let client = getMongoDbClient();

    client.connect(function (err) {
        if (err) {
            res.json({ "message": "error", "error": err });
        } else {
            let collection = client.db('sustentabilidade').collection("contents");

            collection.remove({ _id: new ObjectID(req.params._id) }, { justOne: true }, function (err) {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
                client.close();
            });
        }
    });
}

module.exports.getUsers = getUsers;
module.exports.createUpdateUser = createUpdateUser;
module.exports.removeUser = removeUser;
module.exports.getComments = getComments;
module.exports.createUpdateComment = createUpdateComment;
module.exports.removeComment = removeComment;
module.exports.getContents = getContents;
module.exports.createUpdateContent = createUpdateContent;
module.exports.removeContent = removeContent;