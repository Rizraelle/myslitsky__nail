//Main slider

$(function() {

	var swiper = new Swiper('.swiper', {
		slidesPerView: 3,
		simulateTouch: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		breakpoints: {
			991: {
				slidesPerView: 2
			},
			767: {
				slidesPerView: 1
			}
		}
   });

	var imageSwiper = new Swiper('.image-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		simulateTouch: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
   });
});


//Smooth search input

document.getElementById('search__button').onclick = function(){
    document.getElementsByClassName('search_input')[0].classList.toggle("show__input");
};


//Hamburger icon

document.getElementById('gamburger-nav').onclick = function(event){
    event.target.classList.toggle("active");
    document.getElementsByClassName('menu__line--list')[0].classList.toggle("active");
};


//Calendar toggle

document.getElementById('start__calendar').onclick = function(event){
    document.getElementsByClassName('calendar__custom')[0].classList.toggle("active");
};

document.getElementById('finish__calendar').onclick = function(event){
    document.getElementsByClassName('calendar__custom')[0].classList.toggle("active");
};





//Remove focus from inputs etc.

$("button").mouseup(function(){
    $(this).blur();
});



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
});