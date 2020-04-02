import Component from '../../../lib/Component';
import { Template } from '../../../lib/Types';
import Coordinates from '../../../lib/helpers/Coordinates';
import Text, { TextProps } from '../../../lib/components/native/Text';
import Character, { CharacterProps } from '../character/Character';
import { Directions } from '../../../lib/Enums';
import PropsContext from '../../../lib/PropsContext';

import Tomato, { TomatoProps } from '../plants/Tomato';

export type Instructions2Props = {};

export default class Instructions2 extends Component<Instructions2Props> {
  private timer = 0;

  onTick(ctx: PropsContext<Instructions2>, timeDifference: number): void {
    this.timer += timeDifference;
  }

  private get showPlant(): boolean {
    return this.timer % 2000 > 1000;
  }

  protected template: Template = [
    {
      component: new Tomato(),
      position: (): Coordinates => new Coordinates(200, 100),
      props: (): TomatoProps => ({
        age: 0
      }),
      show: (): boolean => this.showPlant
    },
    {
      component: new Character(),
      position: (): Coordinates => new Coordinates(125, 0),
      props: (): CharacterProps => ({
        direction: Directions.Right
      })
    },
    {
      component: new Text(),
      position: (): Coordinates => new Coordinates(0, 0),
      props: (): TextProps => ({
        text: 'Press V to plant a crop',
        color: '#fff'
      })
    }
  ];
}