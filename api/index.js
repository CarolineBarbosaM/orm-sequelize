import express from 'express';
import routes from './routes'

const app = express();
const port = 3000;

routes(app)

app.listen(port, (req, res) => {
    console.log(`Servidor está rodando na porta ${port}`);
})

export default app;