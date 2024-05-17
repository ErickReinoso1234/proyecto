
import { Card } from "@tremor/react"
import  CardBase  from "./card"
import { AreaChartUsageExample } from "./grafica"
import { ListUsageExample } from "./list"
import { TableUsageExample } from "./tabla"




function Page (){
  return(
    <div className='container mx-auto pt-10'>
      <h1 className='text-white text-center text-4xl'>Dashboard Ahorros del mes de Mayo</h1>
      <div className="grid grid-cols-4 gap-2 mt-10">
      
      <CardBase />
      <CardBase />
      <CardBase />
      <CardBase />
      <CardBase />
      <CardBase />
      <CardBase />
      <CardBase />
    </div>

<div className='grid grid-cols-4 mt-10'>
  <div className='cols-span-2 px-7'>
    <ListUsageExample/>
  </div>
  <div className='col-span-2 px-7'>
 <Card>
  <AreaChartUsageExample/>
 </Card>
</div>
<div className='pt-5'>
  <TableUsageExample/>
</div>
</div>




    </div>
  )
}
export default Page