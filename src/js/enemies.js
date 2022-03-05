// create enemy
function createEnemy(x, y, sprite){
	enemy = game.add.sprite(x, y, sprite);
	enemy.enebleBody = true;
	game.physics.arcade.enable(enemy);
	enemy.body.setCircle(enemy.width/2);
	enemy.anchor.setTo(0.5, 0.5);
	enemy.body.collideWorldBounds = true;
		
	enemy.maxHealth = 100;
	enemy.health = 100;
	enemy.body.angle = Math.PI/2;

	return enemy;
}

// create weapon
function createWeapon(sprite, speed, killD, RoF, tracked){
	weapon = game.add.weapon(10, sprite);

	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	weapon.bulletSpeed = speed;
	weapon.bulletKillDistance = killD;
	weapon.fireRate = RoF;

	weapon.trackSprite(tracked, 40, 15, true);
	
	return weapon;
}
		
// update enemies function
function easyEnemy(enemy, weapon) { 
	enemy.body.speed = 100 + (30-enemy.health) * 5;
	if (enemy.body.velocity.x == 0 || enemy.body.velocity.y == 0 ){
		enemy.body.moveFrom(5000, enemy.speed, Math.random() * (360 - 0) - 0);
	} else if (enemy.health > 30){
		weapon.fireAtSprite(player);
		if(!enemy.body.isMoving) enemy.body.moveFrom(3000, 100, Math.random() * (360 - 0) - 0);
	} else if (game.physics.arcade.distanceBetween(enemy, player) > 200){
		game.physics.arcade.moveToObject(enemy, player, enemy.body.speed);
	}
}

function hardEnemy(enemy, weapon){
	enemy.body.speed = 200 + (enemy.maxHealth-enemy.health) * 2;
	if (enemy.health < 30){
		enemy.sendToBack();
		enemy.body.velocity.y = 300;
		if (enemy.body.y < 120){
			enemy.bringToTop();
		}
	}
	if (enemy.body.y > height-268){
		enemy.body.y = 68;
		enemy.body.x = width/5 * (Math.random() * (4 - 1) + 1);
		if (enemy.body.x < width/2) {
			enemy.body.angle = Math.PI * (1/2 - Math.round(Math.random()) * 1/4);
		}
		else {
			enemy.body.angle = Math.PI * (1/2 + Math.round(Math.random()) * 1/4);
		}
	}
	enemy.body.moveFrom(1000);
	weapon.fireAtSprite(player);
}
