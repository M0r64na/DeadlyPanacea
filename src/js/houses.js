// for creating doors
function createDoor(x1Cord, y1Cord, x2Cord, y2Cord, texture, group) {
	door = group.create(x1Cord, y1Cord, texture);
    door.scale.setTo((x2Cord - x1Cord) / door.width, (y2Cord - y1Cord) / door.height);
	door.body.immovable = true;
	door.visible = false;
	return door;
}

// the first house
function createEasyHouse(game) {
	// add walls
	walls = game.add.physicsGroup();
	walls.enableBody = true;
	// 1
	wall = walls.create(width / 2 - 300, height / 2 - 200);
	wall.scale.setTo(0.0000000001, 400/32);
	wall.body.immovable = true;
	// 2
	wall = walls.create(width / 2 - 300, height / 2 - 200);
	wall.scale.setTo(600/32, 0.0000000001);
	wall.body.immovable = true;
	// 3
	wall = walls.create(width / 2 + 300, height / 2 - 200);
	wall.scale.setTo(0.0000000001, 400 / 32);
	wall.body.immovable = true;
	// 4
	wall = walls.create(width / 2 - 300, height / 2 + 200);
	wall.scale.setTo(600 / 32, 0.0000000001);
	wall.body.immovable = true;
	
    game.physics.arcade.enable(walls);
	
	// door
	door = createDoor(width / 2 - 10, height / 2 + 200, width / 2 + 10, height / 2 + 210, 'door', doors);
	door.body.onCollide = new Phaser.Signal();
	door.body.onCollide.add(() => { game.state.start('world'); }, this);

	// interior
    table = walls.create(width / 2 - 300, height / 2 - 200, 'rectangle');
    table.scale.setTo(0.2, 0.6);
	table.body.immovable = true;
}

// the second, harder house
function createHardHouse(game) {
	// add walls
	walls = game.add.physicsGroup();
	walls.enableBody = true;
	// 1
	wall = walls.create(width / 2 - 350, height / 2 - 250);
	wall.scale.setTo(0.0000000001, 250/32);
	wall.body.immovable = true;
	// 2
	wall = walls.create(width / 2 - 350 - 10, height / 2);
	wall.scale.setTo(350 / 32, 0.0000000001);
	wall.body.immovable = true;
	// 3
	wall = walls.create(width / 2, height / 2);
	wall.scale.setTo(0.0000000001, 250 / 32);
	wall.body.immovable = true;
	// 4
	wall = walls.create(width / 2, height / 2 + 250);
	wall.scale.setTo(350 / 32, 0.0000000001);
	wall.body.immovable = true;
	// 5
	wall = walls.create(width / 2 + 350, height / 2 - 250);
	wall.scale.setTo(0.0000000001, 500 / 32);
	wall.body.immovable = true;
	// 6
	wall = walls.create(width / 2 - 350, height / 2 - 250);
	wall.scale.setTo(700 / 32, 0.0000000001);
	wall.body.immovable = true;
	
    game.physics.arcade.enable(walls);
	
	// door
	door = createDoor(width / 2 + 115, height / 2 + 250, width / 2 + 135, height / 2 + 280, 'door', doors);
	door.body.onCollide = new Phaser.Signal();
	door.body.onCollide.add(() => { game.state.start('world'); }, this);
	
	// interior
    table = walls.create(width / 2 - 350, height / 2 - 250, 'rectangle');
    table.scale.setTo(0.2, 0.6);
	table.body.immovable = true;
}

// npc - on collide touch=true izliza textbox i ako interactne otiva na bitka

// vrushtame na lastX i lastY