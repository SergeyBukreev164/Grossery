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

export default slider;