// Open and close the cart 
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", ()=> {
    cart.classList.add("active")
})

closeCart.addEventListener("click", ()=> {
    cart.classList.remove("active")
})

//start when the document is ready
if(document.readyState=="loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

//==================Start=====================
function start(){
    addEvents();
}

//===================update and rerender===============
function update(){
    addEvents();
    updateTotal();
}

//=========add events=====================
function addEvents(){
    //remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click" , handle_removeCartItem);
    }) 

    //change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change" , handle_changeItemQuantity);
    })

    //add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    })

    //buy order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click" , handle_buyOrder);
    
}

//=============Handle Events Functions=========

let itemsAdded = []

function handle_addCartItem(){

    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    //handling an already existing item in the cart
    if(itemsAdded.find(el => el.title == newToAdd.title )){
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'You have already added this item',
            showConfirmButton: false,
            timer: 1500
          })
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    //add product to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Item was added to the cart',
        showConfirmButton: false,
        timer: 1500
      })

    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart-product-title').innerHTML);
    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);  //to keep it integer

    update();
}

function handle_buyOrder(){
    //checking if the cart is empty
    if(itemsAdded.length <= 0){
        alert("Your cart is empty! \nPlease add items to your cart to buy them. ");
        return;
    }

    if(inputValidation()==true){
        //assigning user input to variables
        const name = document.getElementById("cust-name").value;
        localStorage.setItem("customerName",name);
        const email = document.getElementById("cust-email").value;
        localStorage.setItem("customerEmail",email);
        const address = document.getElementById("cust-address").value;
        localStorage.setItem("customerAddress",address);

        window.location.href="checkout.html";
    }

    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    const nameContent = document.querySelector('#cust-name');
    const emailContent = document.querySelector('#cust-email');
    const addressContent = document.querySelector('#cust-address');
    nameContent.value = '';
    emailContent.value = '';
    addressContent.value = '';
    
    itemsAdded = [];

    update();
}

//validation of the name and email feilds 
function inputValidation(){
    var name = document.getElementById("cust-name").value;
    var contact = document.getElementById("cust-email").value;
    var address = document.getElementById("cust-address").value;
    var emailRegEx = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;

    if (name === ""){
        document.getElementById("errorMsgName").innerHTML = "Please enter your name!";
        document.getElementById("cust-name").style.border = "2px solid red";
        return false;
    }
    else{
        document.getElementById("errorMsgName").innerHTML = " ";
        document.getElementById("cust-name").style.border = "2px solid green";

        if(!emailRegEx.test(contact)){
            document.getElementById("errorMsgMail").innerHTML = "Please enter a valid email address!";
            document.getElementById("cust-email").style.border = "2px solid red";
            return false;
        }
        else{
            document.getElementById("errorMsgMail").innerHTML = "";
            document.getElementById("cust-email").style.border = "2px solid green";

            if (address === ""){
                document.getElementById("errorMsgAddress").innerHTML = "Please enter your address!";
                document.getElementById("cust-address").style.border = "2px solid red";
                return false;
            }
            else{
                document.getElementById("errorMsgAddress").innerHTML = "";
                document.getElementById("cust-address").style.border = "2px solid green";
                return true
            }
        }
    }
}

//==============update and rerender functions=================
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = document.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector('.cart-quantity').value ;
        total += price*quantity;
        localStorage.setItem("customerTotal",total);
    })

    //keep 2 digits after the decimal point
    total = total.toFixed(2); 
    
    totalElement.innerHTML = "$" + total;
    
}

//===========HTML Components======================
function CartBoxComponent(title,price,imgSrc){
    return `
        <div class="cart-box">
            <img src=${imgSrc} alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- Remove Cart  -->
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`
}
