(function ($) {
	class CheckboxList {
		constructor($elem) {
			this.$checkboxList = $elem;
			this.listDropdown();
		}

		listDropdown() {
			$('.js-checkbox-list__title', this.$checkboxList).on('click', () => {
				let $list = $(this.$checkboxList).find('.js-checkbox-list__list');
				let $buttonArrow = $(this.$checkboxList).find('.js-checkbox-list__button');
				$list.slideToggle();
				$buttonArrow.toggleClass('checkbox-list__button--active');
			})
		}
	};

	$('.js-checkbox-list').each((index, elem) => {
		new CheckboxList($(elem));
	})
})(jQuery);