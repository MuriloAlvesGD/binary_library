export class Author {
    constructor(authorName, books) {
        this.author = authorName;
        this.books = books;
    }

    insert(book){
        const node = [{title: book.title, year: book.year}, -1, -1]
        if(this.books.length === 0){
            this.books = [node]
        }
        else{
            this._insert(0, node);
        }
    }

    _insert(index, node){
        if (node[0].year < this.books[index][0].year) {
            // Se o valor for menor, vai para a esquerda
            if (this.books[index][1] === -1){
                // se o nó não possuir filho menor
                this.books[this.books.length] = node // insere novo filho no final da matriz
                this.books[index][1] = this.books.length -1; // atualiza o apontador
            }
            else {
                // se o nó possuir filho menor
                this._insert(this.books[index][1], node);
            }
        } else {
            // Se o valor for maior ou igual, vai para a direita
            if (this.books[index][2] === -1){
                // se o nó não possuir filho maior
                this.books[this.books.length] = node // insere novo filho no final da matriz
                this.books[index][2] = this.books.length -1; // atualiza o apontador
            }
            else {
                // se o nó possuir filho maior
                this._insert(this.books[index][2], node);
            }
        }
    }

    inOrder(node) {
        if (node != null) {
            this.inOrder(this.books[node[1]])
            console.log(`${node[0].year} | ${node[0].title}`)
            this.inOrder(this.books[node[2]])
        }
    }

    searchBooks(node, bookTitle){
        let result = "";
        if (node != null){
            result += this.searchBooks(this.books[node[1]], bookTitle)
            if (node[0].title.includes(bookTitle)) {
                result = result + `${node[0].year} | ${node[0].title}\n`
            }
            result += this.searchBooks(this.books[node[2]], bookTitle)
        }
        return result;
    }
}