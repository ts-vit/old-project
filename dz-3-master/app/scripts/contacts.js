/**
 * Created by Vital on 03.08.2015.
 */
var validation = (function (){

    var init, validateForm, _setUpListners, _removeError, _clearForm, _createQtip;
    init = function () {
        _setUpListners();
    };
    validateForm = function (form) {

        var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
            valid = true;

        $.each(elements, function (index, val) {
            var element = $(val),
                val = element.val(),
                pos = element.attr('qtip-position');

            if (val.length === 0) {
                element.addClass('has-error');
                _createQtip(element, pos);
                valid = false;
            }

        });

        return valid;
    };
    _setUpListners = function () {
        var formList = $('form');
        formList.on('keydown', '.has-error', _removeError);
        formList.on('reset',_clearForm);
    };
    _removeError = function () {

        $(this).removeClass('has-error');
    };
    _clearForm = function (form) {

        var form1 = $(this);
        form1.find('.form__name-input, .form__mail-input,.form__capcha-text, .textarea').trigger('hideTooltip');
        form1.find('.has-error').removeClass('has-error');
        form1.find('.error-mes, success-mes').text('').hide();
    };
    _createQtip = function (element, position) {
        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }

        element.qtip({
            content: {
                text: function () {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip'
                // event: 'reset hideTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle qtip-rounded',
                tip: {
                    height: 10,
                    width: 16
                }
            }
        }).trigger('show');
    };

    return {
        init: init,
        validateForm: validateForm
    };

})();
var contactMe = (function (){

    var init = function(){
            _setUpListners();
        },
        _setUpListners = function (){
            $('#contact-me').on('submit', _submitForm);
        },
        _submitForm = function (ev) {

            ev.preventDefault();

            var form = $(this),
                url = '/send_mail.php',
                defObject = _ajaxForm(form, url);

            if (defObject) {
                defObject.done(function(ans) {
                    var mes = ans.mes,
                        status = ans.status;

                    if ( status === 'OK'){
                        form.trigger('reset');
                        form.find('.success-mes').text(mes).show();
                    } else{
                        form.find('.error-mes').text(mes).show();
                    }
                });
            }
        },
        _ajaxForm = function (form, url) {

            if (!validation.validateForm(form)) return false;
            var data = form.serialize();

            return $.ajax({
                type: 'POST',
                url: url,
                dataType : 'JSON',
                data: data
            }).fail( function(ans) {
                form.find('.error-mes').text('На сервере произошла ошибка').show();
            });
        };

    return {
        init: init
    };

})();
validation.init();
contactMe.init();
jQuery('input[placeholder], textarea[placeholder]').placeholder();