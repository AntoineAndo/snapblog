/*var date = new Date();
console.log(date);



date.addHours = function(expCountdown){
    this.setHours(this.getMonth()+expCountdown)
    return this;
};
var expDate = date.addHours(5);
console.log(expDate);*/

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var test = makeid();

console.log(test);
