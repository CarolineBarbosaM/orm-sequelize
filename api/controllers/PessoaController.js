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

    static async pegarUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = res.params
        try {
            const umaMatricula = await db.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res.status(200).json(umaMatricula)
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

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            await db.Matriculas.create(novaMatricula)

            return res.status(200).json('Matricula criada com sucesso!')
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

    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = res.params
        const novaInfos = req.body
        try {
            await db.Matriculas.update(novaInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            const matriculaAtualizada =  await db.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudanteId: Number(estudanteId)
                }
            })


            return res.status(200).json(matriculaAtualizada)
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

    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = res.params
        try {
            await db.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res.status(200).json('Matricula deletada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default PessoaController