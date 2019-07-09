const characters = {
    elf: new Character("elf", 100, 5, 5),
    knight: new Character("knight", 125, 4, 4),
    orc: new Character("orc", 100, 6, 3),
    skeleton: new Character("skeleton", 50, 2, 3),
    wizard: new Character("wizard", 75, 8, 4)
};

class Game {

    constructor() {
        this.gameDiv = $("#game-div");
        this.reset();
    }

    setInstructions(text) {
        $("#instructions").text(text);
    }

    enemySelect() {
        $("#" + this.player.name).addClass("player");
        this.setInstructions("Please select an enemy");
    }

    updateStats() {
        const playerHealth = $("#player-health");
        const enemyHealth = $("#enemy-health");

        // Clear player-health and enemy-health
        playerHealth.text("");
        enemyHealth.text("");

        // Show player health
        if (this.player) {
            playerHealth.text("Player Health: " + this.player.currHealth);
        }
        
        // Show enemy health
        if (this.enemy) {
            enemyHealth.text("Enemy Health: " + this.enemy.currHealth);
        }
    }

    logEntry(message) {
        // Get log-div
        const log = $("#log-div");

        // Create new entry
        const entry = $("<span>");
        entry.text(message);

        // Prepend entry to log
        log.prepend("<br>");
        log.prepend(entry);
    }

    hasWon() {
        return this.player.currHealth > 0 &&
            (this.player === characters.elf || characters.elf.currHealth <= 0) &&
            (this.player === characters.knight || characters.knight.currHealth <= 0) &&
            (this.player === characters.orc || characters.orc.currHealth <= 0) &&
            (this.player === characters.skeleton || characters.skeleton.currHealth <= 0) &&
            (this.player === characters.wizard || characters.wizard.currHealth <= 0);
    }

    hasLost() {
        return this.player.currHealth <= 0;
    }

    endScreen(state) {
        // Clear stats display
        $("#player-health").text("");
        $("#enemy-health").text("");

        // Show state text
        this.setInstructions(state);

        // Clear game-div
        this.gameDiv.empty();

        // Add reset button
        this.addResetButton();
    }

    displayCharacters() {
        // Clear game-div
        this.gameDiv.empty();

        // Check if elf has been defeated, if not show the sprite
        if (characters.elf.currHealth > 0) {
            this.gameDiv.append(characters.elf.createSprite());
        }

        // Check if knight has been defeated, if not show the sprite
        if (characters.knight.currHealth > 0) {
            this.gameDiv.append(characters.knight.createSprite());
        }

        // Check if orc has been defeated, if not show the sprite
        if (characters.orc.currHealth > 0) {
            this.gameDiv.append(characters.orc.createSprite());
        }

        // Check if skeleton has been defeated, if not show the sprite
        if (characters.skeleton.currHealth > 0) {
            this.gameDiv.append(characters.skeleton.createSprite());
        }

        // Check if wizard has been defeated, if not show the sprite
        if (characters.wizard.currHealth > 0) {
            this.gameDiv.append(characters.wizard.createSprite());
        }
    }

    charSelect(name) {
        // Check which character was clicked
        switch (name) {
            case characters.elf.name:
                if (!this.player) {
                    // Set player to elf
                    this.player = characters.elf;
                } else if (!this.enemy && this.player != characters.elf) {
                    // Set enemy to elf
                    this.enemy = characters.elf;
                }
                break;
            case characters.knight.name:
                if (!this.player) {
                    // Set player to knight
                    this.player = characters.knight;
                } else if (!this.enemy && this.player != characters.knight) {
                    // Set enemy to knight
                    this.enemy = characters.knight;
                }
                break;
            case characters.orc.name:
                if (!this.player) {
                    // Set player to orc
                    this.player = characters.orc;
                } else if (!this.enemy && this.player != characters.orc) {
                    // Set enemy to orc
                    this.enemy = characters.orc;
                }
                break;
            case characters.skeleton.name:
                if (!this.player) {
                    // Set player to skeleton
                    this.player = characters.skeleton;
                } else if (!this.enemy && this.player != characters.skeleton) {
                    // Set enemy to skeleton
                    this.enemy = characters.skeleton;
                }
                break;
            case characters.wizard.name:
                if (!this.player) {
                    // Set player to wizard
                    this.player = characters.wizard;
                } else if (!this.enemy && this.player != characters.wizard) {
                    // Set enemy to wizard
                    this.enemy = characters.wizard;
                }
                break;
        }

        // Check if player has been selected but not an enemy
        if (this.player && !this.enemy) {
            // Highlight player and update instructions
            this.enemySelect();
        }

        // If both a player and enemy have been selected perform battle
        if (this.player && this.enemy) {
            this.battle();
        }
    }

