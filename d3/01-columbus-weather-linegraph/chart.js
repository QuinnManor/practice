async function drawLineChart() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("../data/cbus_weather.json") // await means function won't run until dataset is defined

    // defining accessor functions to read in specific values for our char
    const xDateAccessor = d => d.date // function to access parsed date for each day
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

    // scaling our x-axis
    // we'll need to scale our date objects
    const xDateScale = d3.scaleTime() // d3's way to scale date objects
        .domain(d3.extent(dataset, xDateAccessor)) // min and max dates
        .range([0, wrapperDimensions.boundWidth]) // setting the min and max width on our chart
                        
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

    // creating the line for our chart
    const chartLine = d3.line() // converts data into a data-string to chart
        .x(d => xDateScale(xDateAccessor(d))) // chart our scaled date object
        .y(d => yMaxTempScale(yMaxTempAccessor(d))) // chart our scaled max temps for each day

    // adding our line to the path element of our bounds
    const line = bound.append("path") // adding to our wrapper
        .attr("d", chartLine(dataset)) // charts our line in the wrapper
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2)

    // adding our axes
    // x-axis
    const xDateAxisGenerator = d3.axisBottom() // creates axis elements for our chart
        .scale(xDateScale)

    const xDateAxis = bound.append("g") // g-element to hold our axis elements
        .call(xDateAxisGenerator) // .call executes our generator function
        .style("transform", `translateY(${wrapperDimensions.boundHeight}px)`)

    // y-axis
    const yMaxTempAxisGenerator = d3.axisLeft() // creates axis elements for our chart
        .scale(yMaxTempScale)

    const yMaxTempAxis = bound.append("g") // g-element to hold our axis elements
        .call(yMaxTempAxisGenerator) // .call executes our generator function
}

drawLineChart()