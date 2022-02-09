let maincart = document.getElementById("maincart");
let subtotal = document.getElementById("subtotal");
let placeorder = document.getElementById("placeorder");
let user;

function updatecart(element) {
  var url = "/updatecart";
  var data = { productID: element.target.id };
  data = JSON.stringify(data);
  var params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/cart";
    });
}

function updatequantity(element) {
  var url = "/updateQuantity";
  var data = { productID: element.target.id, quantity: element.target.value };
  data = JSON.stringify(data);
  var params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/cart";
    });
}
function cart() {
  fetch("/getUser")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      user = data;
      let html = "";

      if (user.cart.length == 0) {
        let total = document.getElementById("total");
        let total1 = document.getElementById("total1");
        let sad = document.getElementById("sad");
        let html1 = `<img class="ml-md-5" src="images/sad.gif" width=200  alt=""> <p class="mt-md-5 h1" style="display:inline-block;">Oops! Your cart is Empty. </p>`;
        total.style.display = "none";
        total1.style.display = "block";

        sad.innerHTML = html1;
      }
      let sub = 0;

      for (var i = 0; i < user.cart.length; i++) {
        //    console.log(user.cart[i]);
        let a = Number(user.cart[i].productPrice);
        let b = Number(user.cart[i].quantity);
        let sum = a * b;
        sub += sum;
        if (i == 0) {
          html += `
        <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Subtotal</th>
    </tr>
        <tr>
          <td>
              <div class="cart-info">
                  <img src="uploads/${user.cart[i].productImageName}" width="100" alt="">
                  <div>
                      <p style="margin-bottom:2px;">${user.cart[i].productName}</p>
                      <small style="font-weight:500;" >Price:₹ <span id="price">${user.cart[i].productPrice}</span> </small>
                      <br>
                      <small class="m-0" style="font-weight:500;" >Size: <span id="size">${user.cart[i].productSize}</span> </small>
                      <br>
                      <a href="" class="m-0 remove" id="${user.cart[i].productId}">Remove ✘</a>
                  </div>
              </div>
          </td>
          <td><input type="number"  value="${user.cart[i].quantity}" class="updateQuantity" id="${user.cart[i].productId}" min="1" style="width: 50px;" onkeydown="return false"></td>
          <td>₹ &nbsp;<span id="">${sum}</span></td>
         </tr>
         `;
        } else {
          html += `

        <tr>
          <td>
              <div class="cart-info">
                  <img src="uploads/${user.cart[i].productImageName}" width="100" alt="">
                  <div>
                      <p style="margin-bottom:2px;">${user.cart[i].productName}</p>
                      <small style="font-weight:500;" >Price:₹ <span id="price">${user.cart[i].productPrice}</span> </small>
                      <br>
                      <small class="m-0" style="font-weight:500;" >Size: <span id="size">${user.cart[i].productSize}</span> </small>
                      <br>
                      <a href="" class="m-0 remove" id="">Remove ✘</a>
                  </div>
              </div>
          </td>
          <td><input type="number" value="${user.cart[i].quantity}" class="updateQuantity" id="${user.cart[i].productId}" min="1" style="width: 100px;"></td>
          <td>₹ &nbsp;<span id="">${sum}</span></td>
         </tr>
         `;
        }
      }
      maincart.innerHTML = html;
      subtotal.innerHTML = sub;

      let quantities = document.querySelectorAll(".updateQuantity");
      for (var i = 0; i < quantities.length; i++) {
        quantities[i].addEventListener("input", function (element) {
          updatequantity(element);
        });
      }
      let removes = document.querySelectorAll(".remove");
      for (var i = 0; i < removes.length; i++) {
        removes[i].addEventListener("click", function (element) {
          updatecart(element);
        });
      }
    });
}
cart();

placeorder.addEventListener("click",function(){
  const myTimeout = setTimeout(placed, 3000);

  function placed(){
    fetch("/orderplaced")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("hello");
      window.location.href="/products";

    })

  }
})
