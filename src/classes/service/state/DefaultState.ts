import FigureState from './FigureState';

class DefaultState extends FigureState {
  checkPromotion(): boolean {
    return false;
  }
}

export default DefaultState;