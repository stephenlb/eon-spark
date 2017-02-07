(()=>{

'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Traffic Graph
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const traffic = eon.spark({
    svg      : 'traffic'
//,   center   : true
,   duration : 20
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Other Sparks - Multi-graph Support
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const sparks = [
    eon.spark({ svg : 'one', duration : 20 })
,   eon.spark({ svg : 'two', duration : 20 })
];

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Demo Traffic Graph Data
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
setInterval( () => {
    traffic.append({
        classname : 'cotton', value : Math.random() * 100 + 100
    });

    sparks.forEach( sp => sp.append({
        classname : 'fancy', value : Math.random() * 10 + 20
    }) );
}, 200 );

})();
