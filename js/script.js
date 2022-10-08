import calculator  from './modules/calculator';
import cards  from './modules/cards';
import modalWindow  from './modules/modalwindow';
import forms  from './modules/forms';
import slider  from './modules/slider';
import tabs  from './modules/tabs';
import timer  from './modules/timer';
import {openModalWidow} from './modules/modalwindow';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModalWidow('.modal', modalTimerId), 50000);
    calculator();
    cards();
    modalWindow('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    tabs();
    timer();
    slider({
        conteiner: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCount: '#total',
        currentCount: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });

});     

