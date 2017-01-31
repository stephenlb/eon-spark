(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Traffic Graph
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const traffic = spark({
    svg      : 'traffic'
,   margin   : 0.00001
,   duration : 10
,   rmargin  : 3
});

// Traffic Graph
setInterval( () => {
    traffic.append({
        classname : 'cotton'
    ,   value     : Math.random() * 1000 + 300
    });
}, 100 );

})();
