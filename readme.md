# EON Spark

Developers create engaging, beautiful
live data visuals that helps you stand out.
It's fast, simple, and open source.

### Developers create **lovely visuals** from live data.

![EON Spark Chart and Graph](http://i.imgur.com/aFysWAy.gif)

You imagine what live streaming data looks like.
Charting and graphing for live streaming data.
iOS, Android and web browsers.
This is the visual representation of live streaming data,
the way you would imagine.

### EON Spark Graphing

EON Spark is lightweight, and has been coded ground-up.
No dependencies are required.
This means streamlined performance dedicated to drawing
streaming data visuals.
EON Spark library was purpose built for mobile and web displays.
This graphing library was built internally at
[PubNub](https://www.pubnub.com/) and has been in use since 2014.

### Getting Started: EON Spark Data Visualizations

How to draw lines on a spark chart with a quick tutorial.
Start with defining your HTML DOM element `<svg>`.

```html
<!-- Graph DOM Element -->
<svg id='sparkline'></svg>
```

How should your sparkline look?
It should be pretty!
Sparkline basic CSS provided.

```html
<!-- How should the line look? -->
<style>
    #sparkline {
        background: #f5e2c8;
        displays: inline-block;
        width: 500px;
        height: 100px;
    }
    line.sparkline {
        stroke: #f56476;
        stroke-width: 3.0%;
        stroke-dasharray: 2 2 400;
    }
</style>
```

Initialize EON Spark Graph

```html
<script src="../eon-spark.js"></script>
<script>
    // Create sparkline
    const graph = eon.spark({ duration: 10, svg : 'sparkline' });
</script>
```

Adding a line to the chart by using `.append()` method.

```html
<script>
    // Draw line two times per second with random value.
    setInterval( () => {
        graph.append({
            classname : 'sparkline'
        ,   value     : Math.random() * 300 + 2000
        });
    }, 500 );
</script>
```

## EON Spark Roadmap

 - Website w/ signup form
 - Spark Builder/Gallery (themes, data source/test data, etc.)
 - Web Dashboard Demo
 - Documentation of each parameter
 - BLOCKS for Stream Processing
 - iOS Cocoa Pod
 - Android Module
 - Angular Module
 - Angular2 Module
 - React Module
 - Polymer Component
 - http://buildwithreact.com/tutorial/events tutorial style
