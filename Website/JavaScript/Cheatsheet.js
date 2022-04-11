/*
  This function will calculate data based on Jeff Novick's guidelines for reading
  nutrition labels. The calculated data will then be displayed onto the table in the linked
  HTML file.
*/

function do_calc(){
  var slider = document.getElementById("range_slider");
  var num = slider.value;

  document.getElementById("res1").innerHTML = num + "cal";
  //Preferred max amount of Total Fat should be 2 grams for every 100 Calories.
  document.getElementById("res2").innerHTML = ((Math.round(num * 0.02) * 2) / 2).toFixed(1) + "g";
  //Preferred max amount of Saturated Fat should always be 0.5 grams for every 100 Calories.
  document.getElementById("res3").innerHTML = ((Math.round(num * 0.01) * 2) / 2).toFixed(1) + "g";
  //Preferred max amount of Trans Fat should always be 0!
  document.getElementById("res4").innerHTML = 0 + "g";
  //Preferred max amount of Cholesterol should be 25 mg per day.
  document.getElementById("res5").innerHTML = 25 + "mg/day";
  //Preferred max amount of Added Sugar, like Total Fat, should be 2 grams per 100 Calories.
  document.getElementById("res6").innerHTML = ((Math.round(num * 0.02)*2)/2).toFixed(1) + "g";
  //Preferred max amount of Sodium should be 100 mg for every 100 Calories.
  document.getElementById("res7").innerHTML = num + "mg";
  //Preferred MINIMUM amount of Fiber should be 3 grams for every 100 Calories.
  document.getElementById("res8").innerHTML = Math.round(num * 0.02).toFixed(1) + "g";

}
