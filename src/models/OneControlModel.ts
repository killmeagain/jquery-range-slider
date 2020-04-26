import EventEmiter from '../EventEmiter/EventEmiter';

// Типизация State
type State = {
  startValue: Number,
  endValue: Number,
  currentValue: Number,
}
// Типизация параметров, входящих в конструктор
type ConstructorParams = {
  startValue: Number,
  endValue: Number,
}

class OneControlModel {
  // State приложения
  private state: State;

  // В конструкторе инциализируем данные
  constructor(params: ConstructorParams) {
    this.state = {
      ...params,
      currentValue: 0,
    };
  }

  // Публичный метод для чтения State приложения
  public getState(): State {
    return { ...this.state };
  }

  // Публичный метод для изменения текущего значения ползунка
  public setCurrentValue(currentValue: Number): void {
    this.state = { ...this.state, currentValue };
    EventEmiter.emit('setCurrentValue', this.state.currentValue);
  }
}

export default OneControlModel;
