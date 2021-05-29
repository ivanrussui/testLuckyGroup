// pop up flag
$(function(){
	$('.selectpicker').selectpicker();
});

$(document).ready(function () {
  // Validate
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
				phone: 'required',
      },
      messages: {
        name: {
          required: 'ВВЕДИТЕ НИЖЕ',
          minlength: jQuery.validator.format('ВВЕДИТЕ ОТ {0} БУКВ'),
        },
				phone: 'ВВЕДИТЕ НИЖЕ',
      },
    });
  }

  validateForms('#form');

  // Ajax
  $('form').submit(function (e) {
    e.preventDefault();

    // это условие внутри Ajax чтобы письмо пустым не отправлялось
    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('');
      $('.overlay, #thanks').slideDown('slow');
			$('body').toggleClass('lock'); // добавляем класс блокирующий прокрутку

      $('form').trigger('reset');
    });
    return false;
  });

  // modal при отправки письма

  // $('.contacts__btn').on('click', function () {
  //   $('.overlay, #thanks').slideDown('slow');
  // });
  // этот скрипт не нужен так как он срабатывая игнорирует валидацию

  $('.modal__close').on('click', function () {
    $('.overlay, #thanks').slideUp(500);
		$('body').toggleClass('lock'); // убираем класс блок прокрутку
  });
});

