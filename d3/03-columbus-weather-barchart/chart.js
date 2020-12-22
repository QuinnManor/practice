async function drawHistogram() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("../data/cbus_weather.json") // await means function won't run until dataset is defined
    
    // since a histogram will have a single metric, we'll make one accessor
    const metricAccessor = d => d.humidity

    // creating histogram width
    const width = 600
    
    // define wrapper dimensions using the set width above
    let wrapperDimensions = { // assures square dimensions for our wrapper
        width: width,
        height: width * 0.6,
        margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
      },
    }
}

drawHistogram()