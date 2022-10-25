import bodyParser from "body-parser";
import pessoas from './pessoasRoute'

app.use(bodyParser.json())
app.use(pessoas)

export default app