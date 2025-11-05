import { Line, LineChart, Tooltip, XAxis } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { Tugas } from "../../models/task/task";
import grafikMingguan from "../../utils/GrafikMingguan";

interface tugas{
    tugas : Tugas[]
}

function KomponenGrafikMingguan({tugas}:tugas) {

    return(
        <LineChart height={250} width={650} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={grafikMingguan(tugas,7)}>
                <Line strokeWidth={3} dot={{fill: '#DD460B',r: 4,stroke: "#DD460B"}} activeDot={{fill: '#DD460B',r: 7,stroke: "#DD460B"}} type="monotone" dataKey="nilai" stroke="#FFD7CB" />
                <XAxis tickMargin={20} tickFormatter={(value)=>`0${value+1}`} axisLine={false} tickLine={false} tick={{
                  fill : "black",
                  fontFamily : "Poppins",
                  fontWeight : 600,
                  fontSize : 15,
                  
                }} />
                 <Tooltip content={<CustomTooltip/>} cursor={{stroke: "#DD460B", strokeWidth: 1}} />
              </LineChart>
    )
}

export default KomponenGrafikMingguan;