/*--------------------------------------------------------------------------------*
 * Resistor Color Code                                                            *
 * Eiki Martinson                                                                 * 
 * July 10, 2015                                                                  *
 *--------------------------------------------------------------------------------*/

function Color(value, isValidMultiplier, tolerance, hexCSSColor) {
    this.value = value;
    this.isValidMultiplier = isValidMultiplier;
    this.tolerance = tolerance;
    this.hexCSSColor = hexCSSColor;
}

var colors = {};
colors["black"]  = new Color(0,  true,  null,   "000000");
colors["brown"]  = new Color(1,  true,  "1",    "664842");
colors["red"]    = new Color(2,  true,  "2",    "D92121");
colors["orange"] = new Color(3,  true,  null,   "FF9933");
colors["yellow"] = new Color(4,  true,  null,   "F2DF0D");
colors["green"]  = new Color(5,  true,  "0.5",  "66CC66");
colors["blue"]   = new Color(6,  true,  "0.25", "5C73E6");
colors["violet"] = new Color(7,  true,  "0.10", "C261F2");
colors["grey"]   = new Color(8,  false, "0.05", "939393");
colors["white"]  = new Color(9,  false, null,   "FFFFFF");
colors["gold"]   = new Color(-1, true,  "5",    "CD9933");
colors["silver"] = new Color(-2, true,  "10",   "CCCCCC");

function multiplier(x, p, n) {
    var xstr = "";
    x = x * Math.pow(10, p);
    console.log("x = " + x);
    if(x >= 0 && x < 1e3) {
	xstr = x.toPrecision(n)/1;
	console.log(xstr);
    }
    else if(x >= 1e3 && x < 1e6) {
	xstr = x.toPrecision(n)/1e3 + "K";
    }
    else if(x >= 1e6 && x < 1e9) {
	xstr = x.toPrecision(n)/1e6 + "M";
    }
    else if(x >= 1e9 && x < 1e12) {
	xstr = x.toPrecision(n)/1e9 + "G";
    }
    else {
	return undefined;
    }
    return xstr;
}

function resistorValue(n) {
    var bands = [];
    var r, tolerance, power;
    if(n === 4) {
	bands[0] = document.getElementById("first4").value;
	bands[1] = document.getElementById("second4").value;
	power = document.getElementById("third4").value;
	tolerance = document.getElementById("fourth4").value;
	r = (bands[0]*10 + bands[1]*1);
    }
    else if(n === 5) {
	bands[0] = document.getElementById("first5").value;
	bands[1] = document.getElementById("second5").value;
	bands[2] = document.getElementById("third5").value;
	power = document.getElementById("fourth5").value;
	tolerance = document.getElementById("fifth5").value;
	r = (bands[0]*100 + bands[1]*10 + bands[2]*1);
    }
    else {
	return undefined;
    }
    var valueDisplay = document.getElementById("resistorValue").childNodes[0];
    valueDisplay.nodeValue = "";
    valueDisplay.nodeValue = multiplier(r, power, n-2) + String.fromCharCode(937) + " " + 
	String.fromCharCode(177) + tolerance + "%";
}

function toggleBands(n) {
    var fourBand = document.getElementById("fourband");
    var fiveBand = document.getElementById("fiveband");
    var fourRadio = document.getElementById("fourbands");
    var fiveRadio = document.getElementById("fivebands");
    if(n === 4) {
	fourRadio.checked = true;
	fourBand.style.display = "block";
	fiveBand.style.display = "none";
	resistorValue(4);
	return true;
    }
    else if(n === 5) {
	fiveRadio.checked = true;
	fourBand.style.display = "none";
	fiveBand.style.display = "block";
	resistorValue(5);
	return true;
    }
    else {
	return false;
    }    
}

function colorize(option, color) {
    option.style.background = "#" + color;
    var red = color.substring(0,2);
    var green = color.substring(2,2);
    var blue = color.substring(4,2);    
    if(red+green+blue < 384) { //for contrast against dark backgrounds
	option.style.color = "#FFF";
    }
}

window.onload = function() {

    $fiveradio = document.getElementById("lifivebands");
    $fiveradio.onclick = function() { toggleBands(5) };
    $fourradio = document.getElementById("lifourbands");
    $fourradio.onclick = function() { toggleBands(4) };

    toggleBands(4);
    
    var first4  = document.getElementById("first4");
    first4.onchange = function() { resistorValue(4) };
    var second4 = document.getElementById("second4");
    second4.onchange = function() { resistorValue(4) };
    var third4  = document.getElementById("third4");
    third4.onchange = function() { resistorValue(4) };
    var fourth4 = document.getElementById("fourth4");
    fourth4.onchange = function() { resistorValue(4) };
    var first5  = document.getElementById("first5");
    first5.onchange = function() { resistorValue(5) };
    var second5 = document.getElementById("second5");
    second5.onchange = function() { resistorValue(5) };
    var third5  = document.getElementById("third5");
    third5.onchange = function() { resistorValue(5) };
    var fourth5 = document.getElementById("fourth5");
    fourth5.onchange = function() { resistorValue(5) };
    var fifth5  = document.getElementById("fifth5");
    fifth5.onchange = function() { resistorValue(5) };
    
    var body = document.getElementsByTagName("body");    
    var colorBar;
    var title = document.getElementsByTagName("h1");

    for(var color in colors) {
	var n = colors[color].value;
	var colorOption = document.createElement("option");	
	var hexColor = colors[color].hexCSSColor;
	colorOption.appendChild(document.createTextNode(color));
	colorOption.setAttribute("value", n);
	colorize(colorOption, hexColor);
	if(n >= 0) {
	    first4.appendChild(colorOption);
	    second4.appendChild(colorOption.cloneNode(true));
	    first5.appendChild(colorOption.cloneNode(true));
	    second5.appendChild(colorOption.cloneNode(true));
	    third5.appendChild(colorOption.cloneNode(true));	    
	}
	if(colors[color].isValidMultiplier) {
	    third4.appendChild(colorOption.cloneNode(true));
	    fourth5.appendChild(colorOption.cloneNode(true));
	}
	var toleranceOption;
	if(colors[color].tolerance) {
	    toleranceOption = document.createElement("option");
	    toleranceOption.appendChild(document.createTextNode(color));
	    toleranceOption.setAttribute("value", colors[color].tolerance);
	    colorize(toleranceOption, hexColor);
	    fourth4.appendChild(toleranceOption.cloneNode(true));
	    fifth5.appendChild(toleranceOption.cloneNode(true));
	}
	
	colorBar = document.createElement("span");
	colorBar.className = "colordecoration";
	colorBar.style.background = "#" + hexColor;
	body[0].insertBefore(colorBar, title[0]);
    }
};
