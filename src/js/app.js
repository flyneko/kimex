$.extend($.fancybox.defaults, {
    smallBtn: true,
    btnTpl: {
        smallBtn: '<button data-fancybox-close class="fancybox-button fancybox-button--close"><svg class="icon icon-x"><use xlink:href="assets/img/sprite.svg#icon-x"></use></svg></button>',
    },
    touch: false
});

$(function () {
    setTimeout(function() {
        $('body').addClass('is-inited');
    }, 100);

    $('[data-fancybox]').fancybox({
        afterShow: function() {
            const cardModalSlider = new Swiper('.slider--card-modal', {
                loop: true,
                navigation: {
                    nextEl: '.arrow-next',
                    prevEl: '.arrow-prev',
                },
                slidesPerView: 1,
            });
        },
    });

    $('.card-modal__buttons .card__like').on('click', function(){
        $(this).parent().toggleClass('card-modal__buttons--active')
    });

    // Header
    (function() {
        $('.select--language').select2({
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            dropdownCssClass: "select-dropdown__language",
        });
    
        $('.select--no-search').select2({
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            minimumResultsForSearch: -1,
            dropdownCssClass: "select-dropdown__no-search",
        });


        $('.header__search-input')
            .on('keyup', function(){
                $('.header__search-wrapper').addClass('header__search-wrapper--active')
            })
            .on('blur', function(){
                $('.header__search-wrapper').removeClass('header__search-wrapper--active')
            });
    })();
    

    // Catalog filters
    (function() {
        function formatStateDropdown (state) {
            if (!state.id) {
            return state.text;
            }
            var icon = "assets/img/sprite.svg#icon-check";
            var $state = $(
            '<span><svg class="icon icon-check"><use xlink:href="' + icon + '"></use></svg>' + state.text + '</span>'
            );
            return $state;
        };
    
        $('.select-filter--multiple').select2({
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            selectionCssClass: 'select-dropdown__filter--multiple-select',
            dropdownCssClass: "select-dropdown__filter--multiple",
            closeOnSelect: false,
            templateResult: formatStateDropdown,
        });
    
        $('.select-filter--multiple').on('change', function(){
            let selectedItemsLenght = $(this).select2('data').length
            selectedItemsLenght -= 1
            let needNumber = $(this).siblings('.page-filter__item-number')
    
            if (selectedItemsLenght === 0){
                needNumber.addClass('page-filter__item-number--hidden')
            } else{
                needNumber.removeClass('page-filter__item-number--hidden')
            }
            needNumber.text(selectedItemsLenght)
        });
    
        // Multiple choices
    
        function formatStateColor (state) {
        if (!state.id) {
            return state.text;
        }
    
        let optionText = state.text.slice(0, -8)
        let colorCode = state.text.slice(-8);
    
        var icon = "assets/img/sprite.svg#icon-check";
            var $state = $(
                '<span class="page-filter__select-option--color" style="background-color:' + colorCode + '"></span>' +
                '<span><svg class="icon icon-check"><use xlink:href="' + icon + '"></use></svg>' + optionText + '</span>'
            );
            return $state;
        };
    
        $('.select-color').select2({
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            selectionCssClass: 'select-dropdown__filter--multiple-select',
            dropdownCssClass: "select-dropdown__filter--multiple",
            closeOnSelect: false,
            templateResult: formatStateColor,
        });

        var inputFrom = $('.js-input-from');
        var inputTo = $('.js-input-to');
        var instance;
        var min = 0;
        var max = 135000;
        var from = 10000;
        var to = 125000;
    
        $('.filter-price__input').ionRangeSlider({
            onStart: updateInputs,
            onChange: updateInputs
        })
        instance = $('.filter-price__input').data("ionRangeSlider");
    
        function formatPriceView(value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    
        function updateInputs (data) {
            from = data.from;
            to = data.to;
            
            inputFrom.prop("value", formatPriceView(from) + ' ₸');
            inputTo.prop("value", formatPriceView(to) + ' ₸');	
        }
    
        inputFrom.on("input", function () {
            var val = $(this).prop("value");
            val = Number(val.slice(0, -2).split(' ').join(''))
            // validate
            if (val < min) {
                val = min;
            } else if (val > to) {
                val = to;
            }
            
            instance.update({
                from: val
            });
        });
    
        inputTo.on("input", function () {
            var val = $(this).prop("value");
            val = Number(val.slice(0, -2).split(' ').join(''))
            
            // validate
            if (val < from) {
                val = from;
            } else if (val > max) {
                val = max;
            }
            
            instance.update({
                to: val
            });
        });
    
    
        $('.filter-price__background').on('click', function(){
            $('.filter-price').removeClass('filter-price--open')
        });
    
        $('.page-filter__item').on('click', function(){
            if ($(this).hasClass('filter-price')){
                
            } else{
                $('.filter-price').removeClass('filter-price--open')
            }
        });
    
        $('.filter-price__select').on('click', function(){
            $('.filter-price').toggleClass('filter-price--open')
        });
    })();

    $("[data-src='#join-modal']").fancybox({
        'beforeLoad' : function(){
            $('body').addClass('modal--darker');
        },
        'afterClose': function() {
            $('body').removeClass('modal--darker');
        }
    });

    $("[data-src='#fast-view']").fancybox({
        'beforeShow' : function(){
            $('body').addClass('modal-center');
        },
        'afterClose': function() {
            $('body').removeClass('modal-center');
        }
    });

    $(".card-up__big .swiper-slide[data-src]").fancybox();

    $('.header__join a').on('click', function(e){
        e.preventDefault();
        let needHref = $(this).attr('id');

        $('.join-modal .tab--active').removeClass('tab--active active-line');
        $('.join-modal .tabs-content--active').removeClass('tabs-content--active');

        if (needHref === 'login-trigger'){
            $(`.join-modal .tab[href='#modal-login']`).addClass('tab--active active-line')
            $(`.join-modal .tabs-content[id='modal-login']`).addClass('tabs-content--active')
        } else{
            $(`.join-modal .tab[href='#modal-register']`).addClass('tab--active active-line')
            $(`.join-modal .tabs-content[id='modal-register']`).addClass('tabs-content--active')
        }
    });

    $('[data-phone-mask]').mask('+7 (000) 000-00-00', {placeholder: "+7 (__) ___-__-__"});

    $('.js-datepicker').datepicker({
        autoClose: true
    });

    $('.icon-password').on('click', function(e){
        e.preventDefault();
        let passParent = $(this).closest('label'),
            passInput = $(this).siblings('input');

        if (passInput.attr('type') === 'password'){
            passInput.attr('type', 'text')
        } else{
            passInput.attr('type', 'password')
        }
        passParent.toggleClass('label--show-password')
    });

    // Sliders
    (function() {
        const config = {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        };
    
        const defaultSlider = new Swiper('.default-slider', {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '#arrow-next--default',
                prevEl: '#arrow-prev--default',
            },
            slidesPerView: 5,
        });
    
    
        const instagram = new Swiper('.slider--instagram', {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
            },
            slidesPerView: 3,
        });
    
        const bigSlides = new Swiper('.slider--big-slides', {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
            },
            slidesPerView: 4,
        });
    
        const miniSlider = new Swiper('.slider--mini', {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '#arrow-next--mini',
                prevEl: '#arrow-prev--mini',
            },
            slidesPerView: 'auto',
        });
    
        const sliderAuto = new Swiper('.slider-auto', {
            loop: true,
            spaceBetween: 32,
            navigation: {
                nextEl: '.arrow-next--auto',
                prevEl: '.arrow-prev--auto',
            },
            slidesPerView: 'auto',
        });
    })();

    $('.tab').on('click', function(e) {
        e.preventDefault();

        $($(this).siblings()).removeClass('tab--active active-line');
        $($(this).closest('.tabs-wrapper').siblings().find('.tabs-content')).removeClass('tabs-content--active');

        $(this).addClass('tab--active active-line');
        $($(this).attr('href')).addClass('tabs-content--active');
    });


    // Accordeon
    (function() {
        $('.accordion-head').on('click', function(){
            $(this).parent().toggleClass('accordion-wrapper--active')
        });
    })();



    // Cart
    (function() {
        $('.card-cart__count button').on('click', function(){
            let currInput = $(this).siblings('.card-cart__count-input');
            let currValue = Number($(this).siblings('.card-cart__count-input').val())
            if ($(this).hasClass('card-cart__count--minus')){
                if (currValue === 1){
                    return false;
                }
                currInput.val(currValue - 1)
            } else{
                if (currValue === 100){
                    return false
                }
                currInput.val(currValue + 1)
            }
        })
    
        $('.card-cart__count-input').on('keyup', function(){
            if ($(this).val() > 100){
                $(this).val(100)
            }
        });
    
        $('.card-cart__bin').on('click', function(){
            $(this).closest('.card-cart').addClass('card-cart--hidden')
        });
    })();

    // Product card carousel
    (function() {
        var currClone = null
        function clonePagination(currSlider){
            let swiperPagination = $(currSlider.pagination.el)
            if (currClone !== null){
                $(currClone).remove()
            }
            currClone = swiperPagination.clone('true').addClass("swiper-pagination--clone").appendTo(swiperPagination.parent())
        };
    
        var currCardSlider = null
        $('.slider-card').on('mouseenter', function(){
            if ($(this).hasClass('swiper-container-initialized') === false){
                const sliderCard = new Swiper(this, {
                    init: true,
                    loop: true,
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    on: {
                        afterInit: function(){
                            clonePagination(this)
                        },
                        slideChange: function(){
                            clonePagination(this)
                        }
                    }
                });
                currCardSlider = sliderCard
            }
            $('.card .swiper-pagination-bullet').hover(function() {
                $(this).trigger( "click" );
            });
        })
        $('.slider-card').on('mouseleave', function(){
            $(this).find('.swiper-pagination--clone').remove()
            currCardSlider.destroy()
        });
    })();

    // Product
    (function() {
        $('.card__like').on('click', function(e){
            e.preventDefault();
            $(this).toggleClass('card__like--active')
        });
    
        $('.card__cart').on('click', function(e){
            e.preventDefault();
            $(this).toggleClass('card__cart--active')
        });


        const cardUpNavigation = new Swiper('.card-up__navigation', {
            navigation: {
                nextEl: '#card-up-navigation-next',
                prevEl: '#card-up-navigation-prev',
            },
            slidesPerView: 4,
            spaceBetween: 16,
            direction: 'vertical',
            watchSlidesVisibility: true,
            mousewheel: true,
            allowTouchMove: false,
            touchRatio: 0,
            slideToClickedSlide: true,
        });

        const cardUpMain = new Swiper('.card-up__big', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            navigation: {
                nextEl: '#card-up-navigation-next',
                prevEl: '#card-up-navigation-prev',
            },
            thumbs: {
                swiper: cardUpNavigation
            },
            mousewheel: {
                sensitivity: 1.4,
            }
        });

        cardUpMain.controller.control = cardUpNavigation;

        $('.card-up .swiper-wrapper').on('mousewheel', function(e){
            e.preventDefault()
        });

        $('.reviews__item-useful span').on('click', function(){
            $(this).siblings().removeClass('reviews__item--marked')
            $(this).toggleClass('reviews__item--marked')
        });

        $('.reviews__close').on('click', function(){
            let closeWrapper = $('.reviews')
            closeWrapper.toggleClass('reviews--hidden')
            if (closeWrapper.hasClass('reviews--hidden')){
                $(this).text('Показать все отзывы')
            }
            $(this).text('Свернуть все отзывы')
        });
    })();


    // Submit order
    (function() {
        $('.submit-tab__head').on('click', function(){
            $(this).parent().removeClass('submit-tab--checked')
            $(this).parent().siblings('.submit-tab').removeClass('submit-tab--active')
            $(this).parent().toggleClass('submit-tab--active')
        })
    
        $('.btn--next').on('click', function(){
            $(this).parent().parent().next().addClass('submit-tab--active')
            $(this).parent().parent().removeClass('submit-tab--active')
            $(this).parent().parent().addClass('submit-tab--checked')
        })
    })();


    // Cabinet
    (function() {
        $('.my-data__select').select2({
            minimumResultsForSearch: -1,
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            selectionCssClass: 'my-data__select--select',
            dropdownCssClass: "my-data__select--dropdown",
        });

        $('.lk-history__item-btn').on('click', function(){
            $(this).closest('.lk-history__item').siblings().removeClass('lk-history__item--opened')
            $(this).closest('.lk-history__item').toggleClass('lk-history__item--opened')
        });
    })();


    // Map
    (function() {
        if (!document.getElementById('map')) return;

        ymaps.ready(initMap);
        function initMap(){
            // Создание карты.
            var myMap = new ymaps.Map(document.querySelector('#map'), {
                center: [51.17343339, 71.42483223],
                zoom: 14
            });

            var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #fff; font-size: 16px; line-height: 16px; font-family: "Monserrat"; font-weight: 600;">$[properties.iconContent]</div>'
            );
            var coordinates = [
                [51.17343339, 71.42483223], 
                [51.17343439, 71.42483888],
                [51.17386339, 71.46783999]
            ];


            for (var i in coordinates)
                myMap.geoObjects
                    .add(new ymaps.Placemark(coordinates[i], {
                        iconContent: parseInt(i) + 1
                    }, {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'assets/img/pin-filled.svg',
                        iconImageSize: [40, 48],
                        iconImageOffset: [0, 0],
                        iconContentOffset: [15, 14],
                        iconContentLayout: MyIconContentLayout
                    }));
        }
    })();
});