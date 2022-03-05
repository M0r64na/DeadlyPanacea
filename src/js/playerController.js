function playerMovement(player){
	// reset dog
    player.body.acceleration.x = 0;
    player.body.acceleration.y = 0;

	// move dog
	if(cursors.left.isDown) {
		player.body.acceleration.x -= 2000;
		player.animations.play('left');
	}
	else if(cursors.right.isDown) {
        player.body.acceleration.x += 2000;
	    player.animations.play('right');
	}
	if(cursors.up.isDown) {
	    player.body.acceleration.y -= 2000;
	}
	else if(cursors.down.isDown) {
	    player.body.acceleration.y += 2000;
	}
}

function playerFire(player, weapon){
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
    weapon = game.add.weapon(10, 'bullet_1');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;
    weapon.bulletKillDistance = 150;
    weapon.fireRate = 1000;

    weapon.trackSprite(player, 40, 15, true);
}

function createSecondWeapon() {
    weapon = game.add.weapon(10, 'bullet_2');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 650;
    weapon.bulletKillDistance = 100;
    weapon.fireRate = 800;

    weapon.trackSprite(player, 40, 15, true);
}