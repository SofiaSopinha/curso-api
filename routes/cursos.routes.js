const express = require('express')
const router = express.Router()
const pool = require('../pool')
const { route } = require('./professores.routes')


router.get('/', async (req, res) =>{
    const [cursos] = await pool.execute('SELECT * FROM curso')
    return res.json(cursos)
})

router.post('/', async (req, res) =>{
    const{nome, descricao, professor_id} = req.body

    if(! nome || ! descricao || !professor_id){
        return res.status(400).json({error: 'Nome, descrição e o ID do professor são obrigatórios'})
    }

    const [result] = await pool.execute(
        'INSERT INTO curso (nome, descricao, professor_id) VALUES(?, ?, ?)',
        [nome, descricao, professor_id]
    )

    return res.status(201).json({id:result.insertId, nome, descricao, professor_id})
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id // pega o id da url

    const [result] = await pool.execute(
        'DELETE FROM curso WHERE id = ?',
        [id]
    )

    if(result.affectedRows === 0){
        return res.status(404).json({error: 'Curso não encontrado'})
    }

    return res.status(204).end()
})

module.exports = route