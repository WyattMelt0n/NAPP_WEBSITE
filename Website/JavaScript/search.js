const params = {
  api_key: 'S6GGLMdV8t05aJxrW1j6Zu4vdxqZEn32XJrLYmyB',
  dataType: 'Branded',
  query: sessionStorage.getItem("query"),
  pageSize: 1
}
const api_url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + params.api_key + '&dataType=' + params.dataType + '&query=' + params.query;

var data;
var index = 0;

getData();

async function getData() {
  const response = await fetch(api_url);
  data = await response.json();

  document.getElementById("query").innerHTML = params.query;
  document.getElementById("hits").innerHTML = data.totalHits;

  if(data.totalHits == 0) {
    alert("No results found! Try again!");
  }
  else if (data.totalHits == 1) {
    search_food(0);
  }
  else if (data.totalHits > 1){
    var arr = data.foods;
    var myList = document.getElementById("result_UL");

    console.log(arr)

    arr.forEach(function(item) {

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute('class', 'links');
      a.setAttribute('id', index);
      a.setAttribute("onclick", "return search_food(this.id)");
      a.setAttribute("href", "");
      a.innerText = item.description;
      li.appendChild(a);
      myList.appendChild(li);

      index += 1;
    });
  }
}

function search_food(d) {
  sessionStorage.setItem("food_data", JSON.stringify(data.foods[d]));
  window.location.href = "./result.html";
  return false;
}
