import sequelize from 'sequelize'
import db from '../models/index'

const Op = sequelize.Op
class TurmaController {
    static async pegarTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query
        const where = {}

        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        try {
            const todasAsTurmas = await db.Turmas.findAll({ where })
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
    static async restauraTurma(req, res) {
        const { id } = req.params

        try {
            await db.Turmas.restore({ where: { id: Number(id) } })

            return res.status(200).json({ message: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default TurmaController