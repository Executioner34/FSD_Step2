const _getTemplate = (items, options) => {
	const data = items.map( item => {
		return `
			<div class='dropdown__menu-option'>
				<span class='font-level-h3 menu__item'>${item.name}</span>
				<div class='dropdown-value-buttons'>
					<div class='dropdown-value-buttons__wrapper'>
						<button class='dropdown-value-buttons__button js-button-decrease' type='button' data-type='buttonDecrease'>
							<span class='button__decrease font-level-body' data-type='buttonDecrease'> - </span>
						</button>
						<span class='dropdown-value-buttons__value font-level-h3 js-dropdown-value'>${item.defaultCount}</span>
						<button class='dropdown-value-buttons__button font-level-body js-button-increase' type='button' data-type='buttonIncrease'>
							<span class='button__increase font-level-body' data-type='buttonIncrease'> + </span>
						</button>
					</div>
				</div>
			</div>
		`
	})
	let renderInput = items
			.map(item => `${item.defaultCount} ${item.name}, `)
			.join('')
			.toLowerCase();
	
	if (renderInput.length > 20) {
		renderInput = renderInput.slice(0, 20) + '...'
	}

	const inputHeader = function({title = 'Dropdown', text = '', isUpperInput = true}) {
		if (isUpperInput) return `
		<div class='text-form__header'>
			<span class="text-form__title font-level-h3">${title}</span>
			<span class="text-form__text font-level-body">${text}</span>
		</div>
		`
		return ''
	}

	return `
		${inputHeader(options)}
		<div class='dropdown__input' data-type='input'>
			<span class='input__title font-level-body' data-type='input'>${renderInput}</span>
			<i class='input__button--expand material-icons' data-type='input'>expand_more </i>
		</div>
		<div class='dropdown__menu'>
			${data.join('')}
		</div>
	`
}

export class DropDown {
	constructor(selector, options) {
		this.options = options;
		this.$elem = $(selector);
		this._render();
		this._setup();
	}

	_render() {
		const {data} = this.options;
		const options = this.options;
		$(this.$elem).html(_getTemplate(data, options));
	}

	_setup() {
		this.clickHandler = this.clickHandler.bind(this); //Устанавливаем обработчик
		$(document).on('click', this.clickHandler); // событий на документ
		this.$menu = $(this.$elem).find('.dropdown__menu');
		const {isOpen} = this.options;
		const {isGuests} = this.options;
		if (isOpen) {
			$(this.$elem).addClass('open');
		}
		if (isGuests) {
			$(this.$menu).append(this._button);
			this._checkTotalNull();
		}
	}

	clickHandler(event) {
		const {type} = event.target.dataset;
		if ( $(event.target).closest(this.$elem).length) {
			if(type === 'input') {
				this.toggle()
			}
			else if(type === 'buttonDecrease') {
				this.countDecrease(event)
			}
			else if (type === 'buttonIncrease') {
				this.countIncrease(event)
			}
			else if(type === 'apply') {
				this.close()
			}
			return
		}
		this.close()
	}

	_checkTotalNull() {
		const $values = $(this.$menu).find('.js-dropdown-value');
		const $buttonsDecrease = $(this.$menu).find('.js-button-decrease');
		const $buttonClear = $(this.$menu).find('.button--clear');
		const $input = $(this.$menu).siblings('.dropdown__input').find('.input__title');
		const arrValues = $($values).text().split('').reduce((total, num) => total + (+num), 0);
		if (arrValues === 0) {
			$($input).text('Сколько гостей');
			$($buttonsDecrease).prop('disabled', true);
			$($buttonClear).css('display', 'none')
		}
	}

	_button() {
		return `
		<div class='dropdown__buttons'>
			<div class='button__wrapper'>
				<button class='button__button button--clear' type='button' data-type='clear'>
					<span class='button__text button__text--purple font-level-h3'>Очистить</span>
				</button>
			</div>
			<div class='button__wrapper'>
				<button class='button__button button--apply' type='button'>
					<span class='button__text button__text--purple font-level-h3' data-type='apply'>Применить</span>
				</button>
			</div>
		</div>
		`
	}

	get isOpen() {
		return $(this.$elem).hasClass('open') // геттер проверяет наличие класса у элемента
	}

	toggle() {
		(this.isOpen) ? this.close() : this.open()
	}

	open() {
		$(this.$elem).addClass('open')
	}

	close() {
		$(this.$elem).removeClass('open')
	}

	update() {
		const {isGuests} = this.options;
		const $buttonClear = $(this.$menu).find('.button--clear');
		const $input = $(this.$menu).siblings('.dropdown__input').find('.input__title');
		const $items = $(this.$menu).find('.menu__item');
		const itemsObj = $($items).map((index, elem) => ({
			item: $(elem).text()
		})).toArray();
		const $values = $(this.$menu).find('.js-dropdown-value');
		const valuesObj = $($values).map((index, elem) => ({
			value: $(elem).text()
		})).toArray();
		let str = '';

		if (isGuests) {
			let sum = 0;
			for (let i = 0 ; i <= valuesObj.length - 1; i++) {
				sum += (+valuesObj[i].value);
			}
			switch (sum) {
				case 2:
				case 3:
				case 4:
					str = sum + ' гостя';
					break;
				case 1:
					str = sum + ' гость';
					break;
				case 0:
					$($buttonClear).css('display', 'none');
					str = 'Сколько гостей';
					break;
				default:
					str = sum + ' гостей';
			}
		}

		else {
			let i = 0;
			let j = 0;
			value: for ( ; i <= (valuesObj.length - 1); i++) {
				str += `${valuesObj[i].value} `;
				for ( ; j <= (itemsObj.length - 1); ) {
					str += `${itemsObj[j].item}, `; // Во внутреннем цикле почему то не увеличивается значение j
					j += 1;
					continue value
				}
			};
			str = str.toLowerCase();
			if (str.length > 20) {
				str = str.slice(0, 20) + '...'
			}
		}

		$($input).text(str);
	}

	countDecrease(event) {
		const $count = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-dropdown-value');
		const $buttonDecrease = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-button-decrease');
		const $buttonIncrease = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-button-increase');
		let value = +$($count).text();
		if (value !== 0 && value !== 1) {
			$($count).text(value - 1)
			$($buttonIncrease).prop('disabled', false)
		}
		else if (value === 1) {
			$($count).text(value - 1);
			$($buttonDecrease).prop('disabled', true);
		}
		this.update()
	}

	countIncrease(event) {
		const {maxValue} = this.options;
		const $buttonClear = $(this.$menu).find('.button--clear');
		const $count = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-dropdown-value');
		const $buttonDecrease = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-button-decrease');
		const $buttonIncrease = $(event.target).parents('.dropdown-value-buttons__wrapper').find('.js-button-increase');
		let value = +$($count).text();
		if (value === 0) {
			$($count).text(value + 1);
			$($buttonDecrease).prop('disabled', false);
			$buttonClear.css('display', 'block')
		} else if ((maxValue - 1) === value) {
			$($buttonIncrease).prop('disabled', true)
			$($count).text(value + 1);
		} else if (maxValue > value) {
			$($count).text(value + 1);
		}
		this.update()
	}

}
