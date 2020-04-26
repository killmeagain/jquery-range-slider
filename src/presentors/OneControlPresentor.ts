import EventEmiter from '../EventEmiter/EventEmiter';
import OneControlModel from '../models/oneControlModel';
import OneControlView from '../views/OneControlView';

// Типизируем конструктор Презентора
type ConstructorParams = {
  startValue: Number,
  endValue: Number,
  element: any,
}

class OneControlPresentor {
  private OneControlModel;

  private OneControlView;

  constructor(params: ConstructorParams) {
    const { startValue, endValue, element } = params;
    this.OneControlModel = new OneControlModel({ startValue, endValue });
    this.OneControlView = new OneControlView(element);

    EventEmiter.on('setCurrentValue', this.setCurrentValueCallback.bind(this));
    EventEmiter.on('sendCurrentValue', this.sendCurrentValueCallback.bind(this));
  }


  private sendCurrentValueCallback(currentValue) {
    this.OneControlModel.setCurrentValue(currentValue);
  }

  private setCurrentValueCallback(currentValue) {
    this.OneControlView.setCurrentCoordinate(currentValue);
  }
}

export default OneControlPresentor;
