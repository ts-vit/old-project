/**
 * -------------Created by Vital on 8/13/2015.
 */
var app; // Кнопка наверх
var mySlider;//Слайдер
var mySelect;//Скролл
var forms; //Валидация формы

app = (function () {

    var backToTopPosition, init, scrollToTop, setUpListeners;
    init = function() {
        return setUpListeners();
    };
    setUpListeners = function() {
        $(window).on('load resize', function() {
            return backToTopPosition();
        });
        return $('.to-top-btn').on('click', scrollToTop);
    };
    backToTopPosition = function() {
        var $toTop,
            divider,
            maxPos;
        $toTop = $('.to-top-btn');
        maxPos = $(document).height() - $('.footer').outerHeight();
        divider = 5;
        return $(window).scroll(function() {
            var curPos;
            curPos = $(window).scrollTop() + $(window).height();
            if (curPos > maxPos) {
                $toTop.css('bottom', curPos - maxPos + divider);
            } else {
                $toTop.css('bottom', divider);
            }
            if ($(this).scrollTop()) {
                return $toTop.fadeIn();
            } else {
                return $toTop.fadeOut();
            }
        });
    };
    scrollToTop = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue;
        }
        return $('html, body').stop().animate({
            scrollTop: 0
        }, '500');
    };
    return {
        init: init
    };

})();
app.init();


mySlider = (function () {
    var $sliderBtns;
    var $sliderItems;
    var $sliderList;
    var animSpeed,
        init,
        leftValue,
        setUpListeners,
        sliderInit,
        sliderItemWidth,
        sliderItemsCount,
        sliderNextSlide,
        sliderPrevSlide,
        sliderRotate,
        sliderStart,
        sliderStop,
        speed;
    speed = 5000;
    animSpeed = 1000;
    $sliderList = $('.slider-list');
    $sliderBtns = $('.slider__btns');
    $sliderItems = $('.slider-list__item');
    sliderItemsCount = $sliderItems.length + 1;
    sliderItemWidth = 0;
    leftValue = 0;
    sliderStart = function () {
    };
    init = function () {
        sliderItemWidth = $sliderItems.outerWidth(true);
        leftValue = sliderItemWidth * (-1);
        return setUpListeners();
    };
    setUpListeners = function () {
        sliderInit();
        sliderStop();
        $('.slider__btn_prev').on('click touchstart', sliderPrevSlide);
        return $('.slider__btn_next').on('click touchstart', sliderNextSlide);
    };
    sliderInit = function () {
        $sliderBtns.fadeIn();
        $sliderList.css({
            'left': leftValue,
            'width': sliderItemWidth * sliderItemsCount
        });
        return sliderStart = setInterval(function () {
            return sliderRotate();
        }, speed);
    };
    sliderPrevSlide = function (e) {
        var $firstSlide, $lastSlide, leftIndent;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue;
        }
        leftIndent = parseInt($sliderList.css('left')) + sliderItemWidth;
        $firstSlide = $('.slider-list__item:first');
        $lastSlide = $('.slider-list__item:last');
        return $sliderList.not(':animated').animate({
            'left': leftIndent
        }, animSpeed, function () {
            $firstSlide.before($lastSlide);
            return $sliderList.css({
                'left': leftValue
            });
        });
    };
    sliderNextSlide = function (e) {
        var $firstSlide, $lastSlide, leftIndent;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue;
        }
        leftIndent = parseInt($sliderList.css('left')) - sliderItemWidth;
        $firstSlide = $('.slider-list__item:first');
        $lastSlide = $('.slider-list__item:last');
        return $sliderList.not(':animated').animate({
            'left': leftIndent
        }, animSpeed, function () {
            $lastSlide.after($firstSlide);
            return $sliderList.css({
                'left': leftValue
            });
        });
    };
    sliderStop = function () {
        return $sliderList.mouseenter(function () {
            return clearInterval(sliderStart);
        }).mouseleave(function () {
            return sliderStart = setInterval(function () {
                return sliderRotate();
            }, speed);
        });
    };
    sliderRotate = function () {
        return $('.slider__btn_next').click();
    };


    return {
        init: init
    };

})();
$(window).on('load', function () {
    return mySlider.init();
});
//mySlider.init()

mySelect = (function () {
    var changeSelectOption,
        hideCustomSelect,
        validateCustomSelect,
        init,
        setUpListeners,
        showCustomSelect,
        cleanCustomSelect;
    init = function () {
        return setUpListeners();
    };
    setUpListeners = function () {
        $('.custom-select').on('click touchstart', showCustomSelect);
        $('.custom-select__list-item').on('click touchstart', changeSelectOption);
        return $(document).on('click touchstart', hideCustomSelect);
    };
    showCustomSelect = function () {
        var $select,
            $selectList;
        $select = $(this);
        $selectList = $select.find('.custom-select__list');
        hideCustomSelect();
        $select.addClass('custom-select_active');
        $selectList.not(':animated').slideDown();
        return false;
    };

    changeSelectOption = function () {
        var $item,
            $itemHidden,
            $itemParent,
            itemVal;
        $item = $(this);
        itemVal = $item.attr('data-value');
        $itemHidden = $item.parents('.custom-select').find('.custom-select__control-required');
        $itemParent = $item.parents('.custom-select').find('.custom-select__control');
        $(".tooltip[data-name = \"" + $itemHidden.attr("name") + "\"]").remove();
        $itemParent.removeClass('error').addClass('custom-select__control_selected').text(itemVal);
        return $itemHidden.val(itemVal);
    };
    hideCustomSelect = function () {
        $('.custom-select').removeClass('custom-select_active');
        return $('.custom-select__list').not(':animated').slideUp();
    };
    validateCustomSelect = function() {
        var $itemHidden, valid;
        $itemHidden = $('.custom-select__control-required');
        valid = true;
        $.each($itemHidden, function() {
            var $control, $controlParent, controlVal;
            $control = $(this);
            $controlParent = $control.parents('.custom-select').find('.custom-select__control');
            controlVal = $control.val();
            if (controlVal.length === 0) {
                $controlParent.addClass('error');
                if ($control.attr('name') === 'day') {
                    $controlParent.tooltip({
                        content: 'Укажите день',
                        position: 'left'
                    });
                } else {
                    $controlParent.tooltip({
                        content: 'Укажите месяц'
                    });
                }
                valid = false;
            }
        });
        return valid;
    };
    cleanCustomSelect = function() {
        var $itemHidden, $select, $selectControl, $selectList;
        $select = $('.custom-select');
        $selectList = $('.custom-select__list');
        $selectControl = $('.custom-select__control');
        $itemHidden = $('.custom-select__control-required');
        $select.removeClass('custom-select_active');
        $selectList.slideUp();
        $selectControl.removeClass('custom-select__control_selected error');
        $itemHidden.val('');
        return $.each($selectControl, function() {
            var selectDefault;
            selectDefault = $(this).attr('data-default');
            $(this).text(selectDefault);
        });
    };
    return {
        init: init,
        clean: cleanCustomSelect,
        hide: hideCustomSelect,
        validate: validateCustomSelect
    };
})();
mySelect.init();
mySelect.clean();
mySelect.hide();
mySelect.validate();

$(window).on('load', function () {
    return $('.custom-select__list').mCustomScrollbar({
        theme: 'my-theme'
    });
});

