import EventEmiter from '../EventEmiter/EventEmiter';

class OneControlView {
  private button;

  private slider;

  constructor(element) {
    this.init(element);
    this.addEventListeners();
  }


  private addEventListeners(): void {
    const slider = this.slider;
    const controlButton = slider.querySelector('.range-slider__control-button');

    slider.addEventListener('click', this.clickCoordinateOnSlider.bind(this));
    controlButton.addEventListener('mousedown', OneControlView.addDragbleClass);
    document.addEventListener('mouseup', this.removeDragbleClass.bind(this));
    document.addEventListener('mousemove', this.handlerMouseMove.bind(this));
  }

  public setCurrentCoordinate(currentCoordinate) {
    const slider = this.slider;
    const controlButton = slider.querySelector('.range-slider__control-button');

    controlButton.style.left = `${currentCoordinate - 10}px`;
  }

  private handlerMouseMove({ pageX }) {
    const { endCoordinate } = this.calcCoordinates.bind(this)(pageX);
    const { currentCoordinate } = this.calcCoordinates.bind(this)(pageX);
    const slider = this.slider;
    const controlButton = slider.querySelector('.range-slider__control-button');

    if (controlButton.classList.contains('js-range-slider__control-button_active')) {
      if (currentCoordinate >= 0 && currentCoordinate <= endCoordinate) {
        // controlButton.style.left = `${currentCoordinate - 10}px`;
        EventEmiter.emit('sendCurrentValue', currentCoordinate);
      }
    }
  }

  private static addDragbleClass({ target }) {
    const controlButton = target;

    controlButton.classList.add('js-range-slider__control-button_active');
  }

  private removeDragbleClass() {
    const slider = this.slider;
    const controlButton = slider.querySelector('.range-slider__control-button');

    controlButton.classList.remove('js-range-slider__control-button_active');
  }

  private clickCoordinateOnSlider({ pageX }) {
    const slider = this.slider;
    const controlButton = slider.querySelector('.range-slider__control-button');
    const currentCoordinateFunction = this.calcCoordinates.bind(this);
    const { currentCoordinate } = currentCoordinateFunction(pageX);

    controlButton.style.left = `${currentCoordinate - 10}px`;
  }

  private calcCoordinates(pageX): object {
    const slider = this.slider;
    const windowWidth: number = window.innerWidth;
    const sliderOffsetLeft: number = slider.offsetLeft;
    const sliderWidth: number = slider.clientWidth;
    const endCoordinate: number = windowWidth - (sliderOffsetLeft + (windowWidth
      - (sliderOffsetLeft + sliderWidth)));
    const currentCoordinate: number = pageX - sliderOffsetLeft;

    return { endCoordinate, currentCoordinate };
  }

  private createButton() {
    this.button = document.createElement('button');
    this.button.className = 'range-slider__control-button';
    this.button.type = 'button';

    return this.button;
  }

  private createWrapper() {
    this.slider = document.createElement('div');
    this.slider.className = 'range-slider';
    this.slider.appendChild(this.createButton());

    return this.slider;
  }

  private init(element): void {
    element.appendChild(this.createWrapper());
  }
}

export default OneControlView;
