import readline from "readline"
import {libraryTree} from "./libraryTree.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const library = new libraryTree();

function mainMenu() {
    console.log("\nMenu:");
    console.log("1. Adicionar Livro");
    console.log("2. Listar Livros");
    console.log("3. Buscar Livro");
    console.log("4. Remover Livro");
    console.log("5. Sair");

    rl.question("Escolha uma opção: ", (choice) => {
        switch (choice) {
            case '1':
                addBook(); // Chama a função para adicionar livro
                break;
            case '2':
                console.log("\nLista de Livros:");
                library.inOrder(library.tree[0]) // Lista todos os livros
                mainMenu(); // Retorna ao menu principal
                break;
            case '3':
                rl.question("\nQual o nome do livro?: ", (bookTitle) => {
                    const result = library.searchBook(0, bookTitle)
                    result.length > 0 ? console.log(`\nResultados para | ${bookTitle} |\n` + result):console.log("\nnenhum livro encontrado")
                    mainMenu();
                }) // Chama a função para buscar livro
                break;
            // case '4':
            //     removeBook(); // Chama a função para remover livro
            //     break;
            // case '5':
            //     rl.close(); // Fecha a interface
            //     break;
            default:
                console.log("Opção inválida. Tente novamente."); // Mensagem de erro
                mainMenu(); // Retorna ao menu principal
                break;
        }
    });
}

function addBook() {
    rl.question("Título: ", (title) => {
        rl.question("Autor: ", (author) => {
            rl.question("Ano: ", (year) => {
                // Valida se o ano é um número de 4 dígitos
                if (isNaN(year) || year.length !== 4) {
                    console.log("Ano inválido. Deve ser um número de 4 dígitos.");
                    addBook(); // Chama novamente para tentar adicionar
                } else {
                    library.insert({author: author, title: title, year: Number(year)})// Adiciona o livro à lista
                    console.log("Livro adicionado!");
                    mainMenu(); // Retorna ao menu principal
                }
            });
        });
    });
}

function listBooks() {
    if (!this.head) {
        console.log("Nenhum livro encontrado."); // Mensagem se a lista estiver vazia
        return;
    }
    let current = this.head;
    // Percorre a lista e imprime os detalhes de cada livro
    while (current) {
        console.log(`Título: ${current.title}, Autor: ${current.author}, Ano: ${current.year}`);
        current = current.next;
    }
}

mainMenu()