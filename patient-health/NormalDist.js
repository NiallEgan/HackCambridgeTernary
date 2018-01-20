var names;
var sums;
var sumsqs;
var counter;

var means;
var variances;

function normaldist(){
	var obj = JSON.parse(file);
	
	var observation = obj.observs;
	
	for(var key in observ){
		if key.units != "N/A"{
			for(data in key.values){
				add(key.name,data.value);
			}
		}
	}
	
	for(var i = 0; i < sums.length; i++){
		means[i] = sums[i]/counter[i];
		variances[i] = sumsqs[i]/counter[i] - means[i];
	}
}

function add(parameter,value){
	var i = names.indexOf(parameter)
	if (i != -1){
		sums[i] = sums[i] + value;
		sumsqs[i] = sumsqs[i] + value*value;
		counter[i] = counter[i] + 1;
	}else{
		names.push(parameter);
		sums.push(value);
		sumsqs.push(value*value);
		counter.push(1);
	}
}