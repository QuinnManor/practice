async function drawHistogram() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("../data/cbus_weather.json") // await means function won't run until dataset is defined
    
    // since a histogram will have a single metric, we'll grab that along with the shape of our data
    const metricAccessor = d => d.humidity
    const yAccessor = d => d.length // gathering the shape of our data

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

    // calculating the width and height of our bound
    wrapperDimensions.boundWidth = wrapperDimensions.width - wrapperDimensions.margin.left - wrapperDimensions.margin.right
    wrapperDimensions.boundHeight = wrapperDimensions.height - wrapperDimensions.margin.top - wrapperDimensions.margin.bottom

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

    // scaling our data
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, metricAccessor))
        .range([0, wrapperDimensions.boundWidth])
        .nice()

    // generating our bins
    const binsGenerator = d3.histogram() // allows us to generate bins for our histogram
        .domain(xScale.domain()) // tell the range of numbers we'll cover
        .value(metricAccessor) // tells our generator how to get the humidity value
        .thresholds(12) // the number of bins to create (0 index, this is 13)
        // .thresholds will decided optimal number of bins, takes input as suggestion

    // create our bins
    const bins = binsGenerator(dataset)

    // creating our y-axis scale
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([wrapperDimensions.boundHeight, 0])
        .nice() // round out our bars

    // create element to contain bins
    const binsGroup = bound.append("g")

    // bind each data point to the binsGroup
    const binGroups = binsGroup.selectAll("g")
        .data(bins)
        .enter().append("g") // creates a g element for each bin

    // creating histogram padding
    const barPadding = 1

    // histogram padding
    const barRects = binGroups.append("rect")
        .attr("x", d => xScale(d.x0) + barPadding / 2)
        .attr("y", d => yAccessor(d))
        .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
        .attr("height", d => wrapperDimensions.boundHeight - yAccessor(d))
        .attr("fill", "cornflowerblue")
}

drawHistogram()