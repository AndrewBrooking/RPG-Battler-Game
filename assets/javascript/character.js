const IMG_HEIGHT = 196;
const FRAMES = 2;

class Character {

    constructor(name, health, attack, counter) {
        this.baseStats = {
            baseHealth: health,
            baseAttack: attack
        };

        this.name = name;
        this.counter = counter;

        this.reset();
    }

    createSprite() {
        let div = $("<div>");
        div.attr("class", "col mx-auto px-2 character");
        div.attr("id", this.name);
        return div;
    }

    attack(enemy) {
        enemy.health -= this.attack;
        this.health -= enemy.counter;
        this.attack += this.baseStats.baseAttack;
    }

    reset() {
        this.health = this.baseStats.baseHealth;
        this.attack = this.baseStats.baseAttack;
    }
}