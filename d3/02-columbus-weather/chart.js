async function drawLineChart() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("../data/cbus_weather.json") // await means function won't run until dataset is defined
    
    // defining accessor functions to read in specific values for our chart
    const xheatIndexAccessor = d => d.heatIndex // function to access parsed date for each day
    const yhumidityAccessor = d => d.humidity // function to access max temp for each day

    // creating a scatterplot means we'll have a square chart
    const width = d3.min([ // either use window width/height, set square dimensions to that
        window.innerWidth * 0.9,
        window.innerHeight * 0.9
    ])
    
    // define wrapper dimensions using the set width above
    let wrapperDimensions = { // assures square dimensions for our wrapper
        width: width,
        height: width
    }
}

drawLineChart()