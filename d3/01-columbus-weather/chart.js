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

    // creating our wrapper container
    const wrapper = d3.select("#wrapper") // selects the div in our html file with an id of 'wrapper'
    // adding our scalable vector graphic (SVG)/chart
        .append("svg") // adding our (SVG) element to our wrapper (chaining)
            .attr("width", wrapperDimensions.width) // setting the width of our svg element (chaining)
            .attr("height", wrapperDimensions.height) // setting the height of our svg element (chaining)

    // creating our bound container, inside of our SVG element
    const bound = wrapper.append("g") // adding an SVG element within SVG wrapper called "g" (this is for our chart)
        .style("transform",
                `translate(
                    ${wrapperDimensions.margin.left}px,
                    ${wrapperDimensions.margin.top}px
                )`)

    // scaling our y-axis
    // we'll need to convert our metrics into the pixel space
    // doing this will prevent our margins from looking funky
    const yMaxTempScale = d3.scaleLinear() // this creates our linear scale
        .domain(d3.extent(dataset, yMaxTempAccessor)) // sets min and max temp for our y-axis
        .range([wrapperDimensions.boundHeight, 0]) // sets min and max scale on chart

    // enabling our chart to display temperatures below freezing
    const freezingTemperaturePlacement = yMaxTempScale(32) // scales our data's freezing point
    const freezingTemperatures = bound.append("rect") // rectangle, build in SVG, covering all temps below freezing
      .attr("x", 0)
      .attr("width", wrapperDimensions.boundWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", wrapperDimensions.boundHeight - freezingTemperaturePlacement)
      .attr("fill", "#e0f3f3") // changing the color to a light blue to denote freezing temps

    // scaling our x-axis
    // we'll need to scale our date objects
    const xDateScale = d3.scaleTime() // d3's way to scale date objects
        .domain(d3.extent(dataset, xDateAccessor)) // min and max dates
        .range([0, wrapperDimensions.boundWidth]) // setting the min and max width on our chart
}

drawLineChart()