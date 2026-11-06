const express = require('express')
const app = express()
const rotasProfessores = require('./routes/professores.routes')
const rotasCursos = require('./routes/cursos.routes')
app.use(express.json())

// ====== Rotas do professor =============

app.use('/professores', rotasProfessores)

// ====== Rotas do curso =============

app.use('/cursos', rotasCursos)


app.listen(3000, () => console.log('API rodandoo :D'))