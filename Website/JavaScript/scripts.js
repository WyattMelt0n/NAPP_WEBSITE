/*
These constants are used for both calculation and/or comparison
of the ideal/acceptable amounts of each nutrition facts.
*/


const IDEAL_TOTAL_FAT_MOD = 0.015;
const IDEAL_SAT_FAT_MOD = 0.005;
const IDEAL_TRANS_FAT = 0;
const IDEAL_CHOLESTORAL = 0;
const IDEAL_FIBER_MOD = 0.03;
const IDEAL_SUGAR_MOD = 0.005;

const MAX_TOTAL_FAT_MOD = 0.02;
const MAX_SAT_FAT_MOD = 0.007;
const MAX_TRANS_FAT = 0;
const MAX_CHOLESTORAL = 25;
const MAX_SODIUM_MOD = 2;
const MAX_SUGAR_MOD = 0.02;
const MIN_FIBER_MOD = 0.02;

/*
These variables will be the placeholders for calculated data
*/

var ideal_total_fat = 0;
var total_fat = 0;
var ideal_sat_fat = 0;
var sat_fat = 0;
var ideal_sodium = 0;
var sodium = 0;
var ideal_fiber = 0;
var fiber = 0;
var ideal_sugar = 0;
var sugar = 0;

/*
  These variables store the user's inputs.
*/

var user_total_fat = 0;
var user_saturated_fat = 0;
var user_trans_fat = 0;
var user_cholesterol = 0;
var user_sodium = 0;
var user_fiber = 0;
var user_sugar = 0;


/*
  The 'calories' variable is of most importance; it
  serves as the base of every calculation done within the
  program.
*/
var calories = 0;

/*
  The following two variables are used as a status check;
  should one of these two fail, the program won't run the
  calculation function, and instead ask the user to complete or
  refill the form.
*/
var positive_values = true;
var null_values = false;

/*
  This function will take the user's data from input, and set
  them to their proper variables.
  This also checks whether any inputs has an invalid input, such as
  a negative number or a non-number input. It also checks if there are
  any null values within the form. Actions will be taken according to
  what is within the form.
*/
function send_data() {

  let elements = document.getElementById("dataForm").getElementsByTagName("input");
  for (let i = 0; i < elements.length; i++) {

    if(elements[i].value == '') {
      alert("Form is incomplete. Please fill out form and try again!");
      break;
    }
    else if (elements[i].value < 0) {
      alert("Invalid input in the " + elements[i].name + " field. Try again!")
      break;
    }
    else {
      console.log(elements[i].value);

      switch (elements[i].name) {
        case "Calories":
          calories = elements[i].value;
          console.log("Calories per serving: " + calories);
          break;
        case "Total Fat":
          user_total_fat = elements[i].value;
          console.log("Total Fat per serving: " + user_total_fat);
          break;
        case "Saturated Fat":
          user_saturated_fat = elements[i].value;
          console.log("Saturated Fat per serving: " + user_saturated_fat);
          break;
        case "Trans Fat":
          user_trans_fat = elements[i].value;
          console.log("Trans Fat per serving: " + user_trans_fat);
          break;
        case "Cholesterol":
          user_cholesterol = elements[i].value;
          console.log("Cholesterol per serving: " + user_cholesterol);
          break;
        case "Sodium":
          user_sodium = elements[i].value;
          console.log("Sodium per serving: " + user_sodium);
          break;
        case "Dietary Fiber":
          user_fiber = elements[i].value;
          console.log("Dietary Fiber per serving: " + user_fiber);
          break;
        case "Added Sugar":
          user_sugar = elements[i].value;
          console.log("Added Sugar per serving: " + user_sugar);
          calc_data();
          break;
      }
    }
  }
}

