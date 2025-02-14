describe('Testes Banco', () => {

  const selectorsList = {
    accountsGeneric: '.p-6',
    logoutButton: '.mt-2',
    valueField: "[type='number']",
    confirmField: '.py-2',
    transactionHistory: '.border-b',
    textField: "[type='text']"
  } 

  it('Entrando e saindo das contas disponiveis', () => {
    cy.visit('/vaga-qa/')
    cy.get(selectorsList.confirmField).click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.logoutButton).click()
    cy.get(selectorsList.accountsGeneric).eq(1).click()
    cy.get(selectorsList.logoutButton).click()
    cy.get(selectorsList.accountsGeneric).eq(2).click()
    cy.get(selectorsList.logoutButton).click()
  })

  it('Realizando Depositos de 1000 reais', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(0).type('1000')
    cy.get(selectorsList.confirmField).eq(0).click()
    cy.get(selectorsList.transactionHistory).contains('+R$ 1000.00')
  })

  it('Erro ao Realizar Depositos Negativos', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(0).type('-1000')
    cy.get(selectorsList.confirmField).eq(0).click()
    cy.get('body').contains('Não é possível realizar um deposito negativo')
    })
  
  it('Realizando Saque com Saldo Disponível', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(1).type('1000')
    cy.get(selectorsList.confirmField).eq(1).click()
    cy.get(selectorsList.transactionHistory).contains('-R$ 1000.00')
    })
    
  it('Erro ao Realizar Saque sem Saldo Disponível', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(1).type('8000')
    cy.get(selectorsList.confirmField).eq(1).click()
    cy.get('body').contains('Saldo insuficiente')
    })
      
  it('Erro ao Realizar Saque com Saldo Negativo', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(1).type('-8000')
    cy.get(selectorsList.confirmField).eq(1).click()
    cy.get('body').contains('Não é possível realizar um saque com valor negativo')
    })
  
  it('Realizando transferência com Sucesso para uma conta existe e com saldo', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.textField).type('5678-9')
    cy.get(selectorsList.valueField).eq(2).type('200')
    cy.get(selectorsList.confirmField).eq(2).click()
    cy.get(selectorsList.transactionHistory).contains('-R$ 200.00')
    })

  it('Erro ao realizar transferência para uma conta existente porém sem saldo', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.valueField).eq(2).type('5000')
    cy.get(selectorsList.confirmField).eq(2).click()
    cy.get('body').contains('Saldo insuficiente')
    })

  it('Erro ao realizar transferência para uma conta existente sem saldo', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.textField).type('9999-9')
    cy.get(selectorsList.valueField).eq(2).type('200')
    cy.get(selectorsList.confirmField).eq(2).click()
    cy.get('body').contains('Esta conta não existe')
    })

  it('Erro ao realizar transferência para uma conta inexistente', () => {
    cy.visit('/vaga-qa/')
    cy.get('.py-2').click()
    cy.get(selectorsList.accountsGeneric).eq(0).click()
    cy.get(selectorsList.textField).type('9999-9')
    cy.get(selectorsList.valueField).eq(2).type('200')
    cy.get(selectorsList.confirmField).eq(2).click()
    cy.get('body').contains('Saldo insuficiente')
    })
})