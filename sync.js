const conn = require('./db/conn')
const { Fabricante, Produto } = require('./model/associacao')

async function syncDatabase() {
    try {
        await conn.sync({force:true})
        console.log('Tabelas Criadas e Banco de Dados Sincronizado')
    }catch(err){
        console.error('Erro ao conectar com o Banco de Dados!',err)
    }finally{
        conn.close()
        console.log('Conexão com o Banco de Dados foi Encerrada')
    }
}

syncDatabase()