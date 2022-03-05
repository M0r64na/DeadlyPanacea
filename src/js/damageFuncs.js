// damages

// enemy damages player *might eventually do

// pBullet damage enemy
function hitEnemy(enemy, bullets){
	enemy.damage(playerDamage);
	bullets.destroy();
}
// eBullet damage player
function hitPlayer(player, bullets){
	// animation
	player.damage(20);
	bullets.destroy();
}