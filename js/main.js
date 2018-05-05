$(document).ready(function() {

	var $imgHolder = $('#imgHolder img')

	var srcValue = $imgHolder.attr('src');

	$('#colorSelector .colorItem').on('click', function() {

		var $imgPath;

		$imgPath = $(this).attr('data-img-path');


		$imgHolder.fadeOut(100, function() {
			$imgHolder.attr('src', $imgPath).fadeIn(100);
		})

	})


	var modelSpecs, modelPrice, modelSpecsHolder, modelPriceHOlder, modelPriceHolderUSD;

	modelSpecsHolder = $('#model-specs');
	modelPriceHOlder = $('#model-price');
	modelPriceHolderUSD = $('#model-price-usd');

	modelPrice = 0;
	modelSpecs = '';

	calculatePrice();



	function calculatePrice() {

		modelPrice = parseInt($('input[name=engine]:checked', '#autoForm').val());
		modelPrice = modelPrice + parseInt($('input[name=transmission]:checked', '#autoForm').val());
		modelPrice = modelPrice + parseInt($('input[name=package]:checked', '#autoForm').val());

		console.log(modelPrice);

		modelPriceHOlder.text(addSpace(modelPrice) + ' руб');

	}


	function compileSpecs() {
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ", " + $('input[name=transmission]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ", " + $('input[name=package]:checked + label', '#autoForm').text();

		modelSpecsHolder.text(modelSpecs);
		console.log(modelSpecs);
	}



	function addSpace(nStr) {

		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';

		var reg = /(\d+)(\d{3})/;

		while (reg.test(x1)) {
			x1 = x1.replace(reg, '$1' + ' ' + '$2');
		}

		return x1 + x2;
	}



	calculatePrice();
	compileSpecs();
	$('#autoForm input').on('change', function() {
		calculatePrice();
		compileSpecs();
		calculateUSD();
	})



	var currencyURL = 'http://api.fixer.io/latest?base=USD';
	var rurUsdRate = 0;

	$.ajax({
		url: currencyURL,
		cache: false,
		success: function(html) {
			// console.log(html.rates.RUB);
			rurUsdRate = html.rates.RUB;
			calculateUSD();
		}
	})



	function calculateUSD() {
		var modelPriceUSD = modelPrice / rurUsdRate;
		console.log(modelPriceUSD);
		modelPriceHolderUSD.text("$ " + addSpace(modelPriceUSD.toFixed(0)));
	}
})