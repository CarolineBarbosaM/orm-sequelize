import { Router } from "express";
import TurmaController from '../controllers/TurmaController'

const router = Router()

router.get('/turmas', TurmaController.pegarTodasAsTurmas)
router.get('/turmas/:id', TurmaController.pegarUmaTurma)
router.post('/turmas', TurmaController.criaTurma)
router.put('/turmas/:id', TurmaController.atualizarTurma)
router.delete('/turmas/:id', TurmaController.deletarTurma)

export default router