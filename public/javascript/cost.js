var totalCost = document.querySelector("#total-cost");
var quantityElement = document.querySelector("#quantity");


quantityElement.addEventListener("change", function(event) {
    
    totalCost.value = (quantityElement.value * 10.00).toFixed(2);
});
