(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Reload Page Interval
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var worldgraph = grapher({
    svg      : 'world-traffic'
,   margin   : 0.00001
,   easing   : 'linear'
,   duration : 120
,   rmargin  : 3
});

// World Graph
worldgraph.append({
    classname : 'world'
,   value     : Math.pow( traffic.totalsec.result, 2 )
});

})();
