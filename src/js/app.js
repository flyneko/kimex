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

        $('.header__search-trigger').on('click', function(){
            $('.header__search-wrapper').toggleClass('header__search-wrapper--active')
            if($('.header__search-wrapper').hasClass('header__search-wrapper--active')){
                $('html').css('overflow-y', 'hidden')
            } else{
                $('html').css('overflow-y', 'visible')
            }
        });
        
        $('.header__menu-trigger').on('click', function(){
            $(this).parent().toggleClass('header__menu-wrapper--active')
        });
        
        $('.header__search-background').on('click', function(){
            $('.header__search-wrapper').toggleClass('header__search-wrapper--active')
            $('html').css('overflow-y', 'unset')
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

        $('.mini-cataloge .tab').on('click', function(){
            const sliderAuto = new Swiper('.mini-cataloge .slider-auto', {
                loop: true,
                spaceBetween: 32,
                allowTouchMove: true,
                observer: true,
                observeSlideChildren: false,
                observeParents: true,
                navigation: {
                    nextEl: '.arrow-next--auto',
                    prevEl: '.arrow-prev--auto',
                },
                slidesPerView: 'auto',
                observer: true,
                observeSlideChildren: false,
                observeParents: true,
                breakpoints: {
                    320: {
                        spaceBetween: 8,
                        slidesPerView: 2,
                    },
                    545: {
                        spaceBetween: 8,
                        slidesPerView: 3,
                    },
                    768: {
                        spaceBetween: 32,
                        slidesPerView: 'auto',
                    },
                }
            });
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
            loop: false,
            spaceBetween: 32,
            navigation: {
                nextEl: '.arrow-next--instagram',
                prevEl: '.arrow-prev--instagram',
            },
            slidesPerView: 3,
            breakpoints: {
                320: {
                    slidesPerView: 2.2,
                    spaceBetween: 8,
                    variableWidth : true,
                },
                768: {
                    spaceBetween: 32,
                    slidesPerView: 3,
                    variableWidth : false,
                },
                950: {
                    slidesPerView: 3,
                },
            }
        });
        
        const bigSlides = new Swiper('.slider--big-slides', {
            loop: false,
            spaceBetween: 32,
            navigation: {
                nextEl: '.arrow-next.arrow-next--big-slides',
                prevEl: '.arrow-prev.arrow-prev--big-slides',
            },
            breakpoints: {
                320: {
                    slidesPerView: 2.4,
                    variableWidth: true,
                    spaceBetween: 8,
                },
                545: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                768: {
                    spaceBetween: 32,
                    slidesPerView: 4,
                },
                950: {
                    slidesPerView: 4,
                },
            },
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
            observer: true,
            observeSlideChildren: false,
            observeParents: true,
            breakpoints: {
                320: {
                    spaceBetween: 8,
                    slidesPerView: 2,
                },
                545: {
                    spaceBetween: 8,
                    slidesPerView: 3,
                },
                768: {
                    spaceBetween: 32,
                    slidesPerView: 'auto',
                },
            }
        });

        SwiperProxy($('.js-single-carousel'), {
            dots: true,
            nav: false,
            slidesPerView: 1,
            loop: true,
            pagination: {
                clickable: true
            },
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
        $('.card-cart__size-change').on('click', function(){
            let input = $(this).prev();
            input.removeAttr('disabled');
            input.focus();
        });

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
            if ($(window).width() <= 768){
                return false;
            }
            else{
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
            }
        })
        $('.slider-card').on('mouseleave', function(){
            if ($(window).width() <= 768){
                return false;
            } else{
                $(this).find('.swiper-pagination--clone').remove()
                currCardSlider.destroy()
            }
        })
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
            updateOnWindowResize: false,
            breakpoints: {
                320: {
                    spaceBetween: 8,
                },
                950: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            }
        });

        const cardUpMain = new Swiper('.card-up__big', {
            slidesPerView: '1',
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
            },
            breakpoints: {
                320: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                },
                950: {
                    pagination: false,
                },
            }
        });

        cardUpMain.controller.control = cardUpNavigation;

        const cardUpRewiews = new Swiper('.card-up__reviews-slider', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        });

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
        $('.submit-order__form .checkbox').on('input', function(){
            let inputId = $(this).attr('id')
            let inputValue = $(this).val()
            let needItem = $(`[data-id='${inputId}'`)
            needItem.text(inputValue)
        });
        
        $('.submit-tab__head').on('click', function(){
            let tabParent = $(this).closest('.submit-tab')
            if (tabParent.hasClass('submit-tab--active')){
                tabParent.toggleClass('submit-tab--active')
                tabParent.addClass('submit-tab--checked')
            } else{
                tabParent.siblings('.submit-tab').removeClass('submit-tab--active')
                tabParent.addClass('submit-tab--active')
                tabParent.siblings().addClass('submit-tab--checked')
                $('.submit-order__submit').removeClass('submit-tab--checked')
                tabParent.removeClass('submit-tab--checked')
            }
        
            if ($(tabParent).hasClass('submit-pay')){
                tabParent.next().toggleClass('submit-order__submit--active')
            } else{
                $('.submit-order__submit').removeClass('submit-order__submit--active')
            }
        });
        
        $('.submit-tab__checked-link').on('click', function(){
            let tabParent = $(this).closest('.submit-tab')
            tabParent.siblings('.submit-tab').removeClass('submit-tab--active')
            tabParent.addClass('submit-tab--active')
            tabParent.removeClass('submit-tab--checked')
        })
        
        $('.btn--next').on('click', function(){
            let tabParent = $(this).closest('.submit-tab')
            if ($(tabParent.next().next()).hasClass('submit-order__submit')){
                tabParent.next().next().toggleClass('submit-order__submit--active')
            }
            tabParent.next().addClass('submit-tab--active')
            tabParent.removeClass('submit-tab--active')
            tabParent.addClass('submit-tab--checked')
        });

        $('select[name="delivery_city"]').on('change', function() {
            var isAlmaty = this.value == 'almaty';
            $('.js-almaty-delivery')[isAlmaty ? 'removeClass' : 'addClass']('d-none');
            $('.js-other-delivery')[isAlmaty ? 'addClass' : 'removeClass']('d-none');
        });
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

    // Footer
    (function() {
        $('.mobile-dropdown__head').on('click', function(){
            $(this).parent().siblings().removeClass('mobile-dropdown__item--active')
            $(this).parent().toggleClass('mobile-dropdown__item--active')
        });
    })();

    // select
    (function() {
        $('.js-select').select2({
            width: '100%',
            minimumResultsForSearch: -1,
            dropdownAutoWidth : true,
            inputAutoWidth : true,
            selectionCssClass: 'custom-select__select',
            dropdownCssClass: "custom-select__dropdown",
        });
    })();


    // Map
    (function() {
        if (!document.getElementById('map')) return;

        ymaps.ready(function() {
            MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon">' +
                    '<a class="balloon__close" href="#"><svg class="icon icon-x"><use xlink:href="assets/img/sprite.svg#icon-x"></use></svg></a>' +
                    '<span class="balloon__arrow"></span>' + 
                    '<div class="balloon__inner">' +
                    '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
                    '</div>' +
                    '</div>', 
                {
                   
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.balloon', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.balloon__close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                clear: function () {
                    this._$element.find('.balloon__close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.balloon__arrow')[0].offsetHeight)
                    });
                },

                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                getShape: function () {
                    if(!this._isElement(this._$element))
                        return MyBalloonLayout.superclass.getShape.call(this);

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.balloon__arrow')[0].offsetHeight
                        ]
                    ]));
                },

                _isElement: function (element) {
                    return element && element[0] && element.find('.balloon__arrow')[0];
                }
            });

            // Создание карты.
            var myMap = new ymaps.Map(document.querySelector('#map'), {
                center: [51.17343339, 71.42483223],
                zoom: 14
            });

            var shops = [
                {
                    coordinates: [51.17243339, 71.43483223],
                    name: 'ТРЦ MEGA Alma-Ata (ул. Розыбакиева 247A)',
                    phone: '+7 778 978-38-25',
                    workdays: 'Пн.-Вс. с 10:00 до 22:00'
                }, 
                {
                    coordinates: [51.17345439, 71.42484888],
                    name: 'ТД Арена (ул. Абая уг. ул. Гагарина)',
                    phone: '+7 778 978-38-25',
                    workdays: 'Пн.-Вс. с 10:00 до 22:00'
                },
                {
                    coordinates: [51.17386339, 71.46783999],
                    name: 'ТРЦ MEGA PARK (ул. Макатаева 127)',
                    phone: '+7 778 978-38-25',
                    workdays: 'Пн.-Вс. с 10:00 до 22:00'
                }
            ];


            for (var i in shops) {
                var shop = shops[i];
                myMap.geoObjects
                    .add(new ymaps.Placemark(shop.coordinates, {
                        iconContent: parseInt(i) + 1,
                        balloonContent: '' +
                        '<p class="map__places-title">' + shop.name + '</p>' + 
                        '<a class="map__places-phone" href="tel:' + shop.phone + '"> <svg class="icon icon-phone "> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./assets/img/sprite.svg#icon-phone"></use></svg>' + shop.phone + '</a>' +
                        '<p class="map__places-time"> <svg class="icon icon-clock "> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./assets/img/sprite.svg#icon-clock"></use></svg> ' + shop.workdays + '</p>'
                    }, {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'assets/img/pin-filled.svg',
                        iconImageSize: [40, 48],
                        iconImageOffset: [0, 0],
                        iconContentOffset: [15, 14],
                        iconContentLayout: ymaps.templateLayoutFactory.createClass(
                            '<div style="color: #fff; font-size: 16px; line-height: 16px; font-family: "Monserrat"; font-weight: 600;">$[properties.iconContent]</div>'
                        ),

                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        balloonPanelMaxMapArea: 0,
                        // Не скрываем иконку при открытом балуне.
                        hideIconOnBalloonOpen: false,
                        // И дополнительно смещаем балун, для открытия над иконкой.
                        balloonOffset: [20, -10]
                    }));
            }
        });
    })();

    (function() {
        var btn = $('.js-up-btn');
        var check = function() {
            if ($(window).scrollTop() > 300) {
                btn.addClass('is-active');
              } else {
                btn.removeClass('is-active');
              }
        }

        $(window).scroll(check);
        check();
        
        btn.on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({scrollTop:0}, '300');
        });
    })();

    // Fixed header
    (function() {
        $('.js-header:not(.header--fixed)').each(function() {
            var $header = $(this);
            var pos = $header.offset().top + $header.outerHeight();
            var $replace = $('<div>').insertBefore($header);

            function headerFixed() {
                var top = $(document).scrollTop();
                if ($header.is(':visible') && top >= pos && !$header.hasClass('is-fixed')) {

                    $replace.css('height', $header.outerHeight())
                    $header.addClass('is-fixed');
                } else if (top <= pos && $header.hasClass('is-fixed')) {
                    $replace.css('height', 0);
                    $header.removeClass('is-fixed');
                }
            }

            $(window).on('scroll', headerFixed);
            headerFixed();
        })
    })();

    // Product share
    (function() {
        var $share = $('.js-product-share');
        var close = function() {
            $share.removeClass('is-active')
        };

        $('.js-product-share-trigger').on('click', function() {
            $share.toggleClass('is-active');
        });

        $('.js-product-share-close').on('click', function() {
            close();
        });

        $(document).on('click', function(e) {
            var $target = $(e.target);
            if (!$target.closest('.js-product-share, .js-product-share-trigger').length && !$target.hasClass('js-product-share') && !$target.hasClass('js-product-share-trigger')){
                close();
            }
        });


        $('.js-product-share-input').on('click', function(event) {
            this.focus();
            this.select();
        
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                var $success = $('.js-product-share-copy-success');
                $success.addClass('is-active')
                setTimeout(function() {
                    $success.removeClass('is-active');
                }, 3000)
            } catch (err) {
            }
        });
    })();
});