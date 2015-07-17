/*--------------------------------------------------------------------------------*
 * Resistor Color Code                                                            *
 * Eiki Martinson                                                                 * 
 * July 10, 2015                                                                  *
 *--------------------------------------------------------------------------------*/

function Color(value, isValidMultiplier, tolerance) {
    this.value = value;
    this.isValidMultiplier = isValidMultiplier;
    this.tolerance = tolerance;
}

var colors = {};
colors["black"]  = new Color(0, true,  null);
colors["brown"]  = new Color(1, true,  "1");
colors["red"]    = new Color(2, true,  "2");
colors["orange"] = new Color(3, true,  null);
colors["yellow"] = new Color(4, true,  null);
colors["green"]  = new Color(5, true,  "0.5");
colors["blue"]   = new Color(6, true,  "0.25");
colors["violet"] = new Color(7, true,  "0.10");
colors["grey"]   = new Color(8, false, "0.05");
colors["white"]  = new Color(9, false, null);
colors["gold"]   = new Color(-1, true,  "5");
colors["silver"] = new Color(-2, true, "10");


function multiplier(x) {
    var y = Math.pow(10, x);
    var xstr;
    console.log(y);
    if(y >= 0 && y < 1e3) {
	xstr = y;
    }
    else if(y >= 1e3 && y < 1e6) {
	xstr = y/1e3;
	xstr += "K";
    }
    else if(y >= 1e6 && y < 1e9) {
	xstr = y/1e6;
	xstr += "M";
    }
    else {
	return undefined;
    }
    xstr += String.fromCharCode(937);
    return xstr;
}

function resistorValue(n) {
    var bands = [];
    var r;
    if(n === 4) {
	bands[0] = document.getElementById("first4").value;
	bands[1] = document.getElementById("second4").value;
	bands[2] = document.getElementById("third4").value;
	bands[3] = document.getElementById("fourth4").value;
	r = bands[0]*10 + bands[1] + " " + multiplier(bands[2]);	
    }
    else if(n === 5) {
	bands[0] = document.getElementById("first5").value;
	bands[1] = document.getElementById("second5").value;
	bands[2] = document.getElementById("third5").value;
	bands[3] = document.getElementById("fourth5").value;
	bands[4] = document.getElementById("fifth5").value;
	r = bands[0]*100 + bands[1]*10 + bands[2] + multiplier(bands[3]);
    }
    else {
	return undefined;
    }
    var valueDisplay = document.getElementById("resistorValue").childNodes[0];
    valueDisplay.nodeValue="";
    valueDisplay.nodeValue=r;
}

function toggleBands(n) {
    var fourBand = document.getElementById("fourband");
    var fiveBand = document.getElementById("fiveband");
    console.log("toggled, "+n);
    if(n === 4) {
	fourBand.style.display = "block";
	fiveBand.style.display = "none";
	return true;
    }
    else if(n === 5) {
	fourBand.style.display = "none";
	fiveBand.style.display = "block";
	return true;
    }
    else {
	return false;
    }    
}

window.onload = function() {

    document.getElementById("fivebands").onclick = function() { toggleBands(5) };
    document.getElementById("fourbands").onclick = function() { toggleBands(4) };
    document.getElementById("submit4").onclick = function() { resistorValue(4) };
    document.getElementById("submit5").onclick = function() { resistorValue(5) };

    var first4  = document.getElementById("first4");
    var second4 = document.getElementById("second4");
    var third4  = document.getElementById("third4");
    var fourth4 = document.getElementById("fourth4");
    var first5  = document.getElementById("first5");
    var second5 = document.getElementById("second5");
    var third5  = document.getElementById("third5");
    var fourth5 = document.getElementById("fourth5");
    var fifth5  = document.getElementById("fifth5");

    for(var color in colors) {
	var n = colors[color].value;
	var colorOption = document.createElement("option");
	colorOption.appendChild(document.createTextNode(color));
	colorOption.setAttribute("value", n);
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
	var t = colors[color].tolerance;
	var toleranceOption;
	if(t) {
	    toleranceOption = document.createElement("option");
	    toleranceOption.appendChild(document.createTextNode(color));
	    toleranceOption.setAttribute("value", colors[color].tolerance);
	    fourth4.appendChild(toleranceOption.cloneNode(true));
	    fifth5.appendChild(toleranceOption.cloneNode(true));
	}
    }
};
