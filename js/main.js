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
		[0, 7.38, 1.08],
		[1, 9.86, 1.32],
		[2, 12.27, 1.52],
		[3, 14.06, 1.65],
		[4, 15.44, 1.75],
		[5, 16.56, 1.83],
		[6, 17.49, 1.92],
		[7, 18.29, 1.99],
		[8, 18.99, 2.07],
		[9, 19.62, 2.14],
		[10, 20.21, 2.2],
		[11, 20.75, 2.26],
		[12, 21.27, 2.32],
		[13, 21.77, 2.38],
		[14, 22.26, 2.44],
		[15, 22.73, 2.5],
		[16, 23.2, 2.56],
		[17, 23.66, 2.62],
		[18, 24.12, 2.68],
		[19, 24.57, 2.74],
		[20, 25.01, 2.8],
		[21, 25.46, 2.87],
		[22, 25.91, 2.93],
		[23, 26.35, 3],
		[24, 26.79, 3.06]
	];

	const boyHeight = [
		[0, 19.64, 0.75],
		[1, 21.55, 0.77],
		[2, 23, 0.79],
		[3, 24.18, 0.8],
		[4, 25.15, 0.82],
		[5, 25.95, 0.83],
		[6, 26.62, 0.84],
		[7, 27.23, 0.85],
		[8, 27.8, 0.87],
		[9, 28.33, 0.88],
		[10, 28.85, 0.9],
		[11, 29.35, 0.92],
		[12, 29.82, 0.94],
		[13, 30.28, 0.96],
		[14, 30.73, 0.98],
		[15, 31.16, 1],
		[16, 31.58, 1.02],
		[17, 31.99, 1.04],
		[18, 32.39, 1.06],
		[19, 32.77, 1.08],
		[20, 33.15, 1.11],
		[21, 33.52, 1.13],
		[22, 33.88, 1.16],
		[23, 34.23, 1.18],
		[24, 34.57, 1.2]
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