import 'jquery';
import '../../components/textForm/textForm';
import '../../components/checkbox-list/checkbox-list';
import {DropDown} from '../../components/dropdown/dropdown';
import './search-room.scss';

new DropDown($('.js-dropdown--guests'), {
	maxValue: 3,
	isGuests: true,
	data: [
		{ name: 'Спальни', defaultCount: 2 },
		{ name: 'Кровати', defaultCount: 2 },
		{ name: 'Ванные комнаты', defaultCount: 0 },
	]
})

new DropDown($('.js-dropdown'), {
	maxValue: 3,
	data: [
		{ name: 'взрослые', defaultCount: 2 },
		{ name: 'дети', defaultCount: 1 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})
