import { EventTypes } from './Enums';
import Component from './Component';
import Coordinates from './helpers/Coordinates';
import Dimensions from './helpers/Dimensions';
import FPSDisplay from './FPSDisplay';
import RenderingContext from './RenderingContext';

type CanvasConfig = {
  el: HTMLCanvasElement;
  grid: Dimensions;
  root: Component<any>;
  showFPS: boolean;
};

class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private aspectRatio: number;
  private root: Component<any>;
  private scaleFactor: number;
  private grid: Dimensions;
  private showFPS?: boolean;

  private fpsDisplay: FPSDisplay;

  private lastFrameOn: number;
  private frameStart: number;

  public constructor(config: CanvasConfig) {
    this.scaleFactor = 1;

    this.canvas = config.el;
    this.aspectRatio = config.grid.width / config.grid.height;
    this.root = config.root;
    this.grid = config.grid;
    this.showFPS = config.showFPS || false;

    this.fpsDisplay = new FPSDisplay();

    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.lastFrameOn = Date.now();
    this.frameStart = Date.now();
    this.render();

    window.addEventListener('resize', () => {
      // Gerenderte Auflösung anpassen, wenn sich die Fenstergröße ändert
      this.adjustToScreen();
    });

    this.canvas.addEventListener('click', event => {
      this.root.propagateEvent(EventTypes.Click, event);
    });

    window.addEventListener('keypress', event => {
      this.root.propagateEvent(EventTypes.Keypress, event);
    });

    window.addEventListener('keydown', event => {
      this.root.propagateEvent(EventTypes.Keydown, event);
    });

    window.addEventListener('keyup', event => {
      this.root.propagateEvent(EventTypes.Keyup, event);
    });
  }

  private adjustToScreen(): void {
    const scaleFactor = 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio * scaleFactor;
    this.canvas.height = rect.width * (1 / this.aspectRatio) * window.devicePixelRatio * scaleFactor;
    this.scaleFactor = (rect.width / this.grid.width) * window.devicePixelRatio * scaleFactor;
  }

  private render(): void {
    this.frameStart = Date.now();
    const timeDifference = this.frameStart - this.lastFrameOn;
    this.lastFrameOn = this.frameStart;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.root.render(
      new RenderingContext(
        this.grid,
        0,
        0,
        this.canvas,
        this.context,
        this.scaleFactor,
        timeDifference,
        this.frameStart
      ),
      new Coordinates(0, 0),
      {}
    );

    if (this.showFPS) {
      this.fpsDisplay.render(this.canvas, this.context, timeDifference, this.scaleFactor);
    }

    const requestAnimationFrame =
      window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

    requestAnimationFrame(this.render.bind(this));
  }
}

export default Canvas;
