import { Router } from "express";
import NivelController from '../controllers/NivelController'

const router = Router()

router.get('/niveis', NivelController.pegarTodasAsNiveis)
router.get('/niveis/:id', NivelController.pegarUmaNivel)
router.post('/niveis', NivelController.criaNivel)
router.post('/niveis/:id/ restaura', NivelController.restauraNivel)
router.put('/niveis/:id', NivelController.atualizarNivel)
router.delete('/niveis/:id', NivelController.deletarNivel)


export default router