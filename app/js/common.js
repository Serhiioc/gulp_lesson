document.addEventListener("DOMContentLoaded", function() {
    @@include("components/_swiper.js");

          

// ! Active link in page
    let navLInk = document.querySelectorAll(".nav__link");

    navLInk.forEach(elem => {
        if (elem.href == location.href) {
            elem.classList.add("select");
            elem.removeAttribute('href') ;
        } else {
            elem.classList.remove("select");
        }
    });

    // ! modale form 
    let btnForm = document.querySelector(".contacts__button");
    let wrapForm = document.querySelector(".modale-wrap");
    let exitForm = document.querySelector(".form__exit");
   if(btnForm) {
       exitForm.addEventListener("click", function () {
           wrapForm.classList.remove('active');
       });
   };

    document.addEventListener("click", function(evt) {
        if (evt.target == wrapForm && wrapForm.classList.contains('active')) {
            wrapForm.classList.remove('active');
            document.querySelector("body").style.overflow = 'auto';
        } else if (evt.target == btnForm) {
            wrapForm.classList.add('active');
        }
    });

    if(wrapForm) {
        document.addEventListener("scroll", function () {
            if(wrapForm.classList.contains('active') && window.screen.availWidth > 450) {
                document.body.classList.add("no-scroll");
            }else {
                document.body.classList.remove("no-scroll");
            }
        });
    };
    
    // ! accept Window
   let acceptExit = document.querySelector(".accept__exit");
   let acceptWrap = document.querySelector(".wrap");

   if(acceptExit) {
       acceptExit.addEventListener("click", function () {
              acceptWrap.classList.remove("active");
              document.body.classList.remove("no-scroll");
        });
   };
   
// ! mobile menu
   let btnMenu = document.querySelector(".hamburger");
   let menu = document.querySelector(".mobile");

   btnMenu.addEventListener("click", function () {
        btnMenu.classList.toggle("is-active");
        menu.classList.toggle("mobile--active");
        document.body.classList.toggle("no-scroll"); 
       });
     
     

    @@include("components/_form.js");   

});