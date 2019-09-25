import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class Demo extends React.Component {
  render() {
    const data = [
      {
        year: "A",
        population: 93
      },
      {
        year: "B",
        population: 73
      },
      {
        year: "C",
        population: 66
      },
      {
        year: "D",
        population:55
      },
    ];

    return (
      <div>
        <Chart height={600} data={data} forceFit>
          <Coord type="polar" innerRadius={0.2} />
          <Tooltip />
          <Legend
            position="right"
            offsetY={-600 / 2 + 180}
            offsetX={-160}
          />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Demo
