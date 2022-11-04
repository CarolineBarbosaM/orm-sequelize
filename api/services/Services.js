import db from '../models/index'

class Service {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(){
        return db[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(id){
        return
    }

    async criaRegistro(dados) {
        return
    }

    async atualizaRegistro(id, dadosAtualizados) {
        return
    }

    async deletaRegistro(id, dadosAtualizados) {
        return
    }
}

export default Service