let checkboxListDropdown = $('.js-checkbox-list');
let list = $('.checkbox-list__list');

$(checkboxListDropdown).on('click', function(event) {
	let dropdown = $(event.target).closest(checkboxListDropdown);
	let checkboxList = dropdown.siblings(list);
	if (dropdown) {
		checkboxList.slideToggle();
	}
})