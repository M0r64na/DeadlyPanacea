// update enemies function

function easyEnemy(game) { 
	enemy.body.speed = 100 + (30-enemy.health) * 5;
	if (enemy.body.velocity.x == 0 || enemy.body.velocity.y == 0 ){
		enemy.body.moveFrom(5000, enemy.speed, Math.random() * (360 - 0) - 0);
	} else if (enemy.health > 30){
		enemyWeapon.fireAtSprite(player);
		if(!enemy.body.isMoving) enemy.body.moveFrom(3000, 100, Math.random() * (360 - 0) - 0);
	} else if (game.physics.arcade.distanceBetween(enemy, player) > 200){
		game.physics.arcade.moveToObject(enemy, player, enemy.body.speed);
	}
}

function hardEnemy(){
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
	enemyWeapon.fireAtSprite(player);
}
