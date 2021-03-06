 // !Отправка формы
 let phoneFields = document.querySelector(".phone");
 let im = new Inputmask("+38 (099) 999-99-99");
 im.mask(phoneFields);

 new JustValidate('.form', {
     rules: {
         name: {
             required: true,
             minLength: 2
         },
         email: {
             required: true,
             email: true
         },
         phone: {
             required: true
         }
     },
     messages: {
         name: {
             required: "False",
             minLength: "Короткое имя"
         },
         email: {
             required: "False",
             email: "Не верю"
         },
         phone: {
             required: "False"
         }
     },
 
     submitHandler: function (form) {
         let xhr = new XMLHttpRequest();

         xhr.open("POST", "mail.php", true);

         let FormData = new FormData(form);

         xhr.addEventListener("load", function() {
             if( xhr.readyState === 4) {
                 switch (xhr.status) {
                     case 200:
                         console.log("Form send");
                         form.reset();
                        //  acceptWrap.classList.add('active');
                         break;
                     case 404:
                         console.log("Warning");
                         break;
                     default:
                     console.log("Error server");
                     break;
                 }
             }
         });

         xhr.send(FormData);
     },
 });


