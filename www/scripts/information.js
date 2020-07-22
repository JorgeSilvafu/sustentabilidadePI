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
 * @param {String} action - controla qual a operação do CRUD que queremos fazer
  */
Information.prototype.processingUser = function (action) {
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    let user = new User(id, username, password, email, role);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    if (action === 'create') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newUser = new User(xhr.response._id, username, password, email, role);
                self.users.push(newUser);
                self.showUsers();
            }
        }
        xhr.open('POST', '/user');
    } else if (action === 'update') {
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
        updatePage('createUser');
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
            updatePage('createUser');
            document.getElementById('formUser').action = 'javascript:info.processingUser("update");';
            const user = self.users.find(i => i.id === idUser);
            document.getElementById('id').value = idUser;
            document.getElementById('username').value = user.username;
            document.getElementById('password').value = user.password;
            document.getElementById('email').value = user.email;
            document.getElementById('role').value = user.role;
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
    updatePage('main');
};


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso comment através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getComments = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/comment');
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.comments.forEach(p => {
                self.comments.push(new Comment(p._id, p.titulo, p.username, p.comentario));
            });
        }
    };
    xhr.send();
};

/**
 * Função que apaga o recurso comment com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeComment = function (id) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('DELETE', '/comment/' + id);
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            self.comments.splice(self.comments.findIndex(i => i.id === id), 1);
            self.showComments();
        }
    };
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso comment com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} action - controla qual a operação do CRUD que queremos fazer
  */
Information.prototype.processingComment = function (action) {
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const username = document.getElementById('usernameC').value;
    const comentario = document.getElementById('comentario').value;
    const comment = new Comment(id, titulo, username, comentario);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    /**
     * Guardar referência para o 'this' para que possa ser utilizado nos event handlers e callbacks.
     * Assim evita-se o acesso através da referência global 'info' definida no 'main.js'.
     */
    const self = this;
    if (action === 'create') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newComment = new Comment(xhr.response._id, titulo, username, comentario);
                self.comments.push(newComment);
                self.showComments();
            }
        }
        xhr.open('POST', '/comment');
    } else if (action === 'update') {
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                self.comments[self.comments.findIndex(i => i.id === id)] = comment;
                self.showComments();
            }
        }
        xhr.open('PUT', '/comment/' + id);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(comment));
}

/**
 * Cria dinamicamente uma tabela com a informação dos utilizadores
 */
Information.prototype.showComments = function () {
    const self = this;
    const table = document.createElement('table');
    table.appendChild(tableLine(new Comment(), true));
    this.comments.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement('divTable');
    divTable.setAttribute('id', 'divTable');
    divTable.appendChild(table);

    function createCommentEventHandler() {
        document.getElementById('formComment').action = 'javascript:info.processingComment("create");';
        updatePage('createComment');
    }

    function updateCommentEventHandler() {
        let idComment = null;
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            if (checkBox && checkBox.checked) {
                idComment = row.cells[1].firstChild.nodeValue;
                break;
            }
        }
        if (idComment) {
            updatePage('createComment');
            document.getElementById('formComment').action = 'javascript:info.processingComment("update");';
            const comment = self.comments.find(i => i.id === idComment);
            document.getElementById('id').value = idComment;
            document.getElementById('titulo').value = comment.titulo;
            document.getElementById('usernameC').value = comment.username;
            document.getElementById('comentario').value = comment.comentario;
        }
    }

    function deleteCommentEventHandler() {
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            const idComment = row.cells[1].firstChild.nodeValue;
            if (checkBox && checkBox.checked) {
                self.removeComment(idComment);
            }
        }
    }
    createButton(divTable, createCommentEventHandler, 'Adicionar novo Comentário');
    createButton(divTable, updateCommentEventHandler, 'Editar Comentário');
    createButton(divTable, deleteCommentEventHandler, 'Eliminar Comentário');
    replaceChilds('table2', divTable);
    updatePage('main2');
};


Information.prototype.showHomepage = function () {
    updatePage('homepage');
}

Information.prototype.showDefinicao = function () {
    updatePage('definicao');
}

Information.prototype.showPilares = function () {
    updatePage('pilares');
}

Information.prototype.showNacoesUnidas = function () {
    updatePage('nacoesUnidas');
}

Information.prototype.showPais = function () {
    updatePage('pais');
}

Information.prototype.showCampus = function () {
    updatePage('campus');
}

Information.prototype.showTecnologia = function () {
    updatePage('tecnologia');
}

Information.prototype.showProjetos = function () {
    updatePage('projetos');
}

Information.prototype.showIdeias = function () {
    updatePage('ideias');
}

Information.prototype.showLogin = function () {
    updatePage('login');
}