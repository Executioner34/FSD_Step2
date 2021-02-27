let likeButton = $('.js-like-button__button');
let likeHeart = $('.js-like-button__like');
let likeNumber = $('.js-like-button__number');

$(likeButton).on('click', function(event) {
	let button = $(event.target).closest(likeButton);
	let heart = button.find(likeHeart);
	let numClass = button.find(likeNumber);
	let valueNum = numClass.text();
	if (button) {
		button.toggleClass('button--active');
		heart.toggleClass('like--active');
		(heart.text() === 'favorite_border') ? heart.text('favorite') : heart.text('favorite_border')
		numClass.toggleClass('number--active');
		(numClass.hasClass('number--active')) ? numClass.text(parseInt(valueNum) + 1) : numClass.text(parseInt(valueNum) - 1);
	}
});