    addAttackButton() {
        // Create new div
        let div = $("<div>");
        div.attr("class", "col text-center");

        // Create attack button
        let btn = $("<button>");
        btn.attr("id", "atk-btn");
        btn.attr("class", "btn mx-auto my-2 text-center");
        btn.text("ATTACK");

        // Add attack button to game-div
        div.append(btn);
        this.gameDiv.append(div);
    }

    addResetButton() {
        // Create new div
        let div = $("<div>");
        div.attr("class", "col text-center");

        // Create reset button
        let btn = $("<button>");
        btn.attr("id", "reset-btn");
        btn.attr("class", "btn mx-auto my-2 text-center");
        btn.text("RESET");

        // Add reset button
        div.append(btn);
        this.gameDiv.append(div);
    }

    battle() {
        this.setInstructions("Battle!");

        // Clear game-div
        this.gameDiv.empty();

        // Add player character to left side
        this.gameDiv.append(this.player.createSprite());

        // Add attack button between player and enemy
        this.addAttackButton();

        // Add enemy character to right side
        let enemySprite = this.enemy.createSprite();
        enemySprite.addClass("enemy");
        this.gameDiv.append(enemySprite);

        // Display stats
        this.updateStats();
    }

    attack() {
        // Capitalize player and enemy names
        const playerName = this.player.name.substr(0, 1).toUpperCase() + this.player.name.substr(1);
        const enemyName = this.enemy.name.substr(0, 1).toUpperCase() + this.enemy.name.substr(1);

        // Create new log entry with counter attack info
        this.logEntry(enemyName + " countered player for " + this.enemy.counter + ".");

        // Create new log entry with attack info
        this.logEntry(playerName + " attacked enemy for " + this.player.currAttack + ".");

        // Attack enemy for current attack value
        this.enemy.currHealth -= this.player.currAttack;

        // Counter attack player
        this.player.currHealth -= this.enemy.counter;

        // Increase player attack value by base atack value
        this.player.currAttack += this.player.baseAttack;

        // Update stats on screen
        this.updateStats();

        // Check for defeated enemy
        if (this.enemy.currHealth <= 0) {
            // Add character defeated log entry
            this.logEntry(enemyName + " has been defeated!");

            // Check for win
            if (this.hasWon()) {
                // Show the 'You Win!' message and reset button
                this.endScreen("You Win!");
            } else if (this.hasLost()) {
                // Show the 'You Lose!' message and reset button
                this.endScreen("You Lose!");
            } else {
                // Set enemy to null
                this.enemy = null;

                // Update stats
                this.updateStats();

                // Show character selection
                this.displayCharacters();

                // Highlight player
                this.enemySelect();
            }
        }
    }

    reset() {
        // Remove player, enemy, and all defeated characters
        this.player = null;
        this.enemy = null;

        // Reset all characters to default values
        characters.elf.reset();
        characters.knight.reset();
        characters.orc.reset();
        characters.skeleton.reset();
        characters.wizard.reset();

        // Show game instructions
        this.setInstructions("Please select your character");

        // Show all characters for player and enemy selection
        this.displayCharacters();

        // Clear log
        $("#log-div").empty();
    }
}

// Start game when page has loaded
$(document).ready(function () {
    // Create new game
    let game = new Game();

    // Enable character selection
    $("#game-div").on("click", ".character", function () {
        game.charSelect($(this).attr("id"));
    });

    // Enable attack button functionality
    $("#game-div").on("click", "#atk-btn", function() {
        game.attack();
    });

    // Enable reset button functionality
    $("#game-div").on("click", "#reset-btn", function() {
        game.reset();
    });
});