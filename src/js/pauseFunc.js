var pause = false;
function pauseAndUnpause() {
    if(!pause) {
        pauseButton.loadTexture('play', 0);
        pause = true;
	}
    else {
        pauseButton.loadTexture('pause', 0);
        pause = false;
	}
}