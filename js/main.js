function generateSliders() {
    var $slider = $(document).find(".range__input"); // Ползунок

    $slider.each(function () {
        var
            $this = $(this), // Текущий элемент
            slMin = $(this).parent().find(".range__prev"), // Поле с минимальным значением
            slMax = $(this).parent().find(".range__next"), // Поле с максимальным значением
            slMinVal = parseInt((slMin.data('limit')) ? slMin.data('limit') : slMin.val()), // Значение поля min
            slMaxVal = parseInt((slMax.data('limit')) ? slMax.data('limit') : slMax.val()) // Значение поля max
        ;
        $this.slider({ // Инициализация ползунка
            min: slMinVal,
            max: slMaxVal,
            values: [slMin.val(), slMax.val()],
            range: true,
            create: function () {
                changeInput();
            },
            slide: function () {
                slMin.val($this.slider("values", 0));
                slMax.val($this.slider("values", 1));
                changeInput();
            },
            stop: function () {
                slMin.val($this.slider("values", 0));
                slMax.val($this.slider("values", 1));
                changeInput();
            }
        });

        $('.' + slMin.attr('class') + ', .' + slMax.attr('class')).on('input', function () { // Обработка изменения полей ввода вручную
            var
                value1 = +parseInt(slMin.val()), // Значение поля min
                value2 = +parseInt(slMax.val()); // Значение поля max

            if (this.value.match(/[^0-9]/g)) { // Можно только цифры
                this.value = this.value.replace(/[^0-9]/g, '');
            }

            if (!value1) {
                value1 = 0;
            }
            if (!value2) {
                value2 = 0;
            }
            if (value2 > slMaxVal) {
                value2 = slMaxVal;
            }
            if (value1 > value2) {
                value1 = value2;
            }

            slMin.val(value1);
            slMax.val(value2);
            $this.slider("values", 0, value1);
            $this.slider("values", 1, value2);
            changeInput();
        });

        $(window).on('resize', function () { // Обработка ресайза страницы
            changeInput();
        });

        $(slMin).on('keydown', function (e) { // Добавление работы стрелок вверх / вниз для min
            if (e.keyCode != 38 && e.keyCode != 40) return;

            var
                value1 = parseInt(slMin.val()), // Значение поля min
                value2 = parseInt(slMax.val()); // Значение поля max

            if (e.keyCode == 38) {
                value1++;
            }
            if (e.keyCode == 40) {
                value1--;
            }

            if (value1 > value2) {
                value1 = value2;
            }
            if (value1 < slMinVal) {
                value1 = slMinVal;
            }

            slMin.val(value1);
            $this.slider("values", 0, value1);
            changeInput();
        });

        $(slMax).on('keydown', function (e) { // Добавление работы стрелок вверх / вниз для max
            if (e.keyCode != 38 && e.keyCode != 40) return;

            var
                value1 = parseInt(slMin.val()), // Значение поля min
                value2 = parseInt(slMax.val()); // Значение поля max

            if (e.keyCode == 38) {
                value2++;
            }
            if (e.keyCode == 40) {
                value2--;
            }

            if (value2 < value1) {
                value2 = value1;
            }
            if (value2 > slMaxVal) {
                value2 = slMaxVal;
            }

            slMax.val(value2);
            $this.slider("values", 1, value2);
            changeInput();
        });

        function changeInput() { // Функция, задающая ширину инпутов
            var
                minVal = slMin.val().length, // Количество цифр в поле min
                maxVal = slMax.val().length, // Количество цифр в поле max
                minWidth, maxWidth; // Итоговая ширина min и max

            if (window.innerWidth >= 1400) {
                minWidth = 21.08 * minVal;
                maxWidth = 21.08 * maxVal;
            } else {
                minWidth = 13.17 * minVal;
                maxWidth = 13.17 * maxVal;
            }

            slMin.css('width', minWidth);
            slMax.css('width', maxWidth);
        }
    });
}
$(function() {
	var
		classBlock = 'file-input',
		$fInput = $('.' + classBlock + '__input'), // Выборка всех инпутов типа файл
		fInputClass = classBlock + '__input', // Класс инпута типа файл
		classFocusInput = classBlock + '__label_focus', // Класс, добавляющий стили при фокусе (для FF)
		fSelected = classBlock + '_selected', // Класс инпута с выбранным файлом
		$fReset = $('.' + classBlock + '__reset'); // Крестики для удаления добавленного файла

	// Обработка добавления файла
	$fInput.on('change', function() {
		var
			$this = $(this),
			fId = $this.attr('id'), // ID текущего инпута
			$fLabel = $('label[for=' + fId + ']'), // Label, привязанный к текущему input
			value = $this.val(); // Путь добавленного файла

		if (!value) return; // Если нажали "отмена"

		$fLabel.text(value.slice(value.lastIndexOf('\\') + 1)); // Отображение названия файла
		$this.parent().addClass(fSelected);
	});

	// Обработка удаления файла
	$fReset.on('click', function() {
		var
			$this = $(this),
			$inpWrap = $this.parent(), // Текущий контейнер инпута
			$input = $inpWrap.find('.' + fInputClass), // Текущий инпут
			fId = $input.attr('id'), // ID текущего инпута
			$fLabel = $('label[for=' + fId + ']'); // Label, привязанный к текущему инпуту

		if (!$input.parent().hasClass(fSelected)) return; // Выбираем только с файлом

		$input.val('');
		$inpWrap.removeClass(fSelected);
		$fLabel.text('Выбрать файл');
	});

	// Обработка фокуса на Firefox
	$fInput.on( 'focus', function(){ $(this).next().addClass(classFocusInput); });
	$fInput.on( 'blur', function(){ $(this).next().removeClass(classFocusInput); });
	/* ========== */

    /* Ползунки range */

    generateSliders();
/* ========== */


    $(document).on("click", ".menu__dropdown", function () {
        return $(this).toggleClass("submenu__active"), !1
    });


    $(document).on('click', '#gamburger-nav', function () {
        $(this).toggleClass("active");
        $('.header__mobile--dropdown').toggleClass("active");
    });


    $('.slider').slick({
        slidesToShow: 5,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.gallery__picture').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery__list'
    });
    $('.gallery__list').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.gallery__picture',
        dots: false,
        arrows: true,
        vertical: true,
        centerMode: false,
        focusOnSelect: true
    });

});