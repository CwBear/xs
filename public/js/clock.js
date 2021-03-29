function startTime()
{
miFecha = new Date() ;

var fecha= miFecha.getDate();
var hora = miFecha.getHours();
var minutos=miFecha.getMinutes();
var segundos = miFecha.getSeconds();
var anio = miFecha.getFullYear(); 
var mes= miFecha.getUTCMonth()+1;
var dia = miFecha.getUTCDate();

  mes=checkTime(mes);
  minutos=checkTime(minutos);
  
//anio+"/"+mes+"/"+
return anio+"/"+mes+"/"+dia+ " ["+hora+":"+minutos+":"+segundos+"]";
}

 
 
 
 
 


function GetClockString()
{

  var today=new Date();

  var h=today.getHours();
  var m=today.getMinutes();
  var s=today.getSeconds();
  // add a zero in front of numbers<10
  m=checkTime(m);
  s=checkTime(s);

  var year=today.getFullYear();
  if (year < 1000) year+=1900;
  var day=today.getUTCDate();
  var month=today.getUTCMonth()+1;
  var Year=today.getFullYear();

  day = checkTime(day);
  month=checkTime(month)
  
  return Year+"/"+month+"/"+day+" ["+h+":"+m+":"+s+"]";
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
