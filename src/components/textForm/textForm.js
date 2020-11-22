import '../../../node_modules/air-datepicker/dist/js/datepicker.min';
import '../../../node_modules/air-datepicker/dist/css/datepicker.min.css';

$('#my-datepicker').datepicker({
	navTitles: {
		days: 'MM yyyy'
	}
})

$('#minMaxExample').datepicker({
	// Можно выбрать тольо даты, идущие за сегодняшним днем, включая сегодня
	minDate: new Date()
})