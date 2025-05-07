interface CounterContent{
    title:string
    value:number
    icon:string
    background:string
    textColor:string
}

function Counter({title,value,icon,background,textColor}:CounterContent) {
  return (
    <div className={`flex flex-row items-center rounded-lg gap-3 py-4 px-6 ${background}`}>
    <img src={icon} className="w-7" alt="icons" />
    <div className="flex flex-col items-start">
      <p className={`text-${textColor} font-bold text-base`}>{title}</p>
      <p className={`text-${textColor} text-base`}>{value}</p>
    </div>
  </div>
  )
}

export default Counter;
