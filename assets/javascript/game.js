const characters = {
    elf: new Character("elf", 100, 3, 4),
    knight: new Character("knight", 125, 5, 5),
    orc: new Character("orc", 150, 6, 3),
    skeleton: new Character("skeleton", 50, 2, 3),
    wizard: new Character("wizard", 75, 5, 2)
};

class Game {

    constructor() {
        this.reset();
    }

    displayCharacters() {
        const gameDiv = $("#game-div");

        gameDiv.append(characters.elf.createSprite());
        gameDiv.append(characters.knight.createSprite());
        gameDiv.append(characters.orc.createSprite());
        gameDiv.append(characters.skeleton.createSprite());
        gameDiv.append(characters.wizard.createSprite());
    }

    onClick(name) {
        switch (name) {
            case characters.elf.name:
                if (!this.player) {
                    this.player = characters.elf;
                } else if (!this.enemy) {
                    this.enemy = characters.elf;
                }
                break;
            case characters.knight.name:
                if (!this.player) {
                    this.player = characters.knight;
                } else if (!this.enemy) {
                    this.enemy = characters.knight;
                }
                break;
            case characters.orc.name:
                if (!this.player) {
                    this.player = characters.orc;
                } else if (!this.enemy) {
                    this.enemy = characters.orc;
                }
                break;
            case characters.skeleton.name:
                if (!this.player) {
                    this.player = characters.skeleton;
                } else if (!this.enemy) {
                    this.enemy = characters.skeleton;
                }
                break;
            case characters.wizard.name:
                if (!this.player) {
                    this.player = characters.wizard;
                } else if (!this.enemy) {
                    this.enemy = characters.wizard;
                }
                break;
        }

        if (this.player && this.enemy) {
            // TODO: Clear game-div

            // TODO: Add player character to game-div

            // TODO: Add attack button to game-div

            // TODO: Add enemy character to game-div
        }
    }

    reset() {
        // Remove player, enemy, and all defeated characters
        this.player = null;
        this.enemy = null;
        this.defeated = [];

        // Reset all characters to default values
        characters.elf.reset();
        characters.knight.reset();
        characters.orc.reset();
        characters.skeleton.reset();
        characters.wizard.reset();

        // Show all characters for player and enemy selection
        this.displayCharacters();
    }
}