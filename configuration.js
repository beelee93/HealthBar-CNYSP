// If you want to add extra key bindings, this is where 
// you put them

/**********************************************
 * Format:
 * ----------------------------------------
 * "<LetterKey> <command> <argument1> <argument2> ...
 * (see below for examples, not case-sensitive)
 *
 * Legend:
 * ---------------------------------------- 
 * <..>     required argument
 * [..]     optional argument
 * ../..    choose between one of the choices
 *
 * Available commands (and their arguments):
 * ----------------------------------------
 * changeHealth <integer> [color] [sndCorrect/sndWrong]
 *      changes the HP value by the specified amount
 *      specifying a CSS colour will flash the
 *      entire screen with that colour
 *
 * curse
 *      toggle the curse
 **********************************************/

var globalKeyBindings = [
"A changeHealth -10 green sndCorrect",      // subtract 5 HP, with green screen indicator
"R changeHealth 100",                       // reset, with no screen indicator
"D changeHealth 0 red sndWrong",
"J playSound sndBadumtss",
"L playFrozen",
"B bomb",
"C curse"                                   // toggle curse
];