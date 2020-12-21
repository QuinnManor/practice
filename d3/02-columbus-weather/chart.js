async function drawLineChart() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("../data/cbus_weather.json") // await means function won't run until dataset is defined
    
    // defining accessor functions to read in specific values for our chart
    const xheatIndexAccessor = d => d.heatIndex // function to access parsed date for each day
    const yHumidityAccessor = d => d.humidity // function to access max temp for each day

    // creating a scatterplot means we'll have a square chart
    const width = d3.min([ // either use window width/height, set square dimensions to that
        window.innerWidth * 0.9,
        window.innerHeight * 0.9
    ])
    
    // define wrapper dimensions using the set width above
    let wrapperDimensions = { // assures square dimensions for our wrapper
        width: width,
        height: width,
        margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50,
      },
    }

    // calculating the width and height of our bound
    wrapperDimensions.boundWidth = wrapperDimensions.width - wrapperDimensions.margin.left - wrapperDimensions.margin.right
    wrapperDimensions.boundHeight = wrapperDimensions.width - wrapperDimensions.margin.top - wrapperDimensions.margin.bottom

// creating our wrapper container
    // contains our entire svg element
    const wrapper = d3.select("#wrapper") // selects the div in our html file with an id of 'wrapper'
    // adding our scalable vector graphic (SVG)/chart
        .append("svg") // adding our (SVG) element to our wrapper (chaining)
            .attr("width", wrapperDimensions.width) // setting the width of our svg element (chaining)
            .attr("height", wrapperDimensions.height) // setting the height of our svg element (chaining)

    // creating our bound container, inside of our SVG element
    // contains only our data elements
    const bound = wrapper.append("g") // adding an SVG element within SVG wrapper called "g" (this is for our chart)
        .style("transform",
                `translate(
                    ${wrapperDimensions.margin.left}px,
                    ${wrapperDimensions.margin.top}px
                )`)

    // scaling our x-axis
    // we'll need to scale our date objects
    const xheatIndexScale = d3.scaleLinear() // d3's way to scale linear numbers
        .domain(d3.extent(dataset, xheatIndexAccessor)) // min and max dates
        .range([0, wrapperDimensions.boundWidth]) // setting the min and max width on our chart
        .nice() // this will round our heat indexes

    // scaling our y-axis
    // we'll need to convert our metrics into the pixel space
    // doing this will prevent our margins from looking funky
    const yMaxHumidityScale = d3.scaleLinear() // this creates our linear scale
        .domain(d3.extent(dataset, yHumidityAccessor)) // sets min and max temp for our y-axis
        .range([wrapperDimensions.boundHeight, 0]) // sets min and max scale on chart
        .nice() // this will round our humidity

    // now let's create our scatterplot!
    bound.append("circle") // indicates a scatterplot
        .attr("cx", wrapperDimensions.boundWidth / 2) // cx sets center at x coordinates
        .attr("cy", wrapperDimensions.boundHeight / 2) // cy sets our y coordinates
        .attr("r", 5) // sets the plots radius
}

drawLineChart()