import {DropDown} from '../dropdown/dropdown';

new DropDown($('.js-dropdown--guests').eq(1), {
	maxValue: 3,
	isGuests: true,
	data: [
		{ name: 'взрослые', defaultCount: 2 },
		{ name: 'дети', defaultCount: 1 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})

