describe('Los estudiantes Teacher search', function() {
    it('Visits los estudiantes and find unknown teacher', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-input').find('input[role="combobox"]').type("Alguien que no existe", {force:true});
        cy.contains('No se encontraron profesores ni materias');
    });

    it('Visits los estudiantes and find and show teacher page', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-input').find('input[role="combobox"]').type("Dario Correal", {force:true});
        cy.contains('Dario Correal - Ingeniería de Sistemas');
        cy.get('.Select-input').find('input[role="combobox"]').type('{enter}', {force:true});
        cy.contains('Dario Correal');
        cy.contains('Soy Dario');
    });

    it('Visits los estudiantes and filter the items', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.get('.Select-input').find('input[role="combobox"]').type("Dario Correal", {force:true});
        cy.contains('Dario Correal - Ingeniería de Sistemas');
        cy.get('.Select-input').find('input[role="combobox"]').type('{enter}', {force:true});
        cy.get('.materias').find('input[name="id:ARTI4201"]').click();
        cy.get('.materias').find('input[name="id:MISO4206"]').click();

        cy.get('li.post').contains('Arquitectura De Solucion');

    });


});