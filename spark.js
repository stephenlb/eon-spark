(function(){

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// SVG GRAPHER
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const spark = window.spark = function(setup) {
    let canvas    = document.getElementById(setup.svg||setup.id)||setup.elm
    ,   container = setup.todo          || null // TODO TODO TODO
    ,   margin    = setup.margin        || 0.00000001
    ,   rmargin   = setup.rmargin       || 15
    ,   center    = setup.center        || false
    ,   easing    = setup.easing        || 'linear'
    ,   classname = setup.classname     || 'grapher'
    ,   duration  = setup.duration      || 60
    ,   width     = canvas.offsetWidth  || canvas.parentNode.offsetWidth
    ,   height    = canvas.offsetHeight || canvas.parentNode.offsetHeight
    ,   started   = +new Date()
    ,   ceiling   = 1
    ,   scale     = 1
    ,   group     = document.createElementNS(
        'http://www.w3.org/2000/svg', 'g'
    );

    // TODO container autocreate SVG Canvas Element.
    // TODO container autocreate SVG Canvas Element.
    // TODO container autocreate SVG Canvas Element.

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Rescale Graph to fit New Ceiling
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    function rescale(value) {
        // Check if Scale Calculation is Required
        if (value <= ceiling) return;

        // Recalculate Scale to fit new Maxinum Graph Size
        ceiling = value;
        scale   = height / value;

        // Get All Lines on the SVG Canvas for Adjustment
        let lines = group.getElementsByTagName("line")
        ,   line  = 0;

        // Adjust All Graph Lines for New Scale
        for (;line < lines.length;line++) {
            adjust( lines[line], +lines[line].getAttribute('value') );
        }
    }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Adjust Line Value for Graph Size
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    function adjust( line, value ) {
        let scaled   = value * scale
        ,   centered = height / 2 - scaled / 2
        ,   adjusted = height - scaled;

        if (center) {
            line.setAttribute( 'y1', centered < margin ? margin : centered );
            line.setAttribute( 'y2',
                centered + scaled + margin > height ?
                height - margin                     :
                centered + scaled
            );
        }
        else {
            if (adjusted > height - margin) adjusted = height - margin;
            if (adjusted <= margin)         adjusted = margin;
            line.setAttribute( 'y1', adjusted );
        }
    }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Append Data to the Graph
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    function append(settings) {
        // Don't render on Non Visible Tab
        if (!vis()) return false;

        let value     = settings.value
        ,   cname     = settings.classname || classname
        ,   timedelta = (((+new Date - started) / 1000) / duration) + 1
        ,   line      = document.createElementNS(
            'http://www.w3.org/2000/svg', 'line'
        );

        // Recapture Width and Height (in case we resize)
        width  = (canvas.offsetWidth||canvas.parentNode.offsetWidth)+rmargin;
        height = canvas.offsetHeight||canvas.parentNode.offsetHeight;

        // Rescale if we Hit Ceiling
        rescale(settings.ceiling || value);

        // Save Basic Information
        line.setAttribute( 'value', value );
        line.setAttribute( 'class', cname );
        line.setAttribute( 'y2', height - margin );
        line.setAttribute( 'x1', width * timedelta );
        line.setAttribute( 'x2', width * timedelta );

        // Prepare and Adjust for Scaled Rendering and Centering
        adjust( line, value );

        // Plot and Render The Line
        group.appendChild(line);

        // Start End of Life Clock
        setTimeout( function() {
            group.removeChild(line);
            if (value >= ceiling) repeak();
        }, duration * 1100 );
    }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Recalculate Ceiling So When Peak Disappears on Graph
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    function repeak() {
        let lines = group.getElementsByTagName("line")
        ,   line  = 0
        ,   value = 0
        ,   peak  = 0;

        // Reset Ceiling
        ceiling = 1;

        // Adjust All Graph Lines for New Scale
        for (;line < lines.length;line++) {
            value = +lines[line].getAttribute('value');
            if (value > peak) peak = value;
        }

        // Rescale Based on New Peak
        rescale(peak);
    }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Setup and Start Animation of Chart
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    function chart_motion() {
        let tdet   = (((+new Date - started) / 1000) / duration) + 1
        ,   offset = (width*tdet);

        group.setAttribute( 'style', [
            'transition:all '                + duration + 's ' + easing,
            '-o-transition:all '             + duration + 's ' + easing,
            '-moz-transition:all '           + duration + 's ' + easing,
            '-webkit-transition:all '        + duration + 's ' + easing,
            'transform:translateX(-'         + offset + 'px)',
            '-o-transform:translateX(-'      + offset + 'px)',
            '-moz-transform:translateX(-'    + offset + 'px)',
            '-webkit-transform:translateX(-' + offset + 'px)'
        ].join(';') );
    }

    // Continuous Motion
    canvas.appendChild(group);
    setTimeout(  chart_motion, 50 );
    setInterval( chart_motion, duration * 500 );

    // Provide Manipulation Interface
    let self = function(){ return self };

    // Public Methods
    self.append = append;

    // Return API
    return self;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Visibility
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const vis = (function(){
    let stateKey
    ,   eventKey
    ,   keys = {
            hidden: "visibilitychange"
        ,   webkitHidden: "webkitvisibilitychange"
        ,   mozHidden: "mozvisibilitychange"
        ,   msHidden: "msvisibilitychange"
    };

    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }

    return function(c) {
        if (c) document.addEventListener( eventKey, c );
        return !document[stateKey];
    }
})();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Request URL
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const requester = function(setup) {

    let xhr      = new XMLHttpRequest()
    ,   finished = false
    ,   timeout  = setup.timeout || 5000
    ,   success  = setup.success || function(){}
    ,   fail     = setup.fail    || function(){};

    // Cancel a Pending Request
    function abort() {
        if (finished) return;
        xhr.abort && xhr.abort();
        finish();
    }

    // Mark Request as Completed
    function finish() {
        finished = true;
    }

    // When a Request has a Payload
    xhr.onload = function() {
        if (finished) return;
        finish();
        let result;

        try      { result = JSON.parse(xhr.response) }
        catch(e) { fail(xhr) }

        if (result) success(result);
        else        fail(xhr);
        result = null;
    };

    // When a Request has Failed
    xhr.onabort = xhr.ontimeout = xhr.onerror = function() {
        if (finished) return;
        finish();
        fail(xhr);
    };

    // Timeout and Aboart for Slow Requests
    xhr.timer = setTimeout( function(){
        if (finished) return;
        abort();
        fail(xhr);
    }, timeout );

    // Return Requester Object
    return function(setup) {
        let url     = setup.url     || 'https://ps.pubnub.com/time/0'
        ,   headers = setup.headers || {}
        ,   method  = setup.method  || 'GET'
        ,   payload = setup.payload || null
        ,   params  = setup.params  || setup.data || {}
        ,   data    = [];

        // URL Parameters
        for (let param in params)
            data.push([ param, params[param] ].join('='));

        // Start Request
        finished = false;
        xhr.timeout = timeout;
        xhr.open(
            method,
            url + (data.length ? ('?' + data.join('&')) : ''),
            true
        );

        // Headers
        for (let header in headers)
            xhr.setRequestHeader( header, headers[header] );

        // Send Request
        xhr.send(payload);

        return {
            xhr   : xhr,
            abort : abort
        } 
    };
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Subscribe
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const subscribe = function(setup) {
    let pubkey    = setup.pubkey    || 'demo'
    ,   subkey    = setup.subkey    || 'demo'
    ,   channel   = setup.channel   || 'a'
    ,   timeout   = setup.timeout   || 5000
    ,   timetoken = setup.timetoken || '0'
    ,   message   = setup.message   || function(){}
    ,   windy     = setup.windowing || 1000
    ,   windowing = 10
    ,   stop      = false
    ,   url       = ''
    ,   origin    = 'ps'+(Math.random()+'').split('.')[1]+'.pubnub.com';

    // Requester Object
    let request = requester({
        timeout : timeout,
        success : next,
        fail    : function(){ next() }
    });

    // Subscribe Loop
    function next(payload) { 
        if (stop) return;
        if (payload) {
            timetoken = payload.t.t;
            message(payload);
        }

        url = [
            'https://',       origin, 
            '/v2/subscribe/', subkey,
            '/',              channel,
            '/0/',            timetoken
        ].join('');

        setTimeout( function() {
            windowing = windy;
            request({ url : url });
        }, windowing );
    }

    // Cancel Subscription
    function unsubscribe() {
        stop = true;
    }

    // Start Subscribe Loop
    next();

    // Allow Cancelling Subscriptions
    return {
        unsubscribe : unsubscribe
    };
};

})();