/*
  This function takes the calories from the previous function, and
  based on Jeff Novick's guidelines will perform different calculations.

  The results of these calculations are stored within their own variables.
  When finished, the display_results() function will be executed.
*/
function calc_data() {
  ideal_total_fat = parseFloat(calories * IDEAL_SAT_FAT_MOD).toPrecision(2);
  total_fat = parseFloat(calories * MAX_TOTAL_FAT_MOD).toPrecision(2);
  ideal_sat_fat = parseFloat(calories * IDEAL_SAT_FAT_MOD).toPrecision(2);
  sat_fat = parseFloat(calories * MAX_SAT_FAT_MOD).toPrecision(2);
  ideal_sodium = calories;
  sodium = (calories * MAX_SODIUM_MOD);
  ideal_fiber = parseFloat(calories * IDEAL_FIBER_MOD).toPrecision(2);
  fiber = parseFloat(calories * MIN_FIBER_MOD).toPrecision(2);
  ideal_sugar = parseFloat(calories * IDEAL_SUGAR_MOD).toPrecision(2);
  sugar = parseFloat(calories * MAX_SUGAR_MOD).toPrecision(2);

  display_results();
}

/*
  The biggest function out of all of them, the display_results()
  function displays each variables within their respected cell on the
  result table.

  At the end of most rows we execute the compare_data() function.
*/

function display_results() {
  document.getElementById("B3").innerHTML = calories;
  document.getElementById("B5").innerHTML = user_total_fat;
  document.getElementById("C5").innerHTML = "≤ " + ideal_total_fat;
  document.getElementById("D5").innerHTML = "≤ " + total_fat;
  document.getElementById("E5").innerHTML = compare_data(user_total_fat, ideal_total_fat, total_fat);
  document.getElementById("B6").innerHTML = user_saturated_fat;
  document.getElementById("C6").innerHTML = "≤ " + ideal_sat_fat;
  document.getElementById("D6").innerHTML = "≤ " + sat_fat;
  document.getElementById("E6").innerHTML = compare_data(user_saturated_fat, ideal_sat_fat, sat_fat);
  document.getElementById("B7").innerHTML = user_trans_fat;
  document.getElementById("C7").innerHTML = IDEAL_TRANS_FAT;
  document.getElementById("D7").innerHTML = MAX_TRANS_FAT;
  document.getElementById("E7").innerHTML = compare_data(user_trans_fat, IDEAL_TRANS_FAT, MAX_TRANS_FAT);
  document.getElementById("B8").innerHTML = user_cholesterol;
  document.getElementById("C8").innerHTML = IDEAL_CHOLESTORAL;
  document.getElementById("D8").innerHTML = "≤ " + MAX_CHOLESTORAL;
  document.getElementById("E8").innerHTML = compare_data(user_cholesterol, IDEAL_CHOLESTORAL, MAX_CHOLESTORAL);
  document.getElementById("B9").innerHTML = user_sodium;
  document.getElementById("C9").innerHTML = "≤ " + ideal_sodium;
  document.getElementById("D9").innerHTML = "≤ " + sodium;
  document.getElementById("E9").innerHTML = compare_data(user_sodium, ideal_sodium, sodium);
  document.getElementById("B10").innerHTML = user_fiber;
  document.getElementById("C10").innerHTML = "≥ " + ideal_fiber;
  document.getElementById("D10").innerHTML = "≥ " + fiber;
  document.getElementById("E10").innerHTML = compare_reverse(user_fiber, ideal_fiber, fiber);
  document.getElementById("B11").innerHTML = user_sugar;
  document.getElementById("C11").innerHTML = "≤ " + ideal_sugar;
  document.getElementById("D11").innerHTML = "≤ " + sugar;
  document.getElementById("E11").innerHTML = compare_data(user_sugar, ideal_sugar, sugar);

}

/*
  This function compares the user's value to both the calculated best value
  and the acceptable value, and displays a String result based on
  the comparison.
*/
function compare_data(user, best, acceptable) {
    if(user - best <= 0) {
      return "Ideal";
    }
    else if (user - best > 0 && user - acceptable <= 0) {
      return "Acceptable";
    }
    else {
      return "Not Acceptable";
    }
}

function compare_reverse(user, best, acceptable) {
  if(user >= best) {
    return "Ideal";
  }
  else if (user < best && user >= acceptable) {
    return "Acceptable";
  }
  else {
    return "Not Acceptable";
  }

}

/*
  The clear_data() function runs through each input elements within
  the form, and clears the data. This is useful if you want to check
  a new food item.
*/
function clear_data() {
  var elements = document.getElementById("dataForm").getElementsByTagName("input");
  for(var i = 0; i < elements.length; i++) {
    elements[i].value = '';
  }
}
