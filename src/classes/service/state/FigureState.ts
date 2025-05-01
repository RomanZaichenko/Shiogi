import Figure from "../../Figure.ts";

abstract class FigureState {
  protected figure: Figure | undefined;

  public setFigure(figure: Figure): void {
    this.figure = figure;
  }

  abstract checkPromotion() : boolean;

}

export default FigureState;