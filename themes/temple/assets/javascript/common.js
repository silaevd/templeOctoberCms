
  /* ---------------------------------------------- /*
   * Preloader
  /* ---------------------------------------------- */

  $('#status').fadeOut();
  $('#preloader').delay(300).fadeOut('slow');

  $(document).ready(function() {

    /* ---------------------------------------------- /*
     * Link Active
    /* ---------------------------------------------- */
    var link_active = function() {
      var path = window.location.pathname.split("/").pop(),
          link = $('nav a[href="'+ path +'"]');

      if (path == '' || path == 'undefined') {
        link = $('nav a[href="index.html"]');
      }

      link.addClass('menu__link_active');

    }; link_active();

    /* ---------------------------------------------- /*
     * Contacts
    /* ---------------------------------------------- */
    var contacts = function() {
      var $contacts = $('#contacts'),
          openBtn   = $('.contactsLink'),
          closeBtn  = $('.contacts__close'),
          $window   = $(window);

      openBtn.on('click', function(e) {
        e.preventDefault();
        $contacts.toggleClass('contacts_active');
        $(this).toggleClass('contactsLink_active');

      });

      closeBtn.on('click', function() {
        $contacts.toggleClass('contacts_active');
        openBtn.removeClass('contactsLink_active');
      });

      $window.scroll(function(){
        if ($(window).width() < 768) {
          return false;
        }
        if ( $window.scrollTop() > 1 && $contacts.hasClass('contacts_active')) {
          $contacts.removeClass('contacts_active');
          openBtn.removeClass('contactsLink_active');
        }
      });
    }; contacts();

    /* ---------------------------------------------- /*
     * Slider
    /* ---------------------------------------------- */
    $('.vision').slick({
      adaptiveHeight: true,
      autoplay: true,
      // arrows: false,
      dots: false
    });

    /* ---------------------------------------------- /*
     * Navbar
    /* ---------------------------------------------- */

    var $header = $('#header');
    var $window = $(window);

    $window.scroll(function(){
      if ($(window).width() < 480) {
        return false;
      }
      if ( $window.scrollTop() > 100) {
        $header.addClass("header_mini");
      } else {
        $header.removeClass("header_mini");
      }
    });

    /* ---------------------------------------------- /*
     * NavbarBtn
    /* ---------------------------------------------- */

    $('.menu__trigger').on('click', function() {
      if ($(window).width() < 1000) {
        var headerHeight = $('#header').height();
        $('.menu__links').css('top', headerHeight);
      }
      $('.menu__links').slideToggle();
    });

    var clsMenu = function() {
      if ($(window).width() < 1000) {
        $('.menu__link').on('click', function() {
          $('.menu__links').hide();
        });
      }
    }; clsMenu();

    /* ---------------------------------------------- /*
     * Events__popUp
    /* ---------------------------------------------- */

    $('.events__item').on('click', function() {
      var eventId = $(this).attr('data-id');

      $('#event' + eventId).bPopup({
        position: ['auto', 100]
      });
    });

    $('.eventModal__close').on('click', function () {
        var popup = $(this).parent().bPopup();
        popup.close();
    });

    /* ---------------------------------------------- /*
     * News__fullLink
    /* ---------------------------------------------- */

    $('.news__fullLink').on('click', function () {
      event.preventDefault();

      $(this).siblings('.news__text')
             .removeClass('news__text')
             .addClass('news__textFull');

      $(this).hide();
    });

    /* ---------------------------------------------- /*
     * Events__date
    /* ---------------------------------------------- */

    var month =           $('.events__month');

    month.each(function(){

      var monthText =       $(this).html();
      var monthTextShort =  monthText.slice(0, 4);
      var monthLength =     $(this).html().length;

      if (monthLength > 4) {
        $(this).html(monthTextShort);
      }
    });

    /* ---------------------------------------------- /*
     * Scroll to id
    /* ---------------------------------------------- */

    $('.navbar-nav>li>a').mPageScroll2id({
        scrollSpeed: 1400,
        scrollEasing: "easeOutQuint",
        offset: 49
      });

    /* ---------------------------------------------- /*
     * No images drag
    /* ---------------------------------------------- */

    $("img, a").on("dragstart", function(event) {
    event.preventDefault();
    });

    /* ---------------------------------------------- /*
     * E-mail submit and validation
    /* ---------------------------------------------- */

    var validate = {

        initialize: function() {
          this.modules();
          this.setUpListeners();
        },

        modules: function() {
          function validColor() {
            var val = $(this).val();
            if ( val.length > 0 ) {
              $(this).css('border-color', '#3D9970');
            } else {
              $(this).css('border-color', '#FF4136');
            }
          }
          $('.contacts__formInput').on('keydown ', validColor);
          $('.contacts__formInput').on('blur ', validColor);
        },

        setUpListeners: function () {
          $("#sentMessage").on('submit', validate.submitForm);
        },

        submitForm: function(e) {
          e.preventDefault();

          var form = $(this),
              submitBtn = form.find('button[type="submit"]');

          if( validate.validateform(form) === false ) {
            return false;
          }else {
            submitBtn.attr('disabled', 'disabled').addClass('disabled');
            $.ajax({
              type: "POST",
              url: "./mail.php",
              data: form.serialize()
            }).done(function() {
              console.log(form.serialize());
              $(submitBtn).notify("Ваше сообщение успешно отправленно!", {
                className: 'success',
                clickToHide: true,
                arrowShow: true,
                position: 'right middle'
              });
              setTimeout(function() {
                // Done Functions
                form.trigger("reset");
                submitBtn.removeAttr('disabled').removeClass('disabled');
              }, 1000);
            });
            return false;
          }

        },

        validateform: function(form) {
          var inputs = form.find('.contacts__formInput'),
              valid = true;

          $.each(inputs, function(index, val) {
            var input = $(val),
                val = input.val();

            if(val.length === 0){
              input.notify("поле обязательно для заполнения!", {
                className: 'error',
                clickToHide: true,
                arrowShow: true,
                position: 'top middle'
              });
              input.css('border-color', '#FF4136');
              valid = false;
            }
          });

          return valid;

        }

    };
    validate.initialize();

  });
