
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
     * No images drag
    /* ---------------------------------------------- */

    $("img, a").on("dragstart", function(event) {
    event.preventDefault();
    });

