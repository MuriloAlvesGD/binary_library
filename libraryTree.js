import {Author} from "./author.js"

export class libraryTree {
    constructor() {
        this.tree = []
    }

    insert(book) {
        if (this.tree.length === 0) {
            const author = new Author(book.author, [[{title: book.title, year: book.year}, -1, -1]])
            this.tree[0] = [author, -1, -1]; //nó é a raiz
        } else {
            this._insert(0, book);
        }
    }

    _insert(index, book) {
        let AuthorNode = this.findAuthor(index, book);
        if (AuthorNode === false) {
            const author = new Author(book.author, [[{title: book.title, year: book.year}, -1, -1]])
            if (book.author.charCodeAt(0) < this.tree[index][0].author.charCodeAt(0)) {
                // Se o valor for menor, vai para a esquerda
                if (this.tree[index][1] === -1) {
                    // se o nó não possuir filho menor
                    this.tree[this.tree.length] = [author, -1, -1]; // insere novo filho no final da matriz
                    this.tree[index][1] = this.tree.length - 1; // atualiza o apontador
                } else {
                    // se o nó possuir filho menor
                    this._insert(this.tree[index][1], book);
                }
            } else {
                // Se o valor for maior ou igual, vai para a direita
                if (this.tree[index][2] === -1) {
                    // se o nó não possuir filho maior
                    this.tree[this.tree.length] = [author, -1, -1]; // insere novo filho no final da matriz
                    this.tree[index][2] = this.tree.length - 1; // atualiza o apontador
                } else {
                    // se o nó possuir filho maior
                    this._insert(this.tree[index][2], book);
                }
            }
        } else {
            let authorTemp = this.tree[AuthorNode][0];
            authorTemp.insert(book);
            this.tree[AuthorNode][0] = authorTemp;
        }
    }

    findAuthor(index, book) {
        if (index === -1) {
            return false;
        } else if (book.author === this.tree[index][0].author) {
            return index;
        } else {
            if (book.author.charCodeAt(0) < this.tree[index][0].author.charCodeAt(0)) {
                return this.findAuthor(this.tree[index][1], book);
            } else {
                return this.findAuthor(this.tree[index][2], book);
            }
        }
    }

    inOrder(node){
        if (node != null) {
            this.inOrder(this.tree[node[1]])
            console.log(`\nLivros de: ${node[0].author}`)
            node[0].inOrder(node[0].books[0])
            this.inOrder(this.tree[node[2]])
        }
    }

    searchBooks(index, bookTitle){
        let result = [];
        const node = this.tree[index]
        if (node != null){
            result.push(...this.searchBooks(node[1], bookTitle))
            const books = node[0].searchBooks(node[0].books[0], bookTitle)
            if (books.length > 0){
                result.push({author: node[0].author, books: books})
            }
            result.push(...this.searchBooks(node[2],bookTitle))
        }
        return result;
    }

    removeBook(author, book){
        if(this.tree[0] == null){
            return "Empty Tree"
        } else {
            return this._removeBook(0, author, book);
        }
    }

    _removeBook(index, author, book){
        if(author.charCodeAt(0) < this.tree[index][0].author.charCodeAt(0)){
            this._removeBook(this.tree[index][1], author, book)
        } else {
            if(author === this.tree[index][0].author){
                this.tree[index][0].removeBook(0, book)
            } else {
                this._removeBook(this.tree[index][2], author, book)
            }
        }
    }
}