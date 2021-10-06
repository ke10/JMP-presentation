function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}

function myCoase()
{
  myPlot = document.getElementById("coase");
  var yl = parseFloat(document.getElementById("slider4").value);
  var b = parseFloat(document.getElementById("slider5").value);
  var d = parseFloat(document.getElementById("slider6").value);
  var yh = 10;

  var xArray = linspace(0,yh+b,200);
  var yArray = [];
  for ( var i = 0 ; i < xArray.length ; i++ ) {
    var result = -(((yh+b)/2-xArray[i])**2);
    yArray.push(result);
  };
  var zArray = [];
  for ( var i = 0 ; i < xArray.length ; i++ ) {
    var result = -(1-d)*(((yh+b)/2)**2)-d*(((yh+b)/2-xArray[i])**2);
    zArray.push(result);
  };

  var trace1 = {
    x:xArray,
    y:yArray,
    mode:"lines",
    line: {color: "00205B"},
    name: "$U_R(x,x;h)=u_R(x;h)$",
    xaxis: "x1",
    yaxis: "y1",
  };

  var trace2 = {
    x:xArray,
    y:zArray,
    mode:"lines",
    line: {color: "00205B", dash: "dash"},
    name: "$U_R(0,x;h)=(1-\\delta)u_R(0;h)+\\delta u_R(x;h)$",
    xaxis: "x1",
    yaxis: "y1",
  };

  var rad = (yh+b)**2-4*d*(yh-yl)*(yl+b);
  var p = (rad>=0) ? (1/2)*(yh+b+Math.sqrt(rad)) : (1/2)*(yh+b-Math.sqrt(-rad));

  var ml1 = ((1-d)*(yl+b))/(p-d*(yl+b));
  var ml2 = (yh<=2*yl+b) ? (2*yl+b-yh)/(yl+b) : 0;
  var ml = (d==1) ? ml2 : ml1;
  var mr = (yl+b)/(yh+b);
  var mh1 = (mr*(yh+b-d*(yl+b)))/(yh+b-p+mr*(p-d*(yl+b)));
  var mh2 = (yh<=2*yl+b) ? (yl+b)/(yh+b) : 1/2;
  var mh = (d==1) ? mh2 : mh1;

  var trace3 = {
    x:[ml,mh],
    y:[.5,.5],
    mode:"none",
    xaxis: "x2",
    yaxis: "y2",
    showlegend: false,
  };


  let color1 = (ml==0) ? "rgba(0,0,0,0)" : "rgba(77,154,212,.3)";
  let color2 = (d==1) ? color1 : "rgba(0,0,0,0)";
  let legend1 = (ml==0) ? "$\\text{Equilibria are non-Coasian for all priors}$" : "$\\text{Equlibria are Coasian for }\\hat\\mu\\leq m^h$";
  let legend2 = (d==1) ? legend1 : "$\\text{Set }\\delta=1\\text{ to see if equilibria are Coasian}$";
  let t = (yh<=2*yl+b) ? mh : ml;
  var trace4 = {
    x: [0,t],
    y: [1,1],
    name: legend2,
    mode: 'none',
    fill: 'tozeroy',
    fillcolor: color2,
    xaxis: "x2",
    yaxis: "y2",
  };

  var data=[trace1, trace2, trace3, trace4];

  var layout = {
    xaxis: {
      range: [0, yh+b],
      title: "$\\text{Policy }x$",
      tickvals: [0, yl+b, (yh+b)/2, yh+b, p],
      ticktext: ["$0$","$y^\\ell+b$","$\\frac{1}{2}(y^h+b)$","$y^h+b$","$p_R$"],
      side: "top",
      tickcolor: 'white',
      ticklen:5,
      anchor: "y1",
      fixedrange: true,
    },
    yaxis: {
      range: [yArray[0], 0],
      title: "$\\text{Payoff of voter }R$",
      tickvals: [-(((yh+b)/2-p)**2)],
      ticktext: [""],
      tickcolor: 'white',
      ticklen: 5,
      anchor: "x1",
      fixedrange: true,
    },
    xaxis2: {
      title: "$\\text{Prior belief }\\hat\\mu$",
      range: [0, 1],
      anchor: "y2",
      zeroline: false,
      tickvals: [0,1/2,1,ml,mh],
      ticktext: ["$0$","$\\frac12$","$1$","$m^\\ell$","$m^h$"],
      fixedrange: true,
    },
    yaxis2: {
      range: [-1, 2],
      showgrid: false,
      zeroline: false,
      visible: false,
      anchor: "x2",
      fixedrange: true,
    },
    margin: {
      l: 20,
      r: 20,
      b: 70,
      t: 70,
      pad: 4,
    },
    grid: {
      rows: 2,
      columns: 1,
      pattern: 'independent',
    },
    showlegend: true,
    legend: {
      x: 0,
      xanchor: 'left',
      y: .5,
    },

    hovermode: false,
  };

  Plotly.react(myPlot, data, layout);
}
