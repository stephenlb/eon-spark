(()=>{

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Traffic Graph
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const traffic = eon.spark({
    svg      : 'traffic'
,   duration : 20
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Other Sparks - Multi-graph Support
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const sparks = [
    eon.spark({ svg : 'one',   duration : 20 })
,   eon.spark({ svg : 'two',   duration : 20 })
//,   eon.spark({ svg : 'three', duration : 20 })
];

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Demo Traffic Graph Data
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
setInterval( () => {
    traffic.append({
        classname : 'cotton',  value : Math.random() * 300 + 2000
    });

    sparks.forEach( sp => sp.append({
        classname : 'fancy',  value : Math.random() * 10 + 200
    }) );
}, 200 );

})();
