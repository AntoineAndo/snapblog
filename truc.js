/*var date = new Date();
console.log(date);



date.addHours = function(expCountdown){
    this.setHours(this.getMonth()+expCountdown)
    return this;
};
var expDate = date.addHours(5);
console.log(expDate);*/


var expCountdown = 5;
var date = new Date();
console.log(date);
date.setHours(date.getHours()+expCountdown);
console.log(date);


