function FizzBuzz(length){
  var i, j, x;
  var y="";
  var list = [{num:3, word:"Fizz"}, {num:5, word:"Buzz"}];
  if(!length){
     length = 100;
  }
  for(i=1; i <= length; i++){
    x = "";
    for(j=0; j < list.length; j++){
      if(i % list[j].num === 0){
        x += list[j].word;
      }
    }
    if(x){
      y += x + "<br />";
    }
  }
  return(y);
}