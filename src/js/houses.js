function createDoor(x1Cord, y1Cord, x2Cord, y2Cord, texture, group) {
    door = group.create(x1Cord, y1Cord, texture);
    door.scale.setTo((x2Cord - x1Cord) / door.width, (y2Cord - y1Cord) / door.height);
    door.body.immovable = true;
    return door;
}


//edna promenliva string da pishe imeto i switch za logikata

//mnogo promenlivi i po tqh da se pravi nivoto