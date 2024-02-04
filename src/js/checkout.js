import { loadHeaderFooter } from "./utils.mjs";
import  CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

CheckoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    CheckoutProcess.calculateOrdertotal.bind(CheckoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  /* var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status)*/
  // e.target would contain our form in this case
  CheckoutProcess.checkout(e.target);
});

// listening for click on the button
// document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
//   e.preventDefault();

//   checkoutProcess.checkout(document.forms['checkout']);
// });
