var CreateOrUpdateFood = function () {

    // basic validation
    var handleValidation = function() {
        var food_form = $('#food_form');
        var error = $('.alert-danger', food_form);
        var success = $('.alert-success', food_form);
        food_form.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",  // validate all fields including form hidden input
            messages: {
                select_multi: {
                    maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
                    minlength: jQuery.validator.format("At least {0} items must be selected")
                }
            },
            rules: {
                name: {
                    minlength: 2,
                    required: true
                },
                type: {
                    required: true
                },
                level: {
                    required: true
                },
                description: {
                    required: true,
                    minlength: 3
                },
                cereals: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                fruits: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                vegetables: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                eggs: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                fish: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                meat: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                nuts: {
                    range:[0,100],
                    required: true,
                    number: true
                },
                dairy: {
                    range:[0,100],
                    required: true,
                    number: true
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                success.hide();
                error.show();
                Metronic.scrollTo(error, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                success.show();
                error.hide();


                form.submit();
            }
        });


    }

    return {
        init: function () {
            handleValidation();
        }

    };

}();