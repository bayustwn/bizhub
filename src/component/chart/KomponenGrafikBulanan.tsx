import { Line, LineChart, Tooltip, XAxis } from "recharts";
import CustomTooltip from "./CustomTooltip";
import grafikBulanan from "../../utils/GrafikBulanan";
import { Tugas } from "../../models/task/task";

interface Bulanan {
    tugas : Tugas[],
    bulan: number,
    tahun: number
}

function KomponenGrafikBulanan({tugas, bulan, tahun}: Bulanan) {
    return(
        <LineChart
              height={280}
              width={650}
              margin={{ top: 50, right: 50, bottom: 25, left: 50 }}
              data={grafikBulanan(
                tugas,
                bulan,
                tahun
              )}
            >
              <Line
                strokeWidth={3}
                dot={{ fill: "#DD460B", r: 4, stroke: "#DD460B" }}
                activeDot={{ fill: "#DD460B", r: 7, stroke: "#DD460B" }}
                type="monotone"
                dataKey="nilai"
                stroke="#FFD7CB"
              />
              <XAxis
                tickMargin={30}
                axisLine={false}
                tickLine={false}
                dataKey={"minggu"}
                tick={{
                  fill: "black",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#DD460B", strokeWidth: 1 }}
              />
            </LineChart>
    )
}

export default KomponenGrafikBulanan;