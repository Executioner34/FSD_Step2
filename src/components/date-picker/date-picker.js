import {DropDown} from '../dropdown/dropdown';

new DropDown($('.js-dropdown--guests').eq(0), {
	maxValue: 3,
	isGuests: true,
	data: [
		{ name: 'взрослые', defaultCount: 0 },
		{ name: 'дети', defaultCount: 0 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})