import Component from '../../lib/Component';
import Coordinates from '../../lib/helpers/Coordinates';
import RenderingContext from '../../lib/RenderingContext';

import EffectsStore from '../store/EffectsStore';
import GridStore from '../store/GridStore';

export type GameOverEffectProps = {};

export default class GameOverEffect extends Component<GameOverEffectProps> {
  // Based on https://stackoverflow.com/a/6271865
  public render(context: RenderingContext): void {
    // Abbrechen, wenn der Effekt nicht aktiv ist
    const effectsStore = <EffectsStore>this.stores.effects;
    if (!effectsStore.directContent.gameOver.active) {
      return;
    }

    const effectData = effectsStore.directContent.gameOver;

    // Create a canvas that we will use as a mask
    const maskCanvas = document.createElement('canvas');
    // Ensure same dimensions
    maskCanvas.width = context.canvas.width;
    maskCanvas.height = context.canvas.height;
    const maskCtx = maskCanvas.getContext('2d');

    if (maskCtx) {
      // Gesamten Bildschirm Schwarz färben
      maskCtx.fillStyle = '#000';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

      // Maskierungsmodus festlegen
      maskCtx.globalCompositeOperation = 'xor';

      // Sichtbaren Bereich festlegen
      const distanceToCorner = Math.max(
        // Abstand nach links oben
        Math.sqrt(effectData.center.x ** 2 + effectData.center.y ** 2),
        // Abstand nach rechts oben
        Math.sqrt((1600 - effectData.center.x) ** 2 + effectData.center.y ** 2),
        // Abstand nach links unten
        Math.sqrt(effectData.center.x ** 2 + (1200 - effectData.center.y) ** 2),
        // Abstand nach rechts unten
        Math.sqrt((1600 - effectData.center.x) ** 2 + (1200 - effectData.center.y) ** 2)
      );

      const gridStore = <GridStore>this.stores.grid;
      const position: Coordinates = new Coordinates(
        gridStore.lastRemovedPlant.x * 128 + 64 + 288,
        gridStore.lastRemovedPlant.y * 128 + 64 + 176
      );

      // Kreis zeichnen
      maskCtx.arc(
        (position.x + context.parentX) * context.scaleFactor,
        (position.y + context.parentY) * context.scaleFactor,
        distanceToCorner * (1 - effectsStore.endAnimationProgress),
        0,
        2 * Math.PI
      );
      maskCtx.fill();

      // Overlay auf Hauptcanvas übertragen
      context.renderContext.drawImage(maskCanvas, 0, 0);
    }
  }
}
