(function ($) {
	class ButtonLike {
		constructor($elem) {
			this.$buttonLike = $elem;
			this.toggleButtonLike();
		}

		toggleButtonLike() {
			$('.js-like-button__button', this.$buttonLike).on('click', () => {
				let $button = $(this.$buttonLike).find('.js-like-button__button');
				let $like = $($button).find('.js-like-button__like');
				let $numberClassName = $($button).find('.js-like-button__number');
				let valueNumber = +$numberClassName.text();
				if($button) {
					$button.toggleClass('button--active');
					$like.toggleClass('like--active');
					($like.text() === 'favorite_border') ? $like.text('favorite') : $like.text('favorite_border')
					$numberClassName.toggleClass('number--active');
					($numberClassName.hasClass('number--active')) ? $numberClassName.text(valueNumber + 1) : $numberClassName.text(valueNumber - 1);
				}
			})
		}
	}

	$('.js-like-button').each((index, elem) => {
		new ButtonLike($(elem));
	})
})(jQuery);







