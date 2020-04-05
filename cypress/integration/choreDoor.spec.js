describe("choor-door game", () => {
  context("starting state", () => {
    beforeEach(() => cy.visit("https://chore-door.s3.eu-central-1.amazonaws.com/index.html"));

    it("shows three closed doors and a 'Good luck!' button", () => {
      ["door1", "door2", "door3"].forEach(door => {
        cy.get(`#${door}`)
          .should(
            "have.attr",
            "src",
            "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"
          );
      });
      cy.get('#start').should("contain", "Good luck!");
    });
  });
});
