function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}

function mySecond()
{
  myPlot = document.getElementById("second");
  var yl = parseFloat(document.getElementById("slider2").value);
  var b = parseFloat(document.getElementById("slider3").value);


  var xArray = linspace(0,15,200);
  var yArray = [];
  for ( var i = 0 ; i < xArray.length ; i++ ) {
    var result = -((yl/2-xArray[i])**2);
    yArray.push(result);
  };
  var zArray = [];
  for ( var i = 0 ; i < xArray.length ; i++ ) {
    var result = -(((yl+b)/2-xArray[i])**2);
    zArray.push(result);
  };


  var trace1 = {
    x:xArray,
    y:yArray,
    mode:"lines",
    line: {color: "00205B"},
    name: "$u_L(x;\\ell)=-(\\frac12y^\\ell-x)^2$",
    xaxis: "x1",
    yaxis: "y1",
  };

  var trace2 = {
    x:xArray,
    y:zArray,
    mode:"lines",
    line: {color: "00205B", dash: "dashdot"},
    name: "$u_R(x;\\ell)=-(\\frac12(y^\\ell+b)-x)^2$",
    xaxis: "x1",
    yaxis: "y1",
  };


  var data=[trace1, trace2];

  var layout = {
    xaxis: {
      range: [0, 11],
      title: "$\\text{Policy }x$",
      tickvals: [0, yl/2, yl, (yl+b)/2, yl+b],
      ticktext: ["$0$","$\\frac12y^\\ell$","$y^\\ell$","$\\frac12(y^\\ell+b)$","$y^\\ell+b$"],
      side: "top",
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    yaxis: {
      range: [-25, 0],
      title: "$\\text{Payoff of voter }i$",
      tickvals: [-((yl/2)**2),-(((yl+b)/2)**2)],
      ticktext: ["$u_L(0;\\ell)$","$u_R(0;\\ell)$"],
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    showlegend: true,
    legend: {
      x: .5,
      xanchor: 'center',
      y: -.25,
    },
    hovermode: false,
  };

  Plotly.react(myPlot, data, layout);
}
