const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./db/conn')
const Fabricante = require('./model/Fabricante')
const Produto = require('./model/Produto')

const PORT = 3000
const hostname = 'localhost'
/* ---------------------------------------------------------- */
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
/* ---------------------------------------------------------- */
// https://www.httpstatus.com.br/

app.post('/produto', async (req,res)=>{
    const data = req.body
    try{
        if(data.fabricanteId == 1){
            const pesq = await Produto.create(data, {raw:true})
            res.status(201).json(pesq)   
        }else{
            res.status(404).json({message: 'Fabricante Inexistente'})
        }
    }catch(err){
        res.status(500).json({message: 'Erro ao adicionar fabricante ao sistema'})
    }
})

app.delete('/fabricante/:param', async (req,res)=>{
    const data = req.params.param
    console.log(data)
    console.log('-----------')
    console.log(data.id)
    res.status(200).json({message: 'dados recebidos'})
})

app.get('/fabricante', async (req,res)=>{
    const data = req.query
    try{
        const pesq = await Fabricante.findOne({where: {marca : data.marca}})
        if(pesq === null){
            res.status(404).json({message: 'Fabricante inexistente no banco de dados'})
        }else if(pesq.marca == data.marca){
            res.status(200).json(pesq.marca)
        }
    }catch(err){
        res.status(500).json({message: 'Erro ao consultar fabricantes do sistema'}) 
    }
})

app.post('/fabricante', async (req,res)=>{
    const data = req.body
    try{
        const pesq = await Fabricante.create(data, {raw:true})
        res.status(201).json(pesq)
    }catch(err){
        res.status(500).json({message: 'Erro ao adicionar fabricante ao sistema'})
    }
})

app.get('/', (req,res)=>{
    res.end('Servidor Ativo')
})
/* ---------------------------------------------------------- */
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`O Servidor está rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.error('Banco de Dados não Conectado',err)
})