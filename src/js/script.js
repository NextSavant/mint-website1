import $ from 'jquery';
import 'bootstrap';


$(document).ready(function () {
    var $navbar = $('#navbar');
    var $intro = $('#intro');
    var $window = $(window);
    var $body = $(document.body);
    // final computed width of #words because $(#words).width() doesnt work for some reason.
    var wordsWidth = 579.618; // i guess width() doesnt compute the last possible value when it loads
    var wordsHeight = 249.722; // final computed height of #words, not used


    function animateScroll(scrollTop, duration = 800, callback) {
        $('html, body').stop().animate({
            scrollTop: scrollTop
        }, 800, callback);
    }

    function historyState(value) {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.history.replaceState
            && history.replaceState(null, null, value);
    }

    function scaleWords() {
        var width = $window.width();
        var height = $window.height();
        var scale;

        if (width < height) {
            if (width <= wordsWidth) {
                scale = width / wordsWidth;
                $('#words').css({ 'transform': `translate(-50%, -50%) scale(${scale}) ` });
            }
        }
    }

    
    $window
    .on('load', function (e) {
        // scale #words to screen
        scaleWords();
        $body.addClass('animate');
    })
    .on('resize', function () {

        scaleWords();

        var hash = location.hash;
        if (hash) {
            animateScroll($(hash).offset().top, 300);
        }
    })
    .on('scroll', function () {
        var scroll = $window.scrollTop();

        if (scroll >= $intro.outerHeight()) {
            $navbar.removeClass('on-intro');
        } else {
            $navbar.addClass('on-intro');
            historyState('#intro');
        }

    })
    .on('activate.bs.scrollspy', function (e, obj) {
        var hash = obj.relatedTarget
        historyState(hash);
        console.log(obj);
        
    })
    .trigger('scroll');

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            animateScroll($(hash).offset().top, 700);
        } // End if
    });
   
});