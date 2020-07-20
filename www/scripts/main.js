'use strict';
/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global 'info' com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    const info = new Information('divInformation');
    info.getUsers();
    info.getComments();
    info.getContents();
    window.info = info;
};

/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    const no = document.getElementById(id);
    while (no.hasChildNodes()) {
        no.removeChild(no.lastChild);
    }
    no.appendChild(newSon);
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
 * @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
 */
function tableLine(object, headerFormat) {
    const tr = document.createElement('tr');
    if (!headerFormat) tr.appendChild(createCellCheckbox());
    else tr.appendChild(document.createElement('th'));
    let tableCell = null;
    for (let property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement('th');
            tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {
            tableCell = document.createElement('td');
            if (object[property] instanceof Date) {
                tableCell.textContent = object[property].toISOString().split('T')[0]
            } else {
                tableCell.textContent = object[property];
            }
        }
        tr.appendChild(tableCell);
    }
    return tr;
};

/**
 * Função genérica que tem como objetivo a criação de uma coluna com checkbox
 */
function createCellCheckbox() {
    const td = document.createElement('td');
    const check = document.createElement('input');
    check.type = 'checkbox';
    td.appendChild(check);
    return td;
}

/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {HTMLElement} fatherNode - nó pai do botão
 * @param {function} eventHandler - evento do botão.
 * @param {String} value - texto do botão.
 */
function createButton(fatherNode, eventHandler, value) {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.addEventListener('click', eventHandler);
    fatherNode.appendChild(button);
}

function changePage(newIdPage) {
    document.getElementById(currentPageId).style.display = 'none';
    currentPageId = newIdPage;
    document.getElementById(newIdPage).style.display = 'block';
}