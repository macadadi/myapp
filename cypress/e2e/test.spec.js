describe('Home page', () => {
  it('should visit the home page', () => {
    cy.visit('/');
    cy.contains('My App');
  });

  it('can submit student infomation', () => {
    cy.visit('/');
    cy.get('#nationalID').type('12354')
    cy.get('.text-center > .bg-blue-500').should('be.disabled')
    cy.get('#name').type('Student name')
    cy.get('#surname').type('Superstudent')
    cy.get('.react-datepicker__input-container > input').click().should('be.enabled')
    cy.get('.react-datepicker__input-container > input').click().clear()
    cy.contains('Date of birth is required').should('be.visible')
    cy.get('#userType').select('Student');
    cy.get('.react-datepicker__input-container > input').click().type('2000/2/2 {enter}')
    cy.contains('age may not be more than 22').should('be.visible')
    cy.get('.react-datepicker__input-container > input').click().clear().type('2016/2/2 {enter}')
    cy.get('#Student').type(23434223424)
    cy.get('.text-center > .bg-blue-500').should('be.enabled')
  });


  it('can submit a teacher infomation', () => {
    cy.visit('/');
    cy.get('#nationalID').type('12354')
    cy.get('.text-center > .bg-blue-500').should('be.disabled')
    cy.get('#name').type('Student name')
    cy.get('#surname').type('Superstudent')
    cy.get('.react-datepicker__input-container > input').click().should('be.enabled')
    cy.get('.react-datepicker__input-container > input').click().clear()
    cy.contains('Date of birth is required').should('be.visible')
    cy.get('#userType').select('Teacher');
    cy.get('.react-datepicker__input-container > input').click().type('2019/2/2 {enter}')
    cy.contains('age may not be less than 21').should('be.visible')
    cy.get('.react-datepicker__input-container > input').click().clear().type('2000/2/2 {enter}')
    cy.get('#Teacher').type(23434223424)
    cy.get('#title').select('Mr')
    cy.get('.text-center > .bg-blue-500').should('be.enabled')
  });
});

describe('Fetching data', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('users', JSON.stringify([{
        "nationalID": "98765678",
        "name": "Maricus Omondi",
        "surname": "Senior Teacher",
        "title": "Mr",
        "dateOfBirth": "2023-11-20T21:00:00.000Z",
        "Studentnumber": "23323323232332"
      },
      {
        "nationalID": "98765678",
        "name": "Deputy teacher",
        "surname": "Teacher",
        "title": "Mr",
        "dateOfBirth": "2023-11-20T21:00:00.000Z",
        "Studentnumber": "23323323232332"
      },
      {
        "dateOfBirth": "2002-12-30T00:00:00.000Z",
        "nationalID": "3433",
        "name": "Maricus Omondi",
        "surname": "hjvhjvjhh",
        "Studentnumber": "3233233223"
      }, {
        "dateOfBirth": "2002-12-30T00:00:00.000Z",
        "nationalID": "2433",
        "name": "Main student",
        "surname": "Kentom",
        "Studentnumber": "3233233223"
      }]));
    })
  })

  it('should fetch and display student data', () => {
    cy.visit('/students')
    cy.contains('loading').should('be.visible')
    cy.contains('Main student').should('be.visible')
  })


  it('should fetch and display teachers data', () => {
    cy.visit('/teachers')
    cy.contains('loading').should('be.visible')
    cy.contains('Deputy teacher').should('be.visible')
  })

  it('can navigate to students',()=>{
    cy.visit('/')
    cy.get('[href="/students"]').click()
    cy.url().should('eq', 'http://localhost:3000/students')
  })

  it('can navigate to teachers',()=>{
    cy.visit('/')
    cy.get('[href="/teachers"]').click()
    cy.url().should('eq', 'http://localhost:3000/teachers')
  })
})