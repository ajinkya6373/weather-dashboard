
export default function Card({title,children,}) {
  return (
    <div className='bg-[#ffffff]  w-[300px] p-[1.8rem] text-[2.5rem] font-semibold rounded-md'>
        <h3 className="opacity-[0.6] text-lg font-normal">{title}</h3>
        {children}
    </div>
  )
}
