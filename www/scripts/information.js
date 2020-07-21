'use strict';

/**
 * @class Guarda toda informação necessaria na execução do exercicio 
 * @constructs Informacao
 * @param {string} id id do elemento HTML que contém a informação.
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


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso users através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getUsers = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/user');
    const self = this;
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
 * Função que apaga o recurso user com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeUser = function (id) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('DELETE', '/user/' + id);
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            self.users.splice(self.users.findIndex(i => i.id === id), 1);
            self.showUsers();
        }
    };
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso user com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} acao - controla qual a operação do CRUD que queremos fazer
  */
Information.prototype.processingUser = function (acao) {
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const user = new User(id, username, password, email, role);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    if (acao === 'create') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newUser = new User(xhr.response._id, username, password, email, role);
                self.users.push(newUser);
                self.showUsers();
            }
        }
        xhr.open('POST', '/user');
    } else if (acao === 'update') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.users[self.users.findIndex(i => i.id === id)] = user;
                self.showUsers();
            }
        }
        xhr.open('PUT', '/user/' + id);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
}

/**
 * Cria dinamicamente uma tabela com a informação dos utilizadores
 */
Information.prototype.showUsers = function () {
    const self = this;
    document.getElementById('createUser').style.display = 'none';
    const table = document.createElement('table');
    table.appendChild(tableLine(new User(), true));
    this.users.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement('divTable');
    divTable.setAttribute('id', 'divTable');
    divTable.appendChild(table);

    function createUserEventHandler() {
        document.getElementById('formUser').action = 'javascript:info.processingUser("create");';
        changePage('createUser');
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
            const user = self.users.find(i => i.id === idUser);
            document.getElementById('username').value = person.username;
            document.getElementById('password').value = person.password;
            document.getElementById('email').value = person.email;
            document.getElementById('role').value = person.role;
        }
    }

    function deleteUserEventHandler() {
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            const idUser = row.cells[1].firstChild.nodeValue;
            if (checkBox && checkBox.checked) {
                self.removeUser(idUser);
            }
        }
    }
    createButton(divTable, createUserEventHandler, 'Criar novo Utilizador');
    createButton(divTable, updateUserEventHandler, 'Editar Utilizador');
    createButton(divTable, deleteUserEventHandler, 'Eliminar Utilizador');
    replaceChilds('table', divTable);
    changePage('main');
};


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso users através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getComments = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/comment');
    const self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.comment.forEach(p => {
                self.comments.push(new User(p._id, p.titulo, p.username, p.comentario, p.data));
            });
        }
    };
    xhr.send();
};

/**
 * Função que apaga o recurso user com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeComment = function (id) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('DELETE', '/user/' + id);
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            self.users.splice(self.users.findIndex(i => i.id === id), 1);
            self.showUsers();
        }
    };
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso user com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} acao - controla qual a operação do CRUD que queremos fazer
  */
Information.prototype.processingComment = function (acao) {
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const user = new User(id, username, password, email, role);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    if (acao === 'create') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newUser = new User(xhr.response._id, username, password, email, role);
                self.users.push(newUser);
                self.showUsers();
            }
        }
        xhr.open('POST', '/user');
    } else if (acao === 'update') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.users[self.users.findIndex(i => i.id === id)] = user;
                self.showUsers();
            }
        }
        xhr.open('PUT', '/user/' + id);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
}

/**
 * Cria dinamicamente uma tabela com a informação dos utilizadores
 */
Information.prototype.showComments = function () {
    const self = this;
    document.getElementById('createUser').style.display = 'none';
    const table = document.createElement('table');
    table.appendChild(tableLine(new User(), true));
    this.users.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement('divTable');
    divTable.setAttribute('id', 'divTable');
    divTable.appendChild(table);

    function createUserEventHandler() {
        document.getElementById('formUser').action = 'javascript:info.processingUser("create");';
        changePage('createUser');
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
            const user = self.users.find(i => i.id === idUser);
            document.getElementById('username').value = person.username;
            document.getElementById('password').value = person.password;
            document.getElementById('email').value = person.email;
            document.getElementById('role').value = person.role;
        }
    }

    function deleteUserEventHandler() {
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            const idUser = row.cells[1].firstChild.nodeValue;
            if (checkBox && checkBox.checked) {
                self.removeUser(idUser);
            }
        }
    }
    createButton(divTable, createUserEventHandler, 'Criar novo Utilizador');
    createButton(divTable, updateUserEventHandler, 'Editar Utilizador');
    createButton(divTable, deleteUserEventHandler, 'Eliminar Utilizador');
    replaceChilds('table', divTable);
    changePage('main');
};

Information.prototype.showHomepage = function () {
    changePage('homepage');
}

Information.prototype.showDefinicao = function () {
    changePage('definicao');
}

Information.prototype.showPilares = function () {
    changePage('pilares');
}

Information.prototype.showNacoesUnidas = function () {
    changePage('nacoesUnidas');
}

Information.prototype.showPais = function () {
    changePage('pais');
}

Information.prototype.showCampus = function () {
    changePage('campus');
}

Information.prototype.showTecnologia = function () {
    changePage('tecnologia');
}

Information.prototype.showProjetos = function () {
    changePage('projetos');
}

Information.prototype.showIdeias = function () {
    changePage('ideias');
}

Information.prototype.showLogin = function () {
    changePage('login');
}