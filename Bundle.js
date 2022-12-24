(function (React$1, ReactDOM, d3) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = d => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);
    
    return data;
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks().map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".52em" },
          tickValue
        )
      )
    ));

  const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius
  }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', {
        fill: "none", stroke: "blue", d: d3.line()
          .x(d => xScale(xValue(d)))
          .y(d => yScale(yValue(d)))
          .curve(d3.curveNatural)(data) })
      
        //data.map(d => (
        //  <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
        //    <title>{tooltipFormat(xValue(d))}</title>
        //  </circle>
        //))
      
    )
  );

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 45;

  const App = () => {
    const data = useData();

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.timestamp;
    const xAxisLabel = 'Day';

    const yValue = d => d.temperature;
    const yAxisLabel = 'Temperature';

    const xAxisTickFormat = d3.timeFormat('%a');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React$1__default.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)` },
            yAxisLabel
          ),
          React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React$1__default.createElement( Marks, {
            data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 3 })
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJBeGlzQm90dG9tLmpzIiwiQXhpc0xlZnQuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jdXJyYW4vOTAyNDBhNmQ4OGJkYjE0MTE0NjdiMjFlYTA3NjkwMjkvcmF3LzdkNGMzOTE0Y2M2YTI5YTdmNTE2NWY3ZDVkODJiNzM1ZDk3YmNmZTQvd2Vla190ZW1wZXJhdHVyZV9zZi5jc3YnO1xuXG5leHBvcnQgY29uc3QgdXNlRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCByb3cgPSBkID0+IHtcbiAgICAgIGQudGVtcGVyYXR1cmUgPSArZC50ZW1wZXJhdHVyZTtcbiAgICAgIGQudGltZXN0YW1wID0gbmV3IERhdGUoZC50aW1lc3RhbXApO1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfTtcbiAgICBjc3YoY3N2VXJsLCByb3cpLnRoZW4oc2V0RGF0YSk7XG4gIH0sIFtdKTtcbiAgXG4gIHJldHVybiBkYXRhO1xufTsiLCJleHBvcnQgY29uc3QgQXhpc0JvdHRvbSA9ICh7IHhTY2FsZSwgaW5uZXJIZWlnaHQsIHRpY2tGb3JtYXQsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHhTY2FsZS50aWNrcygpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnXG4gICAgICBjbGFzc05hbWU9XCJ0aWNrXCJcbiAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7eFNjYWxlKHRpY2tWYWx1ZSl9LDApYH1cbiAgICA+XG4gICAgICA8bGluZSB5Mj17aW5uZXJIZWlnaHR9IC8+XG4gICAgICA8dGV4dCBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnbWlkZGxlJyB9fSBkeT1cIi43MWVtXCIgeT17aW5uZXJIZWlnaHQgKyB0aWNrT2Zmc2V0fT5cbiAgICAgICAge3RpY2tGb3JtYXQodGlja1ZhbHVlKX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IEF4aXNMZWZ0ID0gKHsgeVNjYWxlLCBpbm5lcldpZHRoLCB0aWNrT2Zmc2V0ID0gMyB9KSA9PlxuICB5U2NhbGUudGlja3MoKS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8ZyBjbGFzc05hbWU9XCJ0aWNrXCIgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHt5U2NhbGUodGlja1ZhbHVlKX0pYH0+XG4gICAgICA8bGluZSB4Mj17aW5uZXJXaWR0aH0gLz5cbiAgICAgIDx0ZXh0XG4gICAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgICBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnZW5kJyB9fVxuICAgICAgICB4PXstdGlja09mZnNldH1cbiAgICAgICAgZHk9XCIuMzJlbVwiXG4gICAgICA+XG4gICAgICAgIHt0aWNrVmFsdWV9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImltcG9ydCB7IGxpbmUsIGN1cnZlTmF0dXJhbCB9IGZyb20gJ2QzJztcbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIGRhdGEsXG4gIHhTY2FsZSxcbiAgeVNjYWxlLFxuICB4VmFsdWUsXG4gIHlWYWx1ZSxcbiAgdG9vbHRpcEZvcm1hdCxcbiAgY2lyY2xlUmFkaXVzXG59KSA9PiAoXG4gIDxnIGNsYXNzTmFtZT1cIm1hcmtzXCI+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgIHN0cm9rZT1cImJsYWNrXCJcbiAgICAgIGQ9e2xpbmUoKVxuICAgICAgICAueChkID0+IHhTY2FsZSh4VmFsdWUoZCkpKVxuICAgICAgICAueShkID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAgICAgICAuY3VydmUoY3VydmVOYXR1cmFsKShkYXRhKX1cbiAgICAvPlxuICAgIHtcbiAgICAgIC8vZGF0YS5tYXAoZCA9PiAoXG4gICAgICAvLyAgPGNpcmNsZSBjeD17eFNjYWxlKHhWYWx1ZShkKSl9IGN5PXt5U2NhbGUoeVZhbHVlKGQpKX0gcj17Y2lyY2xlUmFkaXVzfT5cbiAgICAgIC8vICAgIDx0aXRsZT57dG9vbHRpcEZvcm1hdCh4VmFsdWUoZCkpfTwvdGl0bGU+XG4gICAgICAvLyAgPC9jaXJjbGU+XG4gICAgICAvLykpXG4gICAgfVxuICA8L2c+XG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBzY2FsZVRpbWUsIG1heCwgdGltZUZvcm1hdCwgZXh0ZW50IH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgdXNlRGF0YSB9IGZyb20gJy4vdXNlRGF0YSc7XG5pbXBvcnQgeyBBeGlzQm90dG9tIH0gZnJvbSAnLi9BeGlzQm90dG9tJztcbmltcG9ydCB7IEF4aXNMZWZ0IH0gZnJvbSAnLi9BeGlzTGVmdCc7XG5pbXBvcnQgeyBNYXJrcyB9IGZyb20gJy4vTWFya3MnO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDY1LCBsZWZ0OiA5MCB9O1xuY29uc3QgeEF4aXNMYWJlbE9mZnNldCA9IDUwO1xuY29uc3QgeUF4aXNMYWJlbE9mZnNldCA9IDQ1O1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB1c2VEYXRhKCk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuXG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuXG4gIGNvbnN0IHhWYWx1ZSA9IGQgPT4gZC50aW1lc3RhbXA7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnVGltZSc7XG5cbiAgY29uc3QgeVZhbHVlID0gZCA9PiBkLnRlbXBlcmF0dXJlO1xuICBjb25zdCB5QXhpc0xhYmVsID0gJ1RlbXBlcmF0dXJlJztcblxuICBjb25zdCB4QXhpc1RpY2tGb3JtYXQgPSB0aW1lRm9ybWF0KCclYScpO1xuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgLmRvbWFpbihleHRlbnQoZGF0YSwgeFZhbHVlKSlcbiAgICAucmFuZ2UoWzAsIGlubmVyV2lkdGhdKVxuICAgIC5uaWNlKCk7XG5cbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHlWYWx1ZSkpXG4gICAgLnJhbmdlKFtpbm5lckhlaWdodCwgMF0pXG4gICAgLm5pY2UoKTtcblxuICByZXR1cm4gKFxuICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgfT5cbiAgICAgICAgPEF4aXNCb3R0b21cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgdGlja0Zvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIHRpY2tPZmZzZXQ9ezd9XG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCR7aW5uZXJIZWlnaHQgL1xuICAgICAgICAgICAgMn0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17N30gLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8TWFya3NcbiAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICBjaXJjbGVSYWRpdXM9ezN9XG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNzdiIsImxpbmUiLCJjdXJ2ZU5hdHVyYWwiLCJSZWFjdCIsInRp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
