var App = (function (window, document, undefined) {

  'use strict';

  var SETTINGS = {
    welcome: 'ola _)\_'
  };

  var st = {
    triggerAlert: '.js-alert',
  };

  var dom = {};

  var catchDom = function () {
    dom.$triggerAlert = $(st.triggerAlert);
  };

  var susbscribeEvents = function () {
    dom.$triggerAlert.on('click', events.alertMessage);
  };

  var events = {
    alertMessage: function () {
      console.log(SETTINGS.welcome);
    }
  };

  var fn = {};

  var init = function () {
    catchDom();
    susbscribeEvents();
  };

  return {
    init: init
  };

}(window, document));

$(document).ready(function () {
  // Animations
  AOS.init();

  $('.technologies__card--more-flip').hover(
    function () { $('.flip-more-container').addClass('active') },
    function () { $('.flip-more-container').removeClass('active') }
  );

  // Cache selectors
  var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 1000, 'swing');
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
  });

  $('.home').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1000, 'swing');
    $('.babel-list__item--menu a').each(function () {
      $(this).removeClass('active');
    });
  });

  $(function () {
    $('.scrollfire').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 'px'
      }, 1000, 'swing');
      $('.babel-list__item--menu a').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
    });

    if (window.location.hash) {
      $('html, body').animate({
        scrollTop: $(window.location.hash).offset().top + 'px'
      }, 1000, 'swing');
    }

  });

  //draw svg
  // Get the id of the <path> element and the length of <path>
  var myline = document.getElementById("myline");
  var length = myline.getTotalLength();
  circle = document.getElementById("circle");
  circle2 = document.getElementById("circle2");
  // The start position of the drawing
  myline.style.strokeDasharray = length;

  // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
  // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
  window.addEventListener("scroll", startDraw);

  function startDraw() {
    // What % down is it?
    var goal = document.getElementById("goal");

    var scrollpercent = (document.documentElement.scrollTop + 150) / (goal.offsetTop);
    // Length to offset the dashes
    var draw = length * scrollpercent;
    // Reverse the drawing (when scrolling upwards)
    myline.style.strokeDashoffset = length - draw;

    //get point at length
    endPoint = myline.getPointAtLength(draw);
    //circle.setAttribute("cx", endPoint.x);
    //circle.setAttribute("cy", endPoint.y);
    //circle2.setAttribute("cx", endPoint.x);
    //circle2.setAttribute("cy", endPoint.y);

  }

  $(".point").hover(function () {
    var message = $(this).attr("data-message")
    var pointPosition = $(this).position();
    $(".mouse-tooltip" + '.' + message + ':not(.message-two)').stop().addClass('active').css({
      left: pointPosition.left + 40,
      top: pointPosition.top - $(this).height()
    });
  }, function () {
    $(".mouse-tooltip").stop().removeClass('active');
  });

  $(".point[data-message=message-two]").hover(function () {
    var message = $(this).attr("data-message")
    var pointPosition = $(this).position();
    $(".mouse-tooltip.message-two").stop().addClass('active').css({
      left: pointPosition.left - 220,
      top: pointPosition.top - $(this).height()
    });
  }, function () {
    $(".mouse-tooltip").stop().removeClass('active');
  });

  const waypoints = [
    {
      id: 'video',
      handler(direction) { console.log('Video'); }
    },
    {
      id: 'questions',
      handler(direction) { console.log('Questions'); }
    },
    {
      id: 'gallery',
      handler(direction) { console.log('Gallery'); }
    },
    {
      id: 'technologies',
      handler(direction) { console.log('Technologies'); }
    },
    {
      id: 'offices',
      handler(direction) { console.log('Offices'); }
    },
    {
      id: 'contact',
      handler(direction) { console.log('Contact'); }
    }
  ];


  var waypoint = new Waypoint({
    element: document.getElementById('gallery'),
    handler: function () {
      $('.gallery').masonry({
        itemSelector: '.gallery__card',
        columnWidth: '.gallery-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
      });
      $('.gallery__card').each(function(i){
        var card = $(this);
        setTimeout(function() {
          card.addClass('animated fadeInRight');
        }, 500*i);
      });
    },
    offset: 500
  })

  $(window).resize(function(){
    $('.gallery__card').css({'transition-property':'none', 'opacity':'1', 'transition-duration':'0'});
    $('.gallery__card').removeClass('animated fadeInRight');
  });

  var waypoint = new Waypoint({
    element: document.getElementById('section-video'),
    handler: function () {
      $('.video__btn-video').addClass('animated fadeInUp');
      $('.line-container').css('pointer-events', 'none');
    },
    offset: 500
  })

  var waypoint = new Waypoint({
    element: document.getElementById('questions'),
    handler: function () {
      $('.line-container').css('pointer-events', 'all');
    },
    offset: 500
  })

  var waypoint = new Waypoint({
    element: document.getElementById('technologies'),
    handler: function () {
      $('.technologies').addClass('animated fadeInUp');
    },
    offset: 300
  })

  var waypoint = new Waypoint({
    element: document.getElementById('partners'),
    handler: function () {
      $('.partners').addClass('animated fadeInUp');
    },
    offset: 400
  })

  var waypoint = new Waypoint({
    element: document.getElementById('offices'),
    handler: function () {
      $('.offices').addClass('animated fadeInUp');
    },
    offset: 300
  })

  var waypoint = new Waypoint({
    element: document.getElementById('contact'),
    handler: function () {
      $('.contact').addClass('animated fadeInUp');
    },
    offset: 94
  })

  $(function () {
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = 'https://www.youtube.com/embed/Fll0cUt0imU?autoplay=1&showinfo=0';
    
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#videoModal").on('hide.bs.modal', function(){
        $("#frameVideo").attr('src', '');
        $("#frameFalse").attr('src', 'https://www.youtube.com/embed/Fll0cUt0imU');
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#videoModal").on('show.bs.modal', function(){
        $("#frameVideo").attr('src', url);
        setTimeout(function() {
          $("#frameFalse").attr('src', '');
        }, 500);
    });
    
  });

  $(".close-address").click(function () {
    $(this).parent().addClass("no-visible");
  });

  $(".btn-office").each(function () {
    $(this).click(function () {
      $(".btn-office").removeClass('active');
      if ($(this).hasClass('.active')) {
        $(this).removeClass('active');
      }
      else {
        $(this).addClass('active');
      }
    });
  });

  /* var carruselInicio = $(".carrusel-inicio");

  carruselInicio.owlCarousel({
    items: 4,
    navSpeed: 300,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 900,
    nav: true,
    mouseDrag: false,
    navText: ["<i class='northgate-icon northgate-icon-Arrow-Left-short'>", "<i class='northgate-icon northgate-icon-Arrow-Right-short'>"],
    center: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        autoplay: false,
        stagePadding: 32
      },
      768: {
        items: 1,
        nav: false,
        dots: true,
        loop: false,
        autoplay: false,
        stagePadding: 32
      },
      1025: {
        items: 4,
        nav: true,
        dots: false,
        loop: false,
        stagePadding: 0,
        autoplay: false
      }
    }
  }); */

});

