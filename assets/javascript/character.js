class Character {

    constructor(name, baseHealth, baseAttack, counter) {
        this.name = name;
        this.baseHealth = baseHealth;
        this.baseAttack = baseAttack;
        this.counter = counter;
        this.reset();
    }

    createSprite() {
        let outerDiv = $("<div>");
        outerDiv.attr("class", "col mx-auto text-center outer-div")

        let innerDiv = $("<div>");
        innerDiv.attr("class", "mx-auto character");
        innerDiv.attr("id", this.name);

        outerDiv.append(innerDiv);
        return outerDiv;
    }

    reset() {
        this.currHealth = this.baseHealth;
        this.currAttack = this.baseAttack;
    }
}