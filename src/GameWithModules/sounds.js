// sound.js

class Sound {
    constructor() {
      this.sounds = {};
      this.loadSounds();
    }
  
    loadSounds() {
      // Load all the sound files into the sounds object
      this.sounds["collect"] = new Audio("./resources/collect.wav");
      this.sounds["gameover"] = new Audio("gameover.wav");
      // Add more sound files as needed
    }
  
    play(soundName) {
      // Play the sound with the given name
      if (this.sounds[soundName]) {
        this.sounds[soundName].currentTime = 0;
        this.sounds[soundName].play();
      }
    }
  }
  
  export default Sound;
  