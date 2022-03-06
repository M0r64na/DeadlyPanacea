// damages

// enemy damages player *might eventually do

// pBullet damage enemy
function hitEnemy(enemy, bullets){
	enemy.damage(playerDamage);
	bullets.kill();
	console.log("zadada");
}
// eBullet damage player
function hitPlayer(player, bullets){
	// animation
	player.damage(5);
	bullets.kill();
}