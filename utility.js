function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}

function myUtility()
{
  myPlot = document.getElementById("utility");
  var yh = parseFloat(document.getElementById("slider").value);

  var xArray = linspace(0,15,200);
  var yArray = [];
  for ( var i = 0 ; i < xArray.length ; i++ ) {
    var result = -((yh/2-xArray[i])**2);
    yArray.push(result);
  };

  var trace1 = {
    x:xArray,
    y:yArray,
    mode:"lines",
    line: {color: "00205B"},
    name: "$u_i(x;\\omega)=-(\\frac12y^\\omega_i-x)^2$",
    xaxis: "x1",
    yaxis: "y1",
  };

  var data=[trace1];

  var layout = {
    xaxis: {
      range: [0, 11],
      title: "$\\text{Policy }x$",
      tickvals: [0, yh/2, yh],
      ticktext: ["$0$","$\\frac12y^\\omega_i$","$y^\\omega_i$"],
      side: "top",
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    yaxis: {
      range: [-25, 0],
      title: "$\\text{Payoff of voter }i$",
      tickvals: [-((yh/2)**2)],
      ticktext: ["$u_i(0;\\omega)$"],
      tickcolor: 'white',
      ticklen: 5,
      fixedrange: true,
    },
    showlegend: true,
    legend: {
      x: .5,
      xanchor: 'center',
      y: 0,
    },
    hovermode: false,
  };

  Plotly.react(myPlot, data, layout);
}
