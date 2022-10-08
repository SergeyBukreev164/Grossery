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
    

         postData('http://localhost:3000/requests', json)   //stringify превращает объект в jso
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
        openModalWidow('.modal', modalTimerId);
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
            closeWindow('.modal');
        }, 4000);

    }
 
}

import { openModalWidow, closeWindow } from "./modalwindow";
import {postData} from '../services/services';
export default forms;