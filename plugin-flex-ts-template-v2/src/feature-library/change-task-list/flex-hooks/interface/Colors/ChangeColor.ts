import ColorState from './types';

export default class ChangeColor {
  state: ColorState = {
    color: '',
  };

  changeColor(newColor: string) {
    this.state.color = newColor;
  }

  getColor(): string {
    return this.state.color;
  }
}
