import 'jquery';
import '../../components/checkbox-list/checkbox-list';
import '../../components/textForm/textForm'
import '../../components/like-button/like-button';
import './form-elements.scss';
import {DropDown} from '../../components/dropdown/dropdown';

new DropDown($('.js-dropdown'), {
	maxValue: 3,
	text: 'Default',
	data: [
		{ name: 'Спальни', defaultCount: 2 },
		{ name: 'Кровати', defaultCount: 2 },
		{ name: 'Ванные комнаты', defaultCount: 0 },
	]
})

new DropDown($('.js-dropdown--open'), {
	maxValue: 3,
	isOpen: true,
	text: 'expanded',
	data: [
		{ name: 'Спальни', defaultCount: 2 },
		{ name: 'Кровати', defaultCount: 2 },
		{ name: 'Ванные комнаты', defaultCount: 0 },
	]
})

new DropDown($('.js-dropdown--guests').eq(0), {
	maxValue: 3,
	isOpen: true,
	isGuests: true,
	data: [
		{ name: 'взрослые', defaultCount: 0 },
		{ name: 'дети', defaultCount: 0 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})

new DropDown($('.js-dropdown--guests').eq(1), {
	maxValue: 3,
	isOpen: true,
	isGuests: true,
	data: [
		{ name: 'взрослые', defaultCount: 2 },
		{ name: 'дети', defaultCount: 1 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})
