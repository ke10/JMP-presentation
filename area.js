
function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}


function myArea()
{
  myPlot = document.getElementById("area");
  var yl = parseFloat(document.getElementById("slider1").value);
  var b = parseFloat(document.getElementById("slider2").value);
  var yh = 10;

  var xArray = [0,1,yl/yh,0];
  var yArray = [yl,yh,yl,yl];

  var muArray = linspace(0, 1, 200);
  var ymArray = [];

  for ( var i = 0 ; i < muArray.length ; i++ ) {
    var result = (yh<=2*yl+b)*((muArray[i]<=(yl+b)/(yh+b))*(yl+b) + (muArray[i]>(yl+b)/(yh+b))*muArray[i]*(yh+b)) + (yh>2*yl+b)*((muArray[i]<=1/2)*(muArray[i]*(yh-yl)+(1-muArray[i])*(yl+b)) + (muArray[i]>1/2)*muArray[i]*(yh+b));
    ymArray.push(result);
  };

  var trace1 = {
    x:xArray,
    y:yArray,
  	fill: 'tozeroy',
    fillcolor: "4D9AD4",
    mode:"none",
    name: "$\\text{The limit set of }V_A\\text{ under unanimity}$",
  };

  var trace2 = {
    x:muArray,
    y:ymArray,
    name: "$\\text{The limit of }V_A\\text{ under majority}$",
    mode:"lines",
    line: {color: "00205B"},
  };

  let region1 = (yh<=2*yl+b) ? [b/(yh-yl),yl/(yl+b)] : [b/(yl+b),yl/(yl+b)];
  let region2 = (region1[0]<region1[1]) ? region1 : [0, 0];
  let legend = (region2[0]==region2[1]) ? "$\\text{Majority dominates unanimity for all priors}$" : "$\\text{Best unanimity outcome dominates majority}$";
  let color = (region2[0]==region2[1]) ? "fff" : "rgba(77,154,212,.3)";

  var trace3 = {
    x: region2,
    y: [11,11],
    name: legend,
    mode: 'none',
    fill: 'tozeroy',
    fillcolor: color,
  };

  var data=[trace3,trace1,trace2];

  let text = (yh<=2*yl+b) ? "$\\frac{y^\\ell+b}{y^h+b}$":"$\\frac12$";

  var layout = {
    xaxis: {
      range: [0, 1*1.1],
      title: "$\\text{Prior belief }\\hat\\mu$",
      tickvals: [0, yl/yh, (yh<=2*yl+b)*(yl+b)/(yh+b)+(yh>2*yl+b)*1/2, 1],
      ticktext: ["0","$\\frac{y^\\ell}{y^h}$",text,"$1$"],
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    yaxis: {
      range: [0, yh*1.1],
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
      y: 1.3,
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
