// Get the modal element
const modal = document.querySelector('.c-modal');
console.log(modal);

// Get the button that opens the modal
const btn = document.getElementById('open-modal');
console.log(btn);

// Get the Button element that closes the modal
const closeBtn = document.querySelector('.c-modal__close');
console.log(closeBtn);

// When the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.classList.remove('c-modal--hidden')
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener('click', () => {
  console.log('clicked');
  modal.classList.add('c-modal--hidden');
});

// When the user clicks anywhere outside of the modal, close it
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('c-modal--hidden');
    }
})

// When the user press Esc

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.classList.add('c-modal--hidden');
  }
});
