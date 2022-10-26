import bodyParser from "body-parser";
import pessoas from './pessoasRoute';
import niveis from './niveisRoute';
import turmas from './turmasRoute';

app.use(
    bodyParser.json(),
    pessoas,
    niveis,
    turmas,
)

export default app