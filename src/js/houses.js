// for creating doors
function createDoor(x1Cord, y1Cord, x2Cord, y2Cord, texture, group) {
	door = group.create(x1Cord, y1Cord, texture);
    door.scale.setTo((x2Cord - x1Cord) / door.width, (y2Cord - y1Cord) / door.height);
	door.body.immovable = true;
	return door;
}

// the first house
function createEasyHouse(game) {
	// wall tiles
	for(var i = height / 2 - 200; i < height / 2 + 200; i += 50){
		tile = game.add.image(width / 2 - 300, i, "wall");
		tile.scale.setTo(50/490, 50/490);
		tile.anchor.setTo(1, 0);
	}
	for(var i = height / 2 - 200; i < height / 2 + 200; i += 50){
		tile = game.add.image(width / 2 + 300, i, "wall");
		tile.scale.setTo(50/490, 50/490);
	}
	for(var i = width / 2 - 350; i < width / 2 + 350; i += 50){
		tile = game.add.image(i, height / 2 - 200, "wall");
		tile.scale.setTo(50/490, 50/490);
		tile.anchor.setTo(0, 1);
	}
	for(var i = width / 2 - 350; i < width / 2 + 350; i += 50){
		tile = game.add.image(i, height / 2 + 200, "wall");
		tile.scale.setTo(50/490, 50/490);
	}
	for(var i = width / 2 - 300; i < width / 2 + 300; i += 50){
		for(var j = height / 2 - 200; j < height / 2 + 200; j += 50){
			floor = game.add.image(i, j, "floor");
			floor.scale.setTo(50/260, 50/260);
		}
	}
	
	// add walls
	walls = game.add.physicsGroup();
	walls.enableBody = true;
	// left
	wall = walls.create(width / 2 - 300, height / 2 - 200);
	wall.scale.setTo(0.0000000001, 400/32);
	wall.body.immovable = true;
	// up
	wall = walls.create(width / 2 - 300, height / 2 - 200);
	wall.scale.setTo(600/32, 0.0000000001);
	wall.body.immovable = true;
	// right
	wall = walls.create(width / 2 + 300, height / 2 - 200);
	wall.scale.setTo(0.0000000001, 400/32);
	wall.body.immovable = true;
	// down
	wall = walls.create(width / 2 - 300, height / 2 + 200);
	wall.scale.setTo(600/32, 0.0000000001);
	wall.body.immovable = true;
	
	// ------------------INTERIOR----------------------
	// left shelves
    bookshelf = walls.create(width / 2 - 297, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(0, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
    bookshelf = walls.create(width / 2 - 232, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(0, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
    bookshelf = walls.create(width / 2 - 105, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(0, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
	// right shelves
    bookshelf = walls.create(width / 2 + 297, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(1, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
    bookshelf = walls.create(width / 2 + 232, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(1, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
    bookshelf = walls.create(width / 2 + 105, height / 2 + 50, 'bookshelf');
	bookshelf.anchor.setTo(1, 0.5);
	bookshelf.scale.setTo(0.5, 0.5);
	bookshelf.body.immovable = true;
	
	// canvas
    canvas = walls.create(width / 2 + 105, height / 2 - 250, 'canvas');
	canvas.anchor.setTo(0.5, 0);
	canvas.scale.setTo(0.4, 0.4)
	canvas.body.immovable = true;
    canvas = walls.create(width / 2 - 105, height / 2 - 250, 'canvas');
	canvas.anchor.setTo(0.5, 0);
	canvas.scale.setTo(0.4, 0.4)
	canvas.body.immovable = true;
	
	// door
	door = createDoor(width / 2 - 50, height / 2 + 200, width / 2, height / 2 + 250, 'floor', doors);
	door.body.onCollide = new Phaser.Signal();
	door.body.onCollide.add(() => { game.state.start('world'); }, this);
	door = createDoor(width / 2, height / 2 + 200, width / 2 + 50, height / 2 + 250, 'floor', doors);
	door.body.onCollide = new Phaser.Signal();
	door.body.onCollide.add(() => { game.state.start('world'); }, this);
	game.world.bringToTop(doors);
	
    game.physics.arcade.enable(walls);
}

// the second, harder house
function createHardHouse(game) {
	// tiles
	for(var i = width / 2 - 350; i < width / 2 + 350; i += 50){
		for(var j = height / 2 - 250; j < height / 2 + 250; j += 50){
			if(!(i < width / 2 && j > height / 2 - 10)){
				floor = game.add.image(i, j, "floor");
				floor.scale.setTo(50/260, 50/260);
			}
		}
	}
	
	for(var i = height / 2 - 250; i < height / 2 + 250; i += 50){
		if(i < height / 2){
			tile = game.add.image(width / 2 - 350, i, "wall");
			tile.scale.setTo(50/490, 50/490);
			tile.anchor.setTo(1, 0);
		}
		else{
			tile = game.add.image(width / 2, i, "wall");
			tile.scale.setTo(50/490, 50/490);
			tile.anchor.setTo(1, 0);
		}
	}
	for(var i = height / 2 - 250; i < height / 2 + 250; i += 50){
		tile = game.add.image(width / 2 + 350, i, "wall");
		tile.scale.setTo(50/490, 50/490);
	}
	for(var i = width / 2 - 400; i < width / 2 + 400; i += 50){
		tile = game.add.image(i, height / 2 - 250, "wall");
		tile.scale.setTo(50/490, 50/490);
		tile.anchor.setTo(0, 1);
	}
	for(var i = width / 2 - 400; i < width / 2 + 400; i += 50){
		if(i >= width / 2 - 50){
			tile = game.add.image(i, height / 2 + 250, "wall");
			tile.scale.setTo(50/490, 50/490);
		}
		else {
			tile = game.add.image(i, height / 2, "wall");
			tile.scale.setTo(50/490, 50/490);
		}
	}
	
	// add walls
	walls = game.add.physicsGroup();
	walls.enableBody = true;
	// upper left
	wall = walls.create(width / 2 - 350, height / 2 - 250);
	wall.scale.setTo(0.0000000001, 250/32);
	wall.body.immovable = true;
	// leftmost down
	wall = walls.create(width / 2 - 350 - 10, height / 2);
	wall.scale.setTo(350/32, 0.0000000001);
	wall.body.immovable = true;
	// lower left
	wall = walls.create(width / 2, height / 2);
	wall.scale.setTo(0.0000000001, 250/32);
	wall.body.immovable = true;
	// rightmost down
	wall = walls.create(width / 2, height / 2 + 250);
	wall.scale.setTo(350/32, 0.0000000001);
	wall.body.immovable = true;
	// rigth
	wall = walls.create(width / 2 + 350, height / 2 - 250);
	wall.scale.setTo(0.0000000001, 500/32);
	wall.body.immovable = true;
	// up
	wall = walls.create(width / 2 - 350, height / 2 - 250);
	wall.scale.setTo(700/32, 0.0000000001);
	wall.body.immovable = true;
    game.physics.arcade.enable(walls);
	
	// door
	door = createDoor(width / 2 + 150, height / 2 + 250, width / 2 + 200, height / 2 + 300, 'floor', doors);
	door.body.onCollide = new Phaser.Signal();
	door.body.onCollide.add(() => { game.state.start('world'); }, this);
	game.world.bringToTop(doors);
	
	// interior
	sofa = game.add.image(width / 2 + 146, height / 2 - 250, 'sofa');
	sofa.scale.setTo(120/sofa.width, 70/sofa.height);
	sofa = game.add.image(width / 2 + 230, height / 2 - 250, 'sofa');
	sofa.scale.setTo(-120/sofa.width, 70/sofa.height);
	sofa.anchor.setTo(1, 0);
	sofa = game.add.image(width / 2 - 260, height / 2 - 250, 'sofa');
	sofa.scale.setTo(-120/sofa.width, 70/sofa.height);
	sofa.anchor.setTo(1, 0);
	sofa = game.add.image(width / 2 - 344, height / 2 - 250, 'sofa');
	sofa.scale.setTo(120/sofa.width, 70/sofa.height);
	
	rug = game.add.image(width / 2 + 80, height * 3 / 4 - 50, "rug");
	rug.scale.setTo(200/660, 100/430);
	hostage = game.add.image(width / 2 - 200, height / 2 - 100, "hostage");
	hostage.scale.setTo(-70/225, 70/225);
}

//npc - on collide touch=true izliza textbox i ako interactne otiva na bitka

//vrushtame na lastX i lastY