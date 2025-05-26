/// <reference types= "cypress"/>

describe('Login', () => {

   it('Logar com Sucesso', () => {
      cy.request({
         method: 'POST',
         url: 'login',
         body: {
            "email": "fulano@qa.com",
            "password": "teste"
         }
      })
         .then((response) => {

            //expect(response.status).to.have.eq(200);
            cy.log(response.body.authorization)
            expect(response.status).to.equal(200)
            //expect(response.body.message).to.equal('Login realizado com sucesso')

         });
   })

})