forms = (function() {
    var formClear,
        formHideError,
        formSubmit,
        formValidation,
        iePlaceholder,
        init,
        setUpListeners;
    init = function() {
        setUpListeners();
        return iePlaceholder();
    };
    setUpListeners = function() {
        var $form;
        $form = $('form');
        $form.on('reset', formClear);
        $form.on('submit', formSubmit);
        return $form.on('keydown', '.required', formHideError);
    };
    iePlaceholder = function() {
        if (!('placeholder' in document.createElement('input'))) {
            $('[placeholder]').on('focus', function() {
                var $input;
                $input = $(this);
                if ($input.val() === $input.attr('placeholder')) {
                    $input.val('');
                }
            }).on('blur', function() {
                var $input;
                $input = $(this);
                if ($input.val() === '' || $input.val() === $input.attr('placeholder')) {
                    $input.val($input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var $input;
                    $input = $(this);
                    if ($input.val() === $input.attr('placeholder')) {
                        $input.val('');
                    }
                });
            });
        }
        return setTimeout((function() {
            return $('[placeholder]').trigger('blur');
        }), 100);
    };
    formSubmit = function (e) {
        var $form, $formTitle, $rstBtn, $sbtBtn, customValidated, formAction, formValidated;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue;
        }
        $form = $(this);
        $formTitle = $form.find('.form__title');
        formAction = $form.attr('action');
        $sbtBtn = $form.find('input[type="submit"]');
        $rstBtn = $form.find('input[type="reset"]');
        formValidated = formValidation($form);
        customValidated = customSelect.validate();
        customSelect.hide();
        $form.find('.message').remove();
        if (formValidated === true && customValidated === true) {
            $sbtBtn.add($rstBtn).attr('disabled', 'disabled');
            return $.ajax({
                type: 'POST',
                url: formAction,
                data: $form.serialize()
            }).done(function (data) {
                data = JSON.parse(data);
                if (data.status === 'OK') {
                    formClear();
                    return $formTitle.after('<div class="message message_success">' + data.msg + '</div>');
                } else {
                    return $formTitle.after('<div class="message message_error">' + data.msg + '</div>');
                }
            }).always(function () {
                return $sbtBtn.add($rstBtn).removeAttr('disabled');
            });
        }
    };
    formValidation = function ($form) {
        var $controlList, valid;
        $controlList = $form.find('.required');
        valid = true;
        $.each($controlList, function () {
            var $control, controlVal, placeholder;
            $control = $(this);
            controlVal = $control.val();
            placeholder = $control.attr('placeholder');
            if (controlVal.length === 0 || controlVal === placeholder) {
                $control.addClass('error');
                if ($control.attr('name') === 'name') {
                    $control.tooltip({
                        content: 'Введите Имя'
                    });
                } else if ($control.attr('name') === 'phone') {
                    $control.tooltip({
                        content: 'Введите телефон'
                    });
                } else {
                    $control.tooltip({
                        content: 'Заполните Поле'
                    });
                }
                valid = false;
            }
        });
        iePlaceholder();
        return valid;
    };
    formHideError = function () {
        $(this).removeClass('error');
        return $('.tooltip[data-name = "' + $(this).attr('name') + '"]').remove();
    };
    formClear = function () {
        var $form;
        $form = $('form');
        $form.find('.message').remove();
        $form.find('.required').val('').removeClass('error');
        $form.find('.btn-container input').removeAttr('disabled');
        $('.tooltip').remove();
        customSelect.clean();
        return iePlaceholder();
    };
    return {
        init: init
    };
})();

forms.init();
(function() {
    $.fn.tooltip = function(options) {
        var $body, $this, bottomEdge, createdTooltip, elemHeight, elemWidth, leftCentered, leftEdge, markup, positions, rightEdge, tooltipHeight, tooltipWidth, topCentered, topEdge;
        options = {
            position: options.position || 'right',
            content: options.content || 'I am tooltip'
        };
        $this = $(this);
        $body = $('body');
        elemWidth = $this.outerWidth(true);
        elemHeight = $this.outerHeight(true);
        topEdge = $this.offset().top;
        bottomEdge = topEdge + elemHeight;
        leftEdge = $this.offset().left;
        rightEdge = leftEdge + elemWidth;
        markup = "<div class='tooltip tooltip_" + options.position + "' data-name='" + ($this.attr("name") || $this.data("name") || "") + "'> <div class='tooltip__inner'>" + options.content + "</div> </div>";
        $body.append(markup);
        createdTooltip = $body.find('.tooltip').last();
        tooltipHeight = createdTooltip.outerHeight(true);
        tooltipWidth = createdTooltip.outerWidth(true);
        leftCentered = (elemWidth / 2) - (tooltipWidth / 2);
        topCentered = (elemHeight / 2) - (tooltipHeight / 2);
        positions = {};
        switch (options.position) {
            case 'right':
                positions = {
                    left: rightEdge,
                    top: topEdge + topCentered
                };
                break;
            case 'top':
                positions = {
                    left: leftEdge + leftCentered,
                    top: topEdge - tooltipHeight
                };
                break;
            case 'bottom':
                positions = {
                    left: leftEdge + leftCentered,
                    top: bottomEdge
                };
                break;
            case 'left':
                positions = {
                    left: leftEdge - tooltipWidth,
                    top: topEdge + topCentered
                };
        }
        createdTooltip.offset(positions).css('opacity', '1');
        return $(window).on('resize', function() {
            return $('.tooltip').remove();
        });
    };

}).call(this);