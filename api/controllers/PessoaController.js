import db from '../models/index'
import sequelize from 'sequelize'
import Service from '../services/Services'

const pessoasServices = new Service('Pessoas')

class PessoaController {
    static async pegarTodasAsPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodasAsPegsoas(req, res) {
        try {
            const todasAsPessoas = await db.Pessoas.scope('todos').findAll()
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
        const { id } = req.params
        try {
            await db.Pessoas.destroy({ where: { id: Number(id) } })

            return res.status(200).json('Pessoa deletada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params

        try {
            await db.Pessoas.restore({ where: { id: Number(id) } })

            return res.status(200).json({ message: `id ${id} restaurado` })
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

    static async pegaMatriculas(req, res) {
        const { estudanteId } = res.params
        try {
            const pessoa = await db.Pessoas.findOne({
                where: { id: Number(estudanteId)}
            })

            const matriculas = await pessoa.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = res.params
        try {
            const todasAsMatriculas = await db.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })

            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const locacaoTurma = 2
        try {
            const turmasLotadas = await db.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                atributes: ['turma_id'],
                group: ['turma_id'],
                having: sequelize.literal(`count(turma_id) >= ${locacaoTurma}`)
            })

            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            db.sequelize.transaction(async transacao => {
                await db.Pessoas.update(
                    { ativo: false},
                    { where: { id: Number(estudanteId)} },
                    { transaction: transacao }
                )

                await db.Matriculas.update(
                    { status: 'cancelado'},
                    { where: { estudante_id: Number(estudanteId)} },
                    { transaction: transacao }
                )
            })
            return res.status(200).json({ mesage: 'Matricula cancelada com sucesso' })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default PessoaController