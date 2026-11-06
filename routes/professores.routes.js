const express = require("express")
const router = express.Router()
const pool = require("../pool") // importando a variavel pool do arquivo


router.get('/', async (req, res) =>{
    const[professores] = await pool.execute('SELECT * FROM professor')
    return res.json(professores)
})

router.post('/', async (req, res) =>{
    const{nome, especialidade} = req.body
    if(!nome || ! especialidade){
        return res.status(400).json({error: 'Nome e especialidade são obrigatórios'})
    }

    if(nome.length < 3){
        return res.status(400).json({error: 'Nome precisa ter mais que 3 caracteres'})
    }

    const [result] = await pool.execute(
        'INSERT INTO professor (nome, especialidade) VALUES(?, ?)' ,
        [nome, especialidade]
    )

    return res.status(201).json({id: result.insertId, nome, especialidade})
})

module.exports = router