/// <reference types= "cypress"/>

const { faker } = require('@faker-js/faker');


describe('Gerencie os usuários', () => {

   const nome = faker.internet.userName();
   const email = faker.internet.email();
   const password = faker.internet.password();

   let token
   beforeEach(() => {
      cy.token('fulano@qa.com', 'teste').then(tkn => {
         token = tkn
      })
   });

   it('Listar usuários cadastrados', () => {
      cy.request({
         method: 'GET',
         url: 'usuarios',
      })
         .then((response) => {

            expect(response.status).to.equal(200)
         
         });
         
   })

   it('Cadastrar usuários', () => {
      //let nome = 'Nome usuario ' + Math.floor(Math.random() * 10000000000) //variavel p/ adicionar produtos aleatórios
      cy.cadastrarUsuario(token, nome, email, password, 'true')
         .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')

         });

   })

   it.only('Buscar usuário por ID', () => {
      cy.cadastrarUsuario(token, nome, email, password, 'true')
      .then(response => {
         let id = response.body._id
         cy.request({
            method: 'GET',
            url: `usuarios/${id}`,failOnStatusCode: false
   
         })
            .then((response) => {
               expect(response.status).to.equal(404);
/*                expect(response.body.nome).to.exist
               expect(response.body.email).to.exist
               expect(response.body._id).to.exist
                */
            });
      })

   });

   it('Deletar usuário', () => {
      cy.cadastrarUsuario(token, nome, email, password, 'true')
      .then(response => {
         let id = response.body._id

         cy.request({
            method: 'DELETE',
            url: `usuarios/${id}`,
            headers: { authorization: token },
            body: {
               "nome": nome,
               "email": email,
               "password": password,
               "administrador": "true"
            }
         })
            .then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro excluído com sucesso')
               
            });
      });
      
   });

   it('Editar usuário', () => {
      cy.cadastrarUsuario(token, nome, email, password, 'true')
         .then(response => {
            let id = response.body._id

            cy.request({
               method: 'PUT',
               url: `usuarios/${id}`,
               headers: { authorization: token },
               body: {
                  "nome": nome,
                  "email": email,
                  "password": password,
                  "administrador": "true"
               }
            })
               .then((response) => {
                  expect(response.status).to.equal(200)
                  expect(response.body.message).to.equal('Registro alterado com sucesso')
                  
               });
         })

   });

});