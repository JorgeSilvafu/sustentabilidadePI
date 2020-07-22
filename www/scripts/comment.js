"use strict";

/**
 * @class Estrutura com capacidade de armazenar o estado de um comentario
 * @constructs Comment
 * @param {String} id 
 * @param {String} titulo 
 * @param {String} username 
 * @param {String} comentario 
 * @param {Date} data 
 */
function Comment(id, titulo, username, comentario) {
    this.id = id;
    this.titulo = titulo;
    this.username = username;
    this.comentario = comentario;
    this.data = new Date();
};