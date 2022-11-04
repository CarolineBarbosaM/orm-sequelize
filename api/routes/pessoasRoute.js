import { Router } from "express";
import PessoaController from '../controllers/PessoaController'

const router = Router()

router.get('/pessoas', PessoaController.pegarTodasAsPessoasAtivas)
router.get('/pessoas/todos', PessoaController.pegarTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegarUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.post('/pessoas/:id/ restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.deletarPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegarUmaMatricula)
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula)

export default router