class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = (`
      <nav class = topnav>
        <ul>
          <li class = "logo"> NewtriFacts</li>
          <li class = "menu_btn"><span class = "fa fa-bars" onCLick = menuClick()></span></li>
          <div class="nav_items" id = "nav_items">
            <li><a href="home.html">Home</a></li>
            <li><a href="about_us.html">About Us</a></li>
            <li><a href="Cheatsheet.html">Cheatsheet</a></li>
            <li><a href="DataEntry.html">Data Entry</a></li>
            <li><a href="barcode_scanner.html">Barcode Scan</a></li>
            <li><a href="help.html">Help</a></li>
          </div>
          <li class = "search">
            <input type="search" id = "search_bar" placeholder="Search.."></input>
            <label class="icon" id = "search_btn" onclick = search_food(document.getElementById("search_bar").value)>
              <span class = "fa fa-search" ></span>
            </label>
          </li>
        </ul>
      </nav>
      <br>
      <br>`);
  }
}

customElements.define('header-component', Header);

function menuClick() {
  var x = document.getElementById("nav_items");
  if (x.className === "nav_items") {
    x.className += " show";
  } else {
    x.className = "nav_items";
  }
}
function search_food(q) {
  sessionStorage.setItem("query", q);
  console.log(sessionStorage.getItem("query"));
  window.location.href = "./search.html";
}
window.onload = function() {
  var search_bar = document.getElementById("search_bar");
  if(search_bar) {
    search_bar.addEventListener("keyup", function(event) {
      if(event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search_btn").click();
      }
    });
  }
  else {
    console.log("No search bar found");
  }

}
