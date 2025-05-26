/// <reference types= "cypress"/>

const { faker } = require('@faker-js/faker');


describe('Consulte e gerencie produtos da loja', () => {

   const nome = faker.internet.userName();
   const email = faker.internet.email();
   const password = faker.internet.password();

   let token
   beforeEach(() => {
      cy.token('fulano@qa.com', 'teste').then(tkn => {
         token = tkn
      })
   });

   it('Listar produtos cadastrados', () => {
      cy.request({
         method: 'GET',
         url: 'produtos',

      })
         .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')

         });
   })

   it('Cadastrar produtos', () => {
      let produto = 'Produto EBAC ' + Math.floor(Math.random() * 10000000000) //variavel p/ adicionar produtos aleatórios
      cy.request({
         method: 'POST',
         url: 'produtos',
         headers: { authorization: token },
         body: {
            "nome": produto,
            "preco": 3000,
            "descricao": "Celular",
            "quantidade": 10
         }
      })
         .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            // assertion code here
         });
   })

   it('Validar mensagem de erro, "Já existe produto com esse nome"', () => {
     cy.cadastrarProduto(token, 'iphone xr', 2000, 'Celular', 10)
      .then((response) => {
         expect(response.status).to.equal(400)
         expect(response.body.message).to.equal('Já existe produto com esse nome')
      });

   });

   it('Buscar produto por ID', () => {
      cy.request({
         method: 'GET',
         url: 'produtos/' + 'BeeJh5lz3k6kSIzA',

      })
         .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('BeeJh5lz3k6kSIzA')

         });
   });

   it.only('Deletar produtos', () => {
      cy.request({
         method: 'DELETE',
         url: 'produtos/' + 'WQqPNRaNx3hxC7pj',

         failOnStatusCode: false

      })
         .then((response) => {
            expect(response.status).to.equal(404)
            //expect(response.body.message).to.equal('Registro excluído com sucesso | Nenhum registro excluído')
           

         });
   });

   it('Editar produtos', () => {
      cy.request({
         method: 'PUT',
         url: 'produtos/MU5n2w9ItcdEPLdV',
         headers: {authorization: token},
         body: {
            "nome": "samsung A42",
            "preco": 100,
            "descricao": "Celular",
            "quantidade": 10
          },

      })
         .then((response) => {
            expect(response.status).to.equal(200)
           // expect(response.body).to.have.property('')
            expect(response.body.message).to.equal('Registro alterado com sucesso')

         });
   });


});
