import '../../../node_modules/item-quantity-dropdown/lib/item-quantity-dropdown.min';
import '../../../node_modules/item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {
	$('.iqdropdown').iqDropdown({
		selectionText: 'Комната',
		textPlural: 'Комнаты',
		controls: {
			position: 'right',
			displayCls: 'dropdown__item-display',
			controlsCls: 'dropdown__item-controls',
			counterCls: 'dropdown__value'
		},
	});
});