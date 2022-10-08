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
  
  export default modalWindow;
  export {openModalWidow};
  export{closeWindow};