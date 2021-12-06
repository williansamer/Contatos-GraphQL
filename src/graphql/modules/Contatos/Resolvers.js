const db = require("../../../db")

module.exports = {
  Query: {
    contatos: ()=>{
      return db("contato")
    }
  },

  Mutation: {
    criarContato: async (_, {data})=>{
      return await (await db("contato").insert(data).returning("*"))[0]
    },

    atualizarContato: async (_, {id, data})=>{
      return await (await db("contato").where({id: id}).update(data).returning("*"))[0]
    },

    deletarContato: async (_, {filtro: {id, email}}) =>{
      if(id){
        return await(await db("contato").where({id: id}).delete())
      }
      if(email){
        return await(await db("contato").where({email: email}).delete())
      }

      throw new Error("Digite ao menos um parâmetro")
    }
  }


}