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

function resistorValue(first, second, third, fourth, fifth) {
    
}

window.onload = function() {
    var first  = document.getElementById("first");
    var second = document.getElementById("second");
    var third  = document.getElementById("third");
    var fourth = document.getElementById("fourth");
    for(var color in colors) {
	var n = colors[color].value;	
	var colorOption = document.createElement("option");
	colorOption.appendChild(document.createTextNode(color));
	if(n >= 0) {
	    colorOption.setAttribute("value", n);
	    first.appendChild(colorOption);
	    second.appendChild(colorOption.cloneNode(true));
	}
    }
};
