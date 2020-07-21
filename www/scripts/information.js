'use strict';

/**
 * @class Guarda toda informação necessaria na execução do exercicio 
 * @constructs Informacao
 * @param {string} id 
 * 
 * @property {string} id - id do elemento HTML que contém a informação.
 * @property {user[]} users - Array de objetos do tipo user, para guardar todos os utilizadores do nosso sistema
 * @property {comment[]} comments - Array de objetos do tipo comment, para guardar todos os comentarios do nosso sistema
 * @property {content[]} contents - Array de objetos do tipo content, para guardar todos os conteudos do nosso sistema
 */
function Information(id) {
    this.id = id;
    this.users = [];
    this.comments = [];
    this.contents = [];
};
var status = false;

/**
 * 
 */
Information.prototype.getUsers = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/users');
    let self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.user.forEach(p => {
                self.users.push(new User(p._id, p.username, p.password, p.email, p.role));
            });
        }
    };
    xhr.send();
};

/**
 * Cria dinamicamente uma tabela com a informação dos utilizadores
 */
Information.prototype.showUsers = function () {
    const self = this;    
    const table = document.createElement('table');
    table.appendChild(tableLine(new User(), true));
    this.users.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement('divTable');
    divTable.setAttribute('id', 'divTable');
    divTable.appendChild(table);

    function deleteUserEventHandler() {
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            const idUser = row.cells[1].firstChild.nodeValue;
            if (checkBox && checkBox.checked) {
                self.removeUser(idUser);
            }
        }
    }

    function createUserEventHandler() {
        replaceChilds('divTable', document.createElement('div'));
        document.getElementById('formUser').style.display = 'block';
        document.getElementById('formUser').reset();
    }

    function updateUserEventHandler() {
        let idUser = null;
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            if (checkBox && checkBox.checked) {
                idUser = row.cells[1].firstChild.nodeValue;
                break;
            }
        }
        if (idUser) {
            replaceChilds('divTable', document.createElement('div'));
            document.getElementById('formUser').action = 'javascript:info.processingUser("update");';
            document.getElementById('formUser').style.display = 'block';
            document.getElementById('formUser').reset();
            document.getElementById('id').value = idUser;
            const User = self.users.find(i => i.id === idUser);
            document.getElementById('username').value = User.username;
            document.getElementById('password').value = User.password;
            document.getElementById('email').value = User.email;
            document.getElementById('role').value = User.role;
        }
    }
    createButton(divTable, createUserEventHandler, 'Create User');
    createButton(divTable, deleteUserEventHandler, 'Delete User');
    createButton(divTable, updateUserEventHandler, 'Update User');
    replaceChilds('main', divTable);
};

Information.prototype.showHomepage = function() {
    changePage('homepage');
}
Information.prototype.showDefinicao = function() {
    changePage('definicao');
}