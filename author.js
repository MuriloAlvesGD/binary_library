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
        let result = [];
        if (node != null){
            result.push(...this.searchBooks(this.books[node[1]], bookTitle))
            if (node[0].title.includes(bookTitle)) {
                result.push({title: node[0].title, year: node[0].year})
            }
            result.push(...this.searchBooks(this.books[node[2]], bookTitle))
        }
        return result;
    }

    removeBook(index, book){
        const node = this.books[index]
        if(book.year < node[0].year){ //valor menor
            this.removeBook(node[1], book) //lado esquerdo
        }
        else if (book.year > node[0].year){ //valor maior
            this.removeBook(node[2], book) //lado direito
        }
        else if (node[1] !== -1 && node[2] !== -1){ //valor igual (nó a ser excluido) mas com filho em ambos os lados
            console.log(`nó apagado ${node}`)
            this.books[index] = this.glue(node[1], this.books[node[2]]) //substitui o nó pelo ponteiro a direita
            this.books[node[2]] = null; //apaga o antigo ponteiro
        }
        else if (node[1] !== -1 || node[2] !== -1){ //nó com filho em apenas um lado
            if(node[1] === -1){ //filho a direita
                console.log(`nó apagado ${node}`)
                this.books[index] = this.books[node[2]]
                this.books[node[2]] = null;
            } else { //filho a esquerda
                console.log(`nó apagado ${node}`)
                this.books[index] = this.books[node[1]]
                this.books[node[1]] = null;
            }
        }
        else { //folha
            console.log(`nó apagado ${node}`)
            this.books[index] = null;
        }
    }

    glue(index, node){
        if (node[1] === -1){ //nó substituto não possui filhos menores
            node[1] = index //indica o filho menor do nó deletado como filho deste
        }
        else {
            this._glue(index, node[1]) //nó possui filho menor
        }
        return node
    }

    _glue(index, indexLeaf){
        //procura a folha entre os menores
        let leaf = this.books[indexLeaf]
        if (leaf[1] === -1){ //condição de parada
            leaf[1] = index
            this.books[indexLeaf] = leaf;
        }
        else{
            this._glue(leaf[1]);
        }
    }

}