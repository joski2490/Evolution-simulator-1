function validateNumber() {
    var x, text;
  
    // Get the value of the input field with id="numb"
    x = document.getElementById("numb").value;
  
    // If x is not a number or less than one or greater than 10. || means OR in JavaScript
    if (isNaN(x) || x < 1 || x > 100) {
      alert("You must give a number");
      return false;
    } else {
      return true;
    }
}
