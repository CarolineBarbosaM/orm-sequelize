import db from '../models/index'

class PessoaController {
    static async pegarTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await db.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaPessoa(req, res) {
        const { id } = res.params
        try {
            const umaPessoa = await db.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            await db.Pessoas.create(novaPessoa)

            return res.status(200).json('Pessoa criada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = res.params
        const novaInfos = req.body
        try {
            await db.Pessoas.update(novaInfos, {
                where: {
                    id: Number(id)
                }
            })

            const pessoaAtualizada = await db.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa(req, res) {
        const { id } = res.params
        try {
            await db.Pessoas.destroy({ where: { id: Number(id) } })

            return res.status(200).json('Pessoa deletada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default PessoaController