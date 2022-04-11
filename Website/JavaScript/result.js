const data = JSON.parse(sessionStorage.getItem("food_data"));


getData();

function getData() {
    console.log(data);
    document.getElementById("foodName").innerHTML= data.description;

}
