//star rating
let star = document.getElementsByName('rating');
let showValue = document.querySelector('#rating-value');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

		showValue.innerHTML = "You have selected: " + i + " out of 5";
		console.log(i);
	});
}
