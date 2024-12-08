/* Javascript Code */

/* Set up Event listeners and functions */
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", calculatePercentiles)
const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", clear)

function calculatePercentiles () {	
	/* Setup girl's weight and height arrays */
	const girlWeight = [
		[0, 7.13, 1.01],
		[1, 9.23, 1.27],
		[2, 11.31, 1.47],
		[3, 12.89, 1.63],
		[4, 14.16, 1.76],
		[5, 15.21, 1.87],
		[6, 16.09, 1.96],
		[7, 16.85, 2.05],
		[8, 17.52, 2.13],
		[9, 18.13, 2.21],
		[10, 18.7, 2.29],
		[11, 19.22, 2.35],
		[12, 19.73, 2.42],
		[13, 20.22, 2.48],
		[14, 20.69, 2.54],
		[15, 21.17, 2.6],
		[16, 21.63, 2.66],
		[17, 22.1, 2.72],
		[18, 22.56, 2.78],
		[19, 23.01, 2.83],
		[20, 23.47, 2.89],
		[21, 23.93, 2.95],
		[22, 24.38, 3.01],
		[23, 24.84, 3.07],
		[24, 25.3, 3.14]
	];

	const girlHeight = [
		[0, 19.35, 0.73],
		[1, 21.14, 0.77],
		[2, 22.47, 0.8],
		[3, 23.54, 0.83],
		[4, 24.44, 0.85],
		[5, 25.21, 0.87],
		[6, 25.88, 0.89],
		[7, 26.49, 0.91],
		[8, 27.07, 0.93],
		[9, 27.62, 0.95],
		[10, 28.14, 0.97],
		[11, 28.65, 0.99],
		[12, 29.14, 1.01],
		[13, 29.61, 1.04],
		[14, 30.07, 1.06],
		[15, 30.52, 1.08],
		[16, 30.95, 1.1],
		[17, 31.37, 1.12],
		[18, 31.77, 1.14],
		[19, 32.17, 1.16],
		[20, 32.56, 1.19],
		[21, 32.94, 1.21],
		[22, 33.31, 1.23],
		[23, 33.67, 1.25],
		[24, 34.02, 1.27]		
	];

	const boyWeight = [

	];

	const boyHeight = [
		
	];

	/* get child data from browser input */
	let age = document.getElementById("age");
	let sex = document.querySelector('input[name="sex"]:checked');
	let weight = document.getElementById("weight");
	let height = document.getElementById("height");

	/* redefine variables into values */
	var jsAge = parseFloat(age.value);
	var jsWeight = parseFloat(weight.value);
	var jsHeight = parseFloat(height.value);
	
	if (jsAge>0 && sex) {
		if(jsAge<1 || jsAge>24) {
			document.getElementById("percentile").innerHTML = "Please enter an age between 1 and 24 months.";
			document.getElementById("averages").innerHTML = "";
			} else {
				/* Get means and standard deviations for child's age */
				var sexValue = sex.value;	
				switch (sexValue) {
					case "Girl":
						var weightMean = girlWeight[jsAge][1];
						var weightStDev = girlWeight[jsAge][2];
						var heightMean = girlHeight[jsAge][1];
						var heightStDev = girlHeight[jsAge][2];

						break
					case "Boy":
						var weightMean = boyWeight[jsAge][1];
						var weightStDev = boyWeight[jsAge][2];
						var heightMean = boyHeight[jsAge][1];
						var heightStDev = boyHeight[jsAge][2];
				}
				/* Use z-score formula and Jstat cdf function to determine z-score and percentiles */
				var weightzScore = (jsWeight - weightMean)/weightStDev;
				var weightPerc = Math.round(jStat.normal.cdf(weightzScore,0,1)*100);
				var heightzScore = (jsHeight - heightMean)/heightStDev;
				var heightPerc = Math.round(jStat.normal.cdf(heightzScore,0,1)*100);

				//return (`${weightMean} and ${heightMean}`);
				document.getElementById("percentile").innerHTML = (`Your ${sexValue} is in the ${weightPerc}th percentile for weight and ${heightPerc}th percentile for height`)
				document.getElementById("averages").innerHTML = (`The average weight is ${weightMean} pounds and average height is ${heightMean} inches for ${sexValue}s that are ${jsAge} months old`);
			}
	} else {
		alert("PLEASE FILL OUT EACH FIELD");
	}
}


function clear () {
	location.reload();
}