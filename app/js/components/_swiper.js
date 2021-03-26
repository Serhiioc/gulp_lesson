// ! Gallery slider
let mySwiper1 = new Swiper('.gallery__container', {
    slidesPerView: 2,
    slidesPerColumnFill: 'row',
    slidesPerColumn: 2,
    spaceBetween: 25,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.swip__button--next',
      prevEl: '.swip__button--prev',
    },

    breakpoints: {
      500: {
        slidesPerView: 4,
        spaceBetween: 30,
      },

      600: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    }
});

  // ! project swiper
let mySwiper2 = new Swiper('.swiper-container', {
  slidesPerColumnFill: 'row',
  slidesPerColumn: 3,
  spaceBetween: 60,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swip__button--next',
    prevEl: '.swip__button--prev',
  },
});

//  ! certificate swiper
let mySwiper3 = new Swiper('.certificates__container', {
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swip__button--next',
    prevEl: '.swip__button--prev',
  },
  breakpoints: {
    400: {
      slidesPerView: 2,
      spaceBetween: 40,
    },

    600: {
      slidesPerView: 3,
      spaceBetween: 75,
    },
  }
});

// ! main page slider
let mySwiper4 = new Swiper('.banner__swiper', {
  effect : 'flip',
  delay: 2000,
  slidesPerView: 1,
  pagination: {
    el: '.banner__pages',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swip__button--next',
    prevEl: '.swip__button--prev',
  },
});

// ! add "0" before pagination

function checkSlide(elem) {
  if(elem.innerText < 10) {
    elem.classList.add("add-zero");
  } 
  else  {
    elem.classList.remove("add-zero");
  }
};


const btnPrev = document.querySelector(".swip__button--prev"),
      btnNext = document.querySelector(".swip__button--next");


let numSlide = document.querySelector(".swiper-pagination-current"),
    numTotal = document.querySelector(".swiper-pagination-total");



if (numSlide) {
  checkSlide(numSlide);
  checkSlide(numTotal);

  btnPrev.addEventListener("click", function() {
    if(numSlide.innerText < 10) {
      numSlide.classList.add("add-zero");
    } 
    else  {
      numSlide.classList.remove("add-zero");
    }
  });

  btnNext.addEventListener("click", function() {
    if(numSlide.innerText < 10) {
      numSlide.classList.add("add-zero");
    } 
    else  {
      numSlide.classList.remove("add-zero");
    }
  });

  mySwiper1.on('slideChange', function () {
    if(numSlide.innerText < 10) {
      numSlide.classList.add("add-zero");
    } 
    else  {
      numSlide.classList.remove("add-zero");
    }
  });
};