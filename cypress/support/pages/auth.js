class Auth{
    // clsss name doen not has to be the same as a file name
    // you can put more than one class in a file, and none of them have any superiority over each other
    login(user_name,password){
        cy.get('[name="username"]').type(user_name);
        cy.get('[name="password"]').type(password);
        cy.get('#wooden_spoon').click();
    }
    logout(){
        cy.contains('Logout').should('be.visible').click();
    }
}
const auth = new Auth();//object of the class we've made
module.exports = {
    auth
}