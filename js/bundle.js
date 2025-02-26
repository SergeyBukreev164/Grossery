/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator () {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {localStorage.setItem('sex', 'female');
        }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {localStorage.setItem('ratio', 1.375);
        } 
    
        function initLocalSeting (selector, activeClass) {
            const elem  = document.querySelectorAll(selector);
            elem.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }

                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }

    initLocalSeting('#gender div', 'calculating__choose-item_active');
    initLocalSeting('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent='Unresult';
            return;
        }
        
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 /height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 *height) - (5.7 * age)) * ratio);

        }
    }
    calcTotal();
    
    function getStaticInfomation (Selector, activeClass) {
        const elements = document.querySelectorAll(`${Selector}`); 
        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
                
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
            calcTotal();
        });

       
           
        });
    }
    getStaticInfomation('#gender div', 'calculating__choose-item_active');
    getStaticInfomation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

       
        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border ='1px solid red';
            } else {input.style.border ='none'; }
    
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                }
            calcTotal();
                    
                
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    const getResource = axios.get('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data) {
        data.data.forEach(({img, altimg, title,descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            const transfer = price * 30;
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    // <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${transfer}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
            
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalwindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalwindow */ "./js/modules/modalwindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const messages = {
        loading: '../icons/spinner.svg',
        sucsess: 'Спасибо, скоро с вами свяжемся',
        failure: 'что-то пошло не так'
    };

    forms.forEach(item => {
        BindPostData(item);
    });

   

     function BindPostData(form){
     form.addEventListener('submit', (e) => {
         e.preventDefault();          //отменить стандартное поведение браузера
         const statusMessages = document.createElement('img'); 
         statusMessages.src = messages.loading;
         statusMessages.style.cssText = `
             display: block;
             margin: 0 auto;
         `; //обращаемся к messages


         form.insertAdjacentElement('afterend', statusMessages ); // добавляем спинер после элемента       
         const formData = new FormData(form);

       const json = JSON.stringify(Object.fromEntries(formData.entries()));  //entries возврашаем массив свойств объекта
                                                                             //fromEntries превращаем массив в объект
    

         (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)   //stringify превращает объект в jso
         .then(data => {
             console.log(data);
             showThanksModal(messages.sucsess);
             statusMessages.remove();
         }).catch(() => {
             showThanksModal(messages.failure); 
         }).finally(() => {
             form.reset();  // очистить введенные данные
         });



     });
    }

      function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modalwindow__WEBPACK_IMPORTED_MODULE_1__.openModalWidow)('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>×</div>
                <div class='modal__title'>${message}</div>

            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modalwindow__WEBPACK_IMPORTED_MODULE_1__.closeWindow)('.modal');
        }, 4000);

    }
 
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modalwindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalwindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeWindow": () => (/* binding */ closeWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModalWidow": () => (/* binding */ openModalWidow)
/* harmony export */ });
function openModalWidow (modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if(modalTimerId) {
    clearInterval(modalTimerId);
  }
  
}

function closeWindow (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modalWindow(triggerSelector, modalSelector, modalTimerId) {
  const modalPush = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

   
     
   modalPush.forEach(btn => {
     btn.addEventListener('click', () => openModalWidow(modalSelector, modalTimerId));
   }); 
   
   
   modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == "") {
             closeWindow(modalSelector);
         }
   });
   
   document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeWindow(modalSelector);
     }
   });
   
   
   function showModalByScroll () {
     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
         openModalWidow(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
     }
   }
   
   window.addEventListener('scroll', showModalByScroll);
   
  
  }
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);
  
  

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({conteiner, slide, nextArrow, prevArrow, totalCount, currentCount, wrapper, field}) {
    const slider = document.querySelectorAll(slide),
    offerSlider = document.querySelector(conteiner),
    sliderPrev = document.querySelector(prevArrow),
    sliderNext = document.querySelector(nextArrow),
    total = document.querySelector(totalCount),
    current = document.querySelector(currentCount),
    slideWrapper = document.querySelector(wrapper),
    slideInner = document.querySelector(field),
    width = window.getComputedStyle(slideWrapper).width;
let slideIndex = 1,
   offset = 0;


if (slider.length < 10) {
   total.textContent = `0${slider.length}`;
  // current.textContent = `0${slideIndex}`;
} else {
   total.textContent = slider.length;
  // current.textContent = slideIndex;
}

slideInner.style.display = 'flex';
slideInner.style.width = (100 * slider.length) + '%';
slideInner.style.transition = '.5s all';
slideWrapper.style.overflow = 'hidden';

slider.forEach((slide) => {
   slide.style.width = width;
});

const dots = [];
offerSlider.style.position = 'relative';
const indicators = document.createElement('ol');
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `    
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
`;
offerSlider.append(indicators);

for (let i = 0; i < slider.length; i++) {
   const dot = document.createElement('li');
   dot.setAttribute('data-slide-to', i +1);
   dot.style.cssText = `
   box-sizing: content-box;
   flex: 0 1 auto;
   width: 30px;
   height: 6px;
   margin-right: 3px;
   margin-left: 3px;
   cursor: pointer;
   background-color: #fff;
   background-clip: padding-box;
   border-top: 10px solid transparent;
   border-bottom: 10px solid transparent;
   opacity: .5;
   transition: opacity .6s ease;
   `;
   indicators.append(dot);
   dots.push(dot);

   if (i == 0) {
       dot.style.opacity = '1';
   }
}

function removeFromWidth (str) {
   return +str.replace(/\D/g, '');
}

sliderNext.addEventListener('click', () => {
   if(offset == removeFromWidth(width) * (slider.length-1)) { //вычесляем длину и убираем 'px'
       offset = 0;
   } else {
       offset += removeFromWidth(width); // при клике вперед слайд смещается на определенную ширину
   }
   
   slideInner.style.transform = `translateX(-${offset}px)`;


   if (slideIndex == slider.length) {
       slideIndex = 1;
   } else {
       slideIndex ++;
   }

   if (slider.length < 10) {
       current.textContent = `0${slideIndex}`;
   } else {
       current.textContent =  slideIndex;
   }

   dots.forEach(dot => dot.style.opacity = '.5');
   dots[slideIndex - 1].style.opacity = '1';
});

sliderPrev.addEventListener('click', () => {
   if(offset == 0) { 
       offset = removeFromWidth(width) * (slider.length-1);
   } else {
       offset -= removeFromWidth(width); // при клике вперед слайд смещается на определенную ширину
   }

   slideInner.style.transform = `translateX(-${offset}px)`;

   if (slideIndex == 1) {
       slideIndex = slider.length;
   } else {
       slideIndex --;
   }
   if (slider.length < 10) {
       current.textContent = `0${slideIndex}`;
   } else {
       current.textContent =  slideIndex;
   }
   dots.forEach(dot => dot.style.opacity = '.5');
   dots[slideIndex - 1].style.opacity = '1';
});

dots.forEach(dot => {
   dot.addEventListener('click', (e) => {
       const slideTo = e.target.getAttribute('data-slide-to');
       slideIndex = slideTo;

       offset = removeFromWidth(width) * (slideTo-1);
       slideInner.style.transform = `translateX(-${offset}px)`;

       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';

       if (slider.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent =  slideIndex;
       }

   });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsPerent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsPerent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    const deadLine = "2022-06-25"; //deadline

    function getTimeRemaing(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor((t / (1000 * 60 * 60 ) % 24)),
             minutes = Math.floor((t / 1000 / 60) % 60),
             seconds = Math.floor((t / 1000) % 60);
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minuts = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock(); //вызываем для задержки
        function updateClock() {
            const t = getTimeRemaing(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //завершаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data
    });
    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modalwindow */ "./js/modules/modalwindow.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__.openModalWidow)('.modal', modalTimerId), 50000);
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
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


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map