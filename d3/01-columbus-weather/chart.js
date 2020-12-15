async function drawLineChart() { // async functions only execute code when promise is fulfilled
    const dataset = await d3.json("./cbus_weather.json") // await means function won't run until dataset is defined
}

drawLineChart()