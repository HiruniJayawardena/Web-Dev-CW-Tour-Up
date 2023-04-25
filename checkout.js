
const amount = document.getElementById("total");
var amt = localStorage.getItem("customerTotal");
amount.innerHTML = "Amount : $ " + amt;

const address = document.getElementById("address");
var shipping_address = localStorage.getItem("customerAddress");
address.innerHTML = "Shipping Address: " + shipping_address;

const contact = document.getElementById("contact");
var contact_details = localStorage.getItem("customerEmail");
contact.innerHTML = "Contact Details: " + contact_details;

const Cname = document.getElementById("name");
var cust_name = localStorage.getItem("customerName");
Cname.innerHTML = "Name: " + cust_name;

//placing the order
const checkout_btn = document.querySelector(".submit-btn");
checkout_btn.addEventListener("click" , handle_checkout);


function validateCardDetails(){
  var nameOnCard = document.getElementById("cardholderName").value;
  var cardNum = document.getElementById("cardNumber").value;
  var expiryMonthAndYear = document.getElementById("exp").value;
  var CVV = document.getElementById("cvv").value;

  const nameRegEx = /^((?:[A-Za-z]+ ?){1,3})$/;
  const cardNumberRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const cvvRegEx = /^[0-9]{3,4}$/;

  if(!nameRegEx.test(nameOnCard)){
    document.getElementById("errorMsgName").innerHTML = "Name is required!";
    document.getElementById("cardholderName").style.border = "2px solid red";
    return false;
  }
  else{
    document.getElementById("cardholderName").style.border = "2px solid green";
    document.getElementById("errorMsgName").innerHTML = "";

    //card number validation
    if(!cardNumberRegEx.test(cardNum)){
      document.getElementById("errorMsgCard").innerHTML = "Please enter a valid card number!";
      document.getElementById("cardNumber").style.border = "2px solid red";
      return false;
    }
    else{
      document.getElementById("errorMsgCard").innerHTML = "";
      document.getElementById("cardNumber").style.border = "2px solid green";

      //date validation
      if(expiryMonthAndYear === ""){
        document.getElementById("errorMsgDate").innerHTML = "Please enter a valid date!";
        document.getElementById("exp").style.border = "2px solid red";
        return false;
      }
      else{
        document.getElementById("errorMsgDate").innerHTML = "";
        document.getElementById("exp").style.border = "2px solid green";

        //cvv validation
        if(!cvvRegEx.test(CVV)){
          document.getElementById("errorMsgCVV").innerHTML = "Please enter a valid CVV!";
          document.getElementById("cvv").style.border = "2px solid red";
          return false;
        }
        else{
          document.getElementById("errorMsgCVV").innerHTML = "";
          document.getElementById("cvv").style.border = "2px solid green";
          return true;
         
        }
      }
    }
  }
}



function validateBillingAddress(){
  var address1 = document.getElementById("line1").value;
  var address4 = document.getElementById("line4").value;
  var address6 = document.getElementById("line6").value;
  var address7 = document.getElementById("country").value;

  if(address1 === ""){
    document.getElementById("errorMsgAddress").innerHTML = "Please enter the address!";
    document.getElementById("line1").style.border = "2px solid red";
    return false;
  } 
  else{
    document.getElementById("errorMsgAddress").innerHTML = "";
    document.getElementById("line1").style.border = "2px solid green";

    //town/city
    if(address4 === ""){
      document.getElementById("errorMsgTown").innerHTML = "Please enter the town or city!";
      document.getElementById("line4").style.border = "2px solid red";
      return false;
    }
    else{
      document.getElementById("errorMsgTown").innerHTML = "";
      document.getElementById("line4").style.border = "2px solid green";

      //postal code
      if(address6 === ""){
        document.getElementById("errorMsgPostalCode").innerHTML = "Please enter the postal code!";
        document.getElementById("line6").style.border = "2px solid red";
        return false;
      }
      else{
        document.getElementById("errorMsgPostalCode").innerHTML = "";
        document.getElementById("line6").style.border = "2px solid green";

        //country
        if(address7 === "Select a country ..."){
          document.getElementById("errorMsgCountry").innerHTML = "Please enter the country!";
          document.getElementById("country").style.border = "2px solid red";
          return false;
        }
        else{
          document.getElementById("errorMsgCountry").innerHTML = "";
          document.getElementById("country").style.border = "2px solid green";
          return true;
        }
      }
    }
  }

}

function validateContactDetails(){
  var contact1 = document.getElementById("line8").value;
  var contact2 = document.getElementById("line9").value;

  var emailRegEx = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
  var mobileRegEx = /^([+]\d{2}[ ])?\d{10}$/;

  if(!emailRegEx.test(contact1)){
    document.getElementById("errorMsgMail").innerHTML = "Please enter the valid email address!";
    document.getElementById("line8").style.border = "2px solid red";
    return false;
    }
  else{
    document.getElementById("errorMsgMail").innerHTML = "";
    document.getElementById("line8").style.border = "2px solid green";
    
    if(!mobileRegEx.test(contact2)){
      document.getElementById("errorMsgMobile").innerHTML = "Please enter the phone number!";
      document.getElementById("line9").style.border = "2px solid red";
      return false;
    }
    else{
      document.getElementById("errorMsgMobile").innerHTML = "";
      document.getElementById("line9").style.border = "2px solid green";
    }
  
  }
}

function handle_checkout(){
  if(validateCardDetails() == true && validateBillingAddress() == true && validateContactDetails() == true){
    Swal.fire(
      'You have placed the order successfully!',
      ' ',
      'success'
    )
  }
}
