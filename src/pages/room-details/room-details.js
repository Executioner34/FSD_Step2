import 'jquery';
import '../../components/textForm/textForm';
import '../../components/like-button/like-button';
import './room-details.scss';
import { DropDown } from '../../components/dropdown/dropdown';

new DropDown($('.js-dropdown--guests'), {
	maxValue: 3,
	isGuests: true,
	data: [
		{ name: 'взрослые', defaultCount: 2 },
		{ name: 'дети', defaultCount: 1 },
		{ name: 'младенцы', defaultCount: 0 },
	]
})