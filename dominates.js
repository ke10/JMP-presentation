function myDominates(){

myPlot = document.getElementById('dominates');
b = document.getElementById("slider3").value;

function linspace(a,c,n) {
  return d3.range(n).map(function(i){return a+i*(c-a)/(n-1);});
}

var xArray = linspace(0, 10, 1000);
var yArray = [];

for ( var i = 0 ; i < xArray.length ; i++ ) {
  var result = ((xArray[i] + parseFloat(b))*(xArray[i] + parseFloat(b))/xArray[i]) - parseFloat(b);
  yArray.push(result);
};

// Define Data
var trace1 = {
  x:xArray,
  y:yArray,
	fill: 'tonextx',
  fillcolor: "4D9AD4",
  mode: "none"
};

var trace2 = {
  x:xArray,
  y:xArray,
  fill: 'tonextx',
  mode: "none",
  fillcolor: "9FDDF9"
};

var data = [trace1, trace2];


// Define Layout
var layout = {
  xaxis: {range: [0, 10], title: "$y^\\ell\\!, \\text{ the ideal policy in state }\\omega=\\ell$",  tickvals: [b], ticktext: ["$b$"]},
  yaxis: {range: [0, 10], title: "$y^h\\!, \\text{ the ideal policy in state }\\omega=h$", tickvals: [3*b], ticktext: ["$2y^\\ell+b$"]},
  title: "title",
  shapes: [
        {
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0,
            y0: 3*b,
            x1: parseFloat(b),
            y1: 10,
            fillcolor: '9FDDF9',
            opacity: 1,
            line: {
                width: 0
            }
        },
        {
            type: 'line',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 10,
            fillcolor: '#000',
            opacity: 1,
            line: {
                width: 1
            }
        }

    ]
};

// Display using Plotly
Plotly.newPlot(myPlot, data, layout);

}
