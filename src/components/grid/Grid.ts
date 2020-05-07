import { Template } from '../../../lib/Types';
import Component from '../../../lib/Component';
import Coordinates from '../../../lib/helpers/Coordinates';
import GridRow, { GridRowProps } from './GridRow';

export type GridProps = {};

export default class Grid extends Component<GridProps> {
  protected template: Template = [
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 0),
      props: (): GridRowProps => ({
        index: 0
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128),
      props: (): GridRowProps => ({
        index: 1
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 2),
      props: (): GridRowProps => ({
        index: 2
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 3),
      props: (): GridRowProps => ({
        index: 3
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 4),
      props: (): GridRowProps => ({
        index: 4
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 5),
      props: (): GridRowProps => ({
        index: 5
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 6),
      props: (): GridRowProps => ({
        index: 6
      })
    },
    {
      component: new GridRow(),
      position: (): Coordinates => new Coordinates(0, 128 * 7),
      props: (): GridRowProps => ({
        index: 7
      })
    }
  ];
}