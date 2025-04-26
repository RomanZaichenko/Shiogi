import FigureState from './FigureState';

class PromotionState extends FigureState {
  checkPromotion(): boolean {
    return true;
  }
}

export default PromotionState;