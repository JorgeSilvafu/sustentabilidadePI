"use strict";

/**
 * @class Estrutura com capacidade de armazenar o estado de um utilizador
 * @constructs User
 * @param {int} id 
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {String} role 
 */
function User(id, username, password, email, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
};