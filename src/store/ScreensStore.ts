import Store from '../../lib/store/Store'


export enum Screens {
   Start,
   Game,
   Help,
   GameOver,
   Cosmetics
}

type ScreensStoreContent = {
   active: Screens,
   returnScreen: Screens | null,
}

export default class ScreensStore extends Store<ScreensStoreContent> {
   public constructor() {
      super('screens', {
         active: Screens.Start,
         returnScreen: null,
      })
   }

   public setScreen(newScreen: Screens): void {
      this.update((oldState: ScreensStoreContent) => ({
         ...oldState,
         active: newScreen,
      }))
   }

   public setReturnScreen(newScreen: Screens | null): void {
      this.update((oldState: ScreensStoreContent) => ({
         ...oldState,
         returnScreen: newScreen,
      }))
   }
}
