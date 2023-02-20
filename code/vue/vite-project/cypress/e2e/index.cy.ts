describe('template spec', () => {
  it('has home text', () => {
    // 访问首页
    cy.visit('http://localhost:5173/')
    // 断言是否有 Home 文字
    cy.contains('Home')
  })
})