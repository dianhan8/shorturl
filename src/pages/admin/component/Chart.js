import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
// 数据源
const data = [
    {
        month: "Jan",
        tem: 7,
        city: "tokyo"
    },
    {
        month: "Feb",
        tem: 6.9,
        city: "tokyo"
    },
    {
        month: "Mei",
        tem: 9.5,
        city: "tokyo"
    },
    {
        month: "Mar",
        tem: 14.5,
        city: "tokyo"
    },
    {
        month: "Apr",
        tem: 18.2,
        city: "tokyo"
    },
    {
        month: "Jun",
        tem: 21.5,
        city: "tokyo"
    },
    {
        month: "Jul",
        tem: 25.2,
        city: "tokyo"
    },
    {
        month: "Agu",
        tem: 26.5,
        city: "tokyo"
    },
    {
        month: "Sep",
        tem: 23.3,
        city: "tokyo"
    },
    {
        month: "Okto",
        tem: 18.3,
        city: "tokyo"
    },
    {
        month: "Nov",
        tem: 13.9,
        city: "tokyo"
    },
    {
        month: "Des",
        tem: 13.9,
        city: "tokyo"
    }
];

const cols = {
    tem: { alias: 'Kunjungan' }
}
export default function ChartSection() {
    return (
        <div id="container" className='pt-20'>
            <Chart width={796} height={400} data={data} scale={cols}>
                <Axis name="month" />
                <Axis name="tem" />
                <Tooltip
                    containerTpl="<div class=&quot;g2-tooltip&quot;><p class=&quot;g2-tooltip-title&quot;></p><table class=&quot;g2-tooltip-list&quot;></table></div>"
                    itemTpl="<tr class=&quot;g2-tooltip-list-item&quot;><td style=&quot;color:{color}&quot;>{name}</td><td>{value}</td></tr>"
                    offset={50}
                    g2-tooltip={{
                        position: "absolute",
                        visibility: "hidden",
                        border: "1px solid #efefef",
                        backgroundColor: "white",
                        color: "#000",
                        opacity: "0.8",
                        padding: "5px 15px",
                        transition: "top 200ms,left 200ms"
                    }}
                    g2-tooltip-list={{
                        margin: "10px"
                    }}
                />
                <Geom type="line" position="month*tem" />
            </Chart>
        </div>
    )
}
