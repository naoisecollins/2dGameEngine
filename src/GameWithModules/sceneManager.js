// SceneManager.js

export default class SceneManager {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.scenes = {};
      this.currentScene = null;
    }
  
    addScene(name, scene) {
      this.scenes[name] = scene;
    }
  
    setCurrentScene(name) {
      const scene = this.scenes[name];
      if (scene) {
        if (this.currentScene) {
          this.currentScene.end();
        }
        this.currentScene = scene;
        this.currentScene.start();
      }
    }
  
    update(deltaTime) {
      if (this.currentScene) {
        this.currentScene.update(deltaTime);
        this.currentScene.draw(this.ctx);
      }
    }
  }
  
  