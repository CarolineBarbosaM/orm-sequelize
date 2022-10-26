import db from '../models/index'

class NivelController {
    static async pegarTodasAsNiveis(req, res) {
        try {
            const todasAsNiveis = await db.Niveis.findAll()
            return res.status(200).json(todasAsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaNivel(req, res) {
        const { id } = res.params
        try {
            const umaNivel = await db.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(umaNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel(req, res) {
        const novaNivel = req.body
        try {
            await db.Niveis.create(novaNivel)

            return res.status(200).json('Nivel criada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarNivel(req, res) {
        const { id } = res.params
        const novaInfos = req.body
        try {
            await db.Niveis.update(novaInfos, {
                where: {
                    id: Number(id)
                }
            })

            const nivelAtualizada = await db.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json(nivelAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarNivel(req, res) {
        const { id } = res.params
        try {
            await db.Niveis.destroy({ where: { id: Number(id) } })

            return res.status(200).json('Nivel deletada com sucesso!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

export default NivelController