// Get the modal element
const modal = document.querySelector('.c-modal');

// Get the button that opens the modal
const btn = document.getElementById('open-modal');

// Get the Button element that closes the modal
const closeBtn = document.querySelector('.c-modal__close');

// When the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.classList.remove('c-modal--hidden');
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
});

// When the user press Esc

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.classList.add('c-modal--hidden');
  }
});

// Get the slides
const slides = document.querySelectorAll('.c-slider__slide');
const arrowLeft = document.querySelector('.c-slider__arrow--left');
const arrowRight = document.querySelector('.c-slider__arrow--right');
const img = document.querySelector('.c-profile__img');
const profileName = document.querySelector('.c-profile__name');
const description = document.querySelector('.c-slider__desc');
const cards = document.querySelectorAll('.c-profile__card')

// Get the current slide index
function arrows(currentIndex) {
    arrowRight.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        console.log('right');
        currentIndex++;
        updateSlide(currentIndex);
        updateBullets(currentIndex);
      }
    });
    arrowLeft.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlide(currentIndex);
        updateBullets(currentIndex);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' && currentIndex < slides.length - 1) {
        console.log('right');
        currentIndex++;
        updateSlide(currentIndex);
        updateBullets(currentIndex);
      }
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateSlide(currentIndex);
        updateBullets(currentIndex);
      }
    });
  }

function setSlidesDataIndex() {
  slides.forEach((slide, index) => {
    slide.setAttribute('data-index', index);
  });
}

setSlidesDataIndex()

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        setCurrentSlideIndex(index)
        updateBullets(index)
        arrows(index)
        modal.classList.remove('c-modal--hidden');
    })
})

function updateSlide(i) {
  slides.forEach((slide, index) => {
    slide.setAttribute('data-index', index);
    if (index === i) {
      slide.classList.add('c-slider__active');
      slide.setAttribute('aria-hidden', 'false');
      img.setAttribute('tabindex', '0');
      profileName.setAttribute('tabindex', '0');
      description.setAttribute('tabindex', '0');
      trapTabKey(slide)
    } else {
      slide.classList.remove('c-slider__active');
      slide.setAttribute('aria-hidden', 'true');
      img.setAttribute('tabindex', '-1');
      profileName.setAttribute('tabindex', '-1');
      description.setAttribute('tabindex', '-1');
    }
  });
}

const pagination = document.querySelector('.c-slider__pagination');
function createPaginationBullets() {
  for (let i = 0; i < slides.length; i++) {
    const bullet = document.createElement('button');
    bullet.classList.add('c-slider__pagination-bullet');
    bullet.dataset.index = i;
    bullet.setAttribute('aria-selected', 'false');
    bullet.setAttribute('tabindex', '0');
    bullet.addEventListener('click', () => {
       updateSlide(parseInt(bullet.dataset.index))
       updateBullets(parseInt(bullet.dataset.index))
    });
    bullet.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === 'Space') {
        updateSlide(parseInt(bullet.dataset.index))
        updateBullets(parseInt(bullet.dataset.index))
      }
    });
    pagination.appendChild(bullet);
  }
}
if (pagination) {
  createPaginationBullets();
  addAriaLabelToBulletPoints()
}
function addAriaLabelToBulletPoints () {
    const profileNames = document.querySelectorAll('.c-profile__name');
    const bullets = document.querySelectorAll('.c-slider__pagination-bullet');
    bullets.forEach((bullet, index) => {
        bullet.setAttribute('aria-label', `Go to ${profileNames[index].innerText} profile`);
    })
}
function updateBullets(index) {
    const bullets = document.querySelectorAll('.c-slider__pagination-bullet');
    bullets.forEach((bullet, i) => {
      if (i === index) {
        bullet.classList.add('c-slider__pagination-bullet--active');
        bullet.setAttribute('aria-selected', 'true');
      } else {
        bullet.classList.remove('c-slider__pagination-bullet--active');
        bullet.setAttribute('aria-selected', 'false');
      }
    });
  }
function setCurrentSlideIndex(index) {
    slides.forEach((slide) => {
        const dataIndex = parseInt(slide.dataset.index)
        if (dataIndex !== index) {
            slide.classList.remove('c-slider__active')
        } else {
            slide.classList.add('c-slider__active')
        }
    })
}

function trapTabKey(slide) {
    const focusableActiveSlideEls = slide.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
    const focusableSlideElements = modal.querySelectorAll('button')
    const focusableContent = [...focusableActiveSlideEls, ...focusableSlideElements]
    focusableContent.forEach(el => {
        el.setAttribute('tabindex', '0')
        el.addEventListener('focus', (e) => { 
            console.log(e)
        })
    })

    const firstFocusableEl = focusableContent[0];
    const lastFocusableEl = focusableContent[focusableContent.length - 1];
    console.log('fist focusable', firstFocusableEl)
    console.log('last focusable', lastFocusableEl)
    console.log('activeElement', document.activeElement)
    console.log(focusableContent)
  
    slide.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
    firstFocusableEl.focus();
  }