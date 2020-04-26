
import './scss/main.scss';
import OneControlPresentor from './presentors/OneControlPresentor';

const element = document.querySelector('div');

const presentor = new OneControlPresentor({ element, startValue: 0, endValue: 50 });

console.log(presentor);