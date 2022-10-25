import { Router } from "express";
import PessoaController from '../controllers/PessoaController'

const router = Router()

router.get('/pessoas', PessoaController.pegarTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegarUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.deletarPessoa)

export default router