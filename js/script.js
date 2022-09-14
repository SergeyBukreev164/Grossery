window.addEventListener('DOMContentLoaded', function()  {
    //Tabs
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
                };
            });
        }
    });
    //Timer
    const deadLine = "2022-06-25" //deadline

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
    };

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
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

    //ModalWindow

    const modalPush = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModalWidow () {
        modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
           // clearInterval(modalTimerId)
    };

    function closeWindow () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    
        
    };
        
    modalPush.forEach(btn => {
        btn.addEventListener('click', openModalWidow);
    }); 
    

    modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == "") {
                closeWindow();
            }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeWindow();
        }
    });
    const modalTimerId = setTimeout(openModalWidow, 50000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModalWidow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

            

    //  классы для карт

    // class addCardMenu {
    //     constructor(src, alt, subTitle, descr, cost, parentSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.subTitle = subTitle;
    //         this.descr = descr;
    //         this.cost = cost;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 10;
    //         this.changedPrice();
    //     }

    //     changedPrice() {
    //         this.cost = this.cost * this.transfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');
    //         if(this.classes.length === 0) {
    //             this.element = 'menu__item';
    //             element.classList.add(this.element);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className) );
    //         }
    //         element.innerHTML = `
            
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.subTitle}</h3>
    //             <div class="menu__item-descr">${this.descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 // <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
    //             </div>
    //         `;
    //     this.parent.append(element);
    //     }

    // }
    // создание карточек товара=======
                        

    
     const getResource = axios.get('http://localhost:3000/menu')
    .then(data => createCard(data))

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
        })
            
    }
     // ============создание карточек товара
    // Form======

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: '../icons/spinner.svg',
        sucsess: 'Спасибо, скоро с вами свяжемся',
        failure: 'что-то пошло не так'
    };

    forms.forEach(item => {
        BindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: data
        });
        return await res.json();
    };

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

           
            

//отправка дынных в формате json========
            // когда используется formdata вместе с httpRequest устанавливать заголовок ненадо, он делается автоматически
            // request.setRequestHeader('Content-type', 'aplication/json');
             
            const formData = new FormData(form);
            
          const json = JSON.stringify(Object.fromEntries(formData.entries()))  //entries возврашаем массив свойств объекта
                                                                                //fromEntries превращаем массив в объект
        
            
            postData('http://localhost:3000/requests', json)   //stringify превращает объект в jso
            .then(data => {
                console.log(data);
                showThanksModal(messages.sucsess);
                statusMessages.remove();
            }).catch(() => {
                showThanksModal(messages.failure); 
            }).finally(() => {
                form.reset();  // очистить введенные данные
            })
            
                //=======отправка дынных в формате json

            //const formData = new FormData(form);  
            // объект FormData для компилирования запроса ключ-значение, для работы
            //   в html <input> всегда указывать атрибут name
            //request.send(formData);


            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
                   
            //        // }, 2000);
            //     } else {
            //         showThanksModal(messages.failure); 
            //     }
            // })


        });
    }
    
    // ============Form
    //thanksmodal=======
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModalWidow();
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
            closeWindow();
        }, 4000)
    }       //========thanksmodal

    // JSON============
   //slider  ==========
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(result => console.log(result[1]));


   
    
    
});     

    

        
    
    
    

    


