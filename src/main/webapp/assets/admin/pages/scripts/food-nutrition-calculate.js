var FormWizard = function () {
    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            $("#country_list").select2({
                placeholder: "选择国家",
                allowClear: true,
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

            var form = $('#submit_form');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);


            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    //profile
                    fullname: {
                        required: true
                    },
                    profession: {
                        required: true
                    },
                    country: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    height: {
                        required: true,
                        number: true
                    },
                    gender: {
                        required: true
                    },
                    address: {
                        required: false
                    },
                    age: {
                        required: false,
                        number: true
                    },
                    weight:{
                        required: false,
                        number: true
                    },
                    schedule:{
                        required: false,
                        number: true
                    }

                },
                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    success.hide();
                    error.show();
                    Metronic.scrollTo(error, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid') // mark the current input as valid and display OK icon
                            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    }
                },

                submitHandler: function (form) {
                    success.show();
                    error.hide();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });

            var calculateNutrition = function(){
                var age = $('[name="age"]', form).val();
                var height = $('[name="height"]', form).val();
                var weight = $('[name="weight"]', form).val();
                var gender = $('[name="gender"]:checked', form).attr("data-title");
                var bmi = (weight / ((height/100)*(height/100))).toFixed(2);
                var energy = (bmi*40).toFixed(1);
                var protein = (energy * (0.15/4)).toFixed(2);
                var fat = (energy * (0.25/9)).toFixed(2);
                var carbohydrates = (energy * (0.60/4)).toFixed(2);



                $('#tab3 .form-control-static', form).each(function(){
                    var type = $(this).attr("data-display");
                    if(type=="bmi"){
                        var info = "BMI: " + bmi + " ";
                        if(bmi<17){
                            info = info + "过于瘦弱"
                        }else if(bmi>=17&&bmi<18.4){
                            info = info + "轻度瘦弱"
                        }else if(bmi>=18.4&&bmi<20){
                            info = info + "体质正常"
                        }else{
                            info = info + "肥胖"
                        }
                        $(this).html(info);
                    }else if (type=="energy") {

                        $(this).html("" + energy + " KCal");
                    } else if (type=="protein") {
                        $(this).html(protein + " g");
                    }else if (type=="fat") {
                        $(this).html(fat + " g");
                    } else if (type=="carbohydrates") {
                        $(this).html(carbohydrates + " g");
                    }

                    else if (type=="breakfast") {
                        $(this).html("蛋白质: " +(protein*0.3).toFixed(1) + "g 脂肪: "+(fat*0.3).toFixed(1)+ "g 碳: "+(carbohydrates*0.3).toFixed(1)+ "g");
                    }else if (type=="lunch") {
                        $(this).html("蛋白质: " +(protein*0.4).toFixed(1) + "g 脂肪: "+(fat*0.4).toFixed(1)+ "g 碳: "+(carbohydrates*0.4).toFixed(1)+ "g");
                    } else if (type=="dinner") {
                        $(this).html("蛋白质: " +(protein*0.3).toFixed(1) + "g 脂肪: "+(fat*0.3).toFixed(1)+ "g 碳: "+(carbohydrates*0.3).toFixed(1)+ "g");
                    } else {
                        $(this).html(type);
                    }
                });


            }

            var displayConfirm = function() {
                $('#tab4 .form-control-static', form).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    if (input.is(":radio")) {
                        input = $('[name="'+$(this).attr("data-display")+'"]:checked', form);
                    }
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    } else if ($(this).attr("data-display") == 'payment') {
                        var payment = [];
                        $('[name="payment[]"]').each(function(){
                            payment.push($(this).attr('data-title'));
                        });
                        $(this).html(payment.join("<br>"));
                    }
                });



            }

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form_wizard_1')).text('第' + (index + 1) + '项 共' + total + '项');
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form_wizard_1').find('.button-previous').hide();
                } else {
                    $('#form_wizard_1').find('.button-previous').show();
                }

                if (current == 3) {
                     //计算营养数值
                    calculateNutrition();

                }

                if (current >= total) {
                    $('#form_wizard_1').find('.button-next').hide();
                    $('#form_wizard_1').find('.button-submit').show();
                    displayConfirm();
                } else {
                    $('#form_wizard_1').find('.button-next').show();
                    $('#form_wizard_1').find('.button-submit').hide();
                }
                Metronic.scrollTo($('.page-title'));
            }

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    success.hide();
                    error.hide();
                    if (form.valid() == false) {
                        return false;
                    }
                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() == false) {
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1 .button-submit').click(function () {
                bootbox.alert('营养计算完成,但愿您满意 :)');
            }).hide();
        }

    };

}();