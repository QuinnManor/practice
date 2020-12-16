async function drawLineChart() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("./cbus_weather.json") // await means function won't run until dataset is defined

    // defining accessor functions to read in specific values for our chart
    const dateParser = d => d3.timeParse("$Y-$m-$d") // function to parse date
    const xDateAccessor = d => dateParser(d.date) // function to access parsed date for each day
    const yMaxTempAccessor = d => d.maxTemp // function to access max temp for each day

    // wrapper container dimensions, contains entire chart, every element (SVG) is contained here
    let wrapperDimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left:60
        },
    }

    // bound container dimensions, contains our chart and all of it's data elements
    wrapperDimensions.boundWidth = wrapperDimensions.width - wrapperDimensions.margin.left - wrapperDimensions.margin.right
    wrapperDimensions.boundHeight = wrapperDimensions.height - wrapperDimensions.margin.top - wrapperDimensions.margin.bottom
}

drawLineChart()