function setUpPlayerMovementController() {
    movePlayerUpKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
    movePlayerDownKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
    movePlayerLeftKey = game.input.keyboard.addKey(Phaser.KeyCode.A);
    movePlayerRightKey = game.input.keyboard.addKey(Phaser.KeyCode.D);
}

// TO DO: invoke function in create function( world state, house state, battle state)
function setUpPlayerMovementAnimations() {
    player.animations.add('left', [4, 3, 2, 1, 4], 5);
	player.animations.add('right', [5 , 6, 7, 8, 5], 5);
}

function playerMovement(moved){
	// reset dog
    player.body.acceleration.x = 0;
    player.body.acceleration.y = 0;

	// move dog
	if(movePlayerLeftKey.isDown) {
		player.body.acceleration.x -= 2000;
		player.animations.play('left');
        moved = true;
	}
	else if(movePlayerRightKey.isDown) {
        player.body.acceleration.x += 2000;
	    player.animations.play('right');
        moved = true;
	}
	if(movePlayerUpKey.isDown) {
	    player.body.acceleration.y -= 2000;
        moved = true;
	}
	else if(movePlayerDownKey.isDown) {
	    player.body.acceleration.y += 2000;
        moved = true;
	}
    return moved;
}

function playerFire(){
	if(mouse.leftButton.isDown) {
		if((mouse.x < width - 50 || mouse.x > width - 12) && (mouse.y < 10 || mouse.y > 50)) {
		    weapon.fireAtPointer(mouse);
		}
	}

    if(changeWeaponKey.isDown) {
        ++currentWeaponIndex;

        if(currentWeaponIndex > 2) {
            currentWeaponIndex = 1;
        }
        
        if(currentWeaponIndex == 1) 
        {
            createFirstWeapon();
        }
        else 
        {
            createSecondWeapon();
        }
			console.log(currentWeaponIndex);
    }
}

function createFirstWeapon() {
    weapon = game.add.weapon(10, 'bullet_2');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;
    weapon.bulletKillDistance = 150;
    weapon.fireRate = 1000;
	playerDamage = 20;

    weapon.trackSprite(player, 40, 15, true);
	return weapon;
}

function createSecondWeapon() {
    weapon = game.add.weapon(10, 'bullet_2');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 650;
    weapon.bulletKillDistance = 100;
    weapon.fireRate = 800;
	playerDamage = 20;

    weapon.trackSprite(player, 40, 15, true);
	return weapon;
}