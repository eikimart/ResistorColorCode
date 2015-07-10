/*--------------------------------------------------------------------------------*
 * Resistor Color Code                                                            *
 * Eiki Martinson                                                                 * 
 * July 10, 2015                                                                  *
 *--------------------------------------------------------------------------------*/

function Color(name, value, isValidMultiplier, tolerance) {
    this.name = name;
    this.value = value;
    this.isValidMultiplier = isValidMultiplier;
    this.tolerance = tolerance;
}

var black  = new Color("black",   0, true,  null);
var brown  = new Color("brown",   1, true,  "1");
var red    = new Color("red",     2, true,  "2");
var orange = new Color("orange",  3, true,  null);
var yellow = new Color("yellow",  4, true,  null);
var green  = new Color("green",   5, true,  "0.5");
var blue   = new Color("blue",    6, true,  "0.25");
var violet = new Color("violet",  7, true,  "0.10");
var grey   = new Color("grey",    8, false, "0.05");
var white  = new Color("white",   9, false, null);
var gold   = new Color("gold",   -1, true,  "5");
var silver = new Color("silver", -2, true, "10");

function resistorValue(first, second, third, fourth, fifth) {
    
}
