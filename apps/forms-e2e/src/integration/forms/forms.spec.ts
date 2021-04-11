describe('forms: Forms component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=forms--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to forms!');
    });
});
