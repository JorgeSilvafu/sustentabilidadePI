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
            let collection = client.db('sustentabilidade').collection("user");

            collection.find({}, { _id: 1, username: 1, password: 1, email: 1, role: 1 }).toArray(function (err, documents) {
                if (err) {
                    res.json({ "message": "error", "error": err });
                } else {
                    res.json({ "message": "success", "user": documents });
                }
                client.close();
            });
        }
    });
}
module.exports.getUsers = getUsers;

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
            let collection = client.db('sustentabilidade').collection("user");

            if (req.method === "POST") {
                collection.insertOne({
                    _id: new ObjectID(),
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    role: req.body.role
                },
                    function (err, response) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send(response.result);
                        }
                        client.close();
                    });
            } else {
                collection.update(
                    {
                        _id: new ObjectID(req.params.id)
                    },
                    {
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        role: req.body.role
                    },
                    {
                        multi: false,
                        upsert: false
                    },
                    function (err, response) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send(response.result);
                        }
                        client.close();
                    });
            }
        }
    });
}
module.exports.createUpdateUser = createUpdateUser;

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
            let collection = client.db('sustentabilidade').collection("user");

            collection.deleteOne({ _id: new ObjectID(req.params.id) }, { justOne: true }, function (err) {
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
module.exports.removeUser = removeUser;

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
module.exports.getComments = getComments;

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

            if (req.method === "POST") {
                collection.insertOne({
                    _id: new ObjectID(),
                    titulo: req.body.titulo,
                    username: req.body.username,
                    comentario: req.body.comentario,
                    data: req.body.data
                },
                    function (err, response) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send(response.result);
                        }
                        client.close();
                    });
            } else {
                collection.update(
                    {
                        _id: new ObjectID(req.params.id)
                    },
                    {
                        titulo: req.body.titulo,
                        username: req.body.username,
                        comentario: req.body.comentario,
                        data: req.body.data
                    },
                    {
                        multi: false,
                        upsert: false
                    },
                    function (err, response) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send(response.result);
                        }
                        client.close();
                    });
            }
        }
    });
}
module.exports.createUpdateComment = createUpdateComment;

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

            collection.deleteOne({ _id: new ObjectID(req.params.id) }, { justOne: true }, function (err) {
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
module.exports.removeComment = removeComment;

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

            collection.find({}, { _id: 1, informacao: 1 }).toArray(function (err, documents) {
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
module.exports.getContents = getContents;

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

            if (req.method === "POST") {
                collection.insertOne({
                    _id: new ObjectID(),
                    informacao: req.body.informacao,
                },
                    function (err, response) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send(response.result);
                        }
                        client.close();
                    });
            } else {
                collection.update(
                    {
                        _id: new ObjectID(req.params.id)
                    },
                    {
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
                    });
            }
        }
    });
}
module.exports.createUpdateContent = createUpdateContent;

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

            collection.deleteOne({ _id: new ObjectID(req.params.id) }, { justOne: true }, function (err) {
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
module.exports.removeContent = removeContent;