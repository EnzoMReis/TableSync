const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('rel_1_n', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Conexão Realizada com Sucesso!')
}).catch((err)=>{
    console.error('Erro de Conexão com o Banco de Dados!!',err)
})

module.exports = sequelize