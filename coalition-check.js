
function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}

function mplus()
{
  var yl = parseFloat(document.getElementById("slider7").value);
  var b = parseFloat(document.getElementById("slider8").value);
  var d = 1;
  var yh = 10;
  var rad = (yh+b)**2-4*d*(yh+b-yl)*yl;
  var pplus = (rad>=0) ? Math.min((1/2)*(yh+b+Math.sqrt(rad)),yh) : Math.min((1/2)*(yh+b-Math.sqrt(-rad)),yh);
  var mplus = yl/(yh-pplus+yl);
  var v=mplus*pplus+(1-mplus)*yl;
  var y=yl/yh*pplus+(1-yl/yh)*yl;
  document.getElementById("print").innerHTML = [mplus,v,y];
}


function myCoalition()
{
  myPlot = document.getElementById("coalition");
  var yl = parseFloat(document.getElementById("slider7").value);
  var b = parseFloat(document.getElementById("slider8").value);
  var d = 1;
  var yh = 10;


  var xArray = [0,1,yl/yh,0];
  var yArray = [yl,yh,yl,yl];

  var name1 = "The limit set of" + "$V_A$" + "under unanimity";

  var trace1 = {
    x:xArray,
    y:yArray,
    fill: 'tozeroy',
    fillcolor: "4D9AD4",
    mode:"lines",
    line: {
      color: "4D9AD4"
    },
    name: name1,
  };

  var muArray = linspace(0, 1, 200);
  var ymArray = [];

  var rad = (yh+b)**2-4*d*(yh+b-yl)*yl;
  var pplus = (rad>=0) ? Math.min((1/2)*(yh+b+Math.sqrt(rad)),yh) : Math.min((1/2)*(yh+b-Math.sqrt(-rad)),yh);
  var mplus = yl/(yh-pplus+yl);

  var muArray = linspace(0, 1, 200);
  var ymArray = [];

  for ( var i = 0 ; i < muArray.length ; i++ ) {
    var result = (yh<=2*yl+b)*((muArray[i]<=(yl+b)/(yh+b))*(yl+b) + (muArray[i]>(yl+b)/(yh+b))*muArray[i]*(yh+b)) + (yh>2*yl+b)*((muArray[i]<=1/2)*(muArray[i]*(yh-yl)+(1-muArray[i])*(yl+b)) + (muArray[i]>1/2)*muArray[i]*(yh+b));
    ymArray.push(result);
  };

  var trace2 = {
    x:muArray,
    y:ymArray,
    name: "$\\text{The limit of }V_A\\text{ under majority}$",
    mode:"lines",
    line: {color: "00205B"},
  };

  var xArray1 = (yh<=2*yl) ? [0,mplus,1,yl/yh,0] : [0,mplus,1,1/2,0];
  var xArray = (b<yl) ? xArray1 : [0,1,yl/yh,yl/yh,0];
  var yArray1 = (yh<=2*yl) ? [yl,mplus*pplus+(1-mplus)*yl,yh,yl,yl] : [yl,mplus*pplus+(1-mplus)*yl,yh,yh/2,yl];
  var yArray = (b<yl) ? yArray1 : [yl,yh,yl+yl*(yh-yl)/yh,yl,yl];

  var trace3 = {
    x:xArray,
    y:yArray,
  	fill: 'tozeroy',
    fillcolor: "4D9AD4",
    mode:"lines",
    line: {
      color: "4D9AD4"
    },
    name: "$\\text{The limit set of }V_A\\text{ under unanimity}$",
  };


  var checked = document.getElementById("check1").checked;
  var data = (checked==1) ? [trace3,trace2] : [trace1,trace2];


  let text1 = (yh<=2*yl+b) ? "$\\frac{y^\\ell+b}{y^h+b}$" : "$\\frac12$";
  let text2 = (b<yl) ? ["$0$","$\\frac{y^\\ell}{y^h}$",text1,"$\\frac12$","$\\mu^+$","$1$"] : ["$0$","$\\frac{y^\\ell}{y^h}$",text1,"$1$"];
  let text3 = (checked==1) ? text2 : ["$0$","$\\frac{y^\\ell}{y^h}$",text1,"$1$"];

  let vals2 = (b<yl) ? [0, yl/yh, (yh<=2*yl+b)*(yl+b)/(yh+b)+(yh>2*yl+b)*1/2, 1/2, mplus, 1] : [0, yl/yh, (yh<=2*yl+b)*(yl+b)/(yh+b)+(yh>2*yl+b)*1/2, 1];
  let vals3 = (checked==1) ? vals2 : [0, yl/yh, (yh<=2*yl+b)*(yl+b)/(yh+b)+(yh>2*yl+b)*1/2, 1];


  var layout = {
    xaxis: {
      range: [0, 1*1.1],
      title: "$\\text{Prior belief }\\hat\\mu$",
      tickvals: vals3,
      ticktext: text3,
      tickangle: 0,
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    yaxis: {
      range: [0, yh*2],
      title: "$\\text{Agenda-setter's expected payoff }v$",
      tickvals: [yl,yh],
      ticktext: ["$y^\\ell$","$y^h$"],
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    showlegend: true,
    legend: {
      x: 0,
      xanchor: 'left',
      y: 1,
      traceorder: "reversed",
    },
    margin: {
      l: 50,
      r: 20,
      b: 70,
      t: 70,
      pad: 4,
    },
    hovermode: false,
  };

  Plotly.react(myPlot, data, layout);
}
