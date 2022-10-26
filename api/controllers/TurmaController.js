import db from '../models/index'

class TurmaController {
    static async pegarTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await db.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaTurma(req, res) {
        const { id } = res.params
        try {
            const umaTurma = await db.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            await db.Turmas.create(novaTurma)

            return res.status(200).json('Turma criada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarTurma(req, res) {
        const { id } = res.params
        const novaInfos = req.body
        try {
            await db.Turmas.update(novaInfos, {
                where: {
                    id: Number(id)
                }
            })

            const turmaAtualizada = await db.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarTurma(req, res) {
        const { id } = res.params
        try {
            await db.Turmas.destroy({ where: { id: Number(id) } })

            return res.status(200).json('Turma deletada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default TurmaController