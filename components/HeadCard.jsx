import Image from 'next/image'
import React from 'react'

export default function HeadCard({img,title}) {
  return (
    <div className='flex flex-col gap-[16px]'>
      <Image src={img} alt='card' width={610} height={360} className='h-[360px] w-full'/>
      <h3 className='text-[32px] font-semibold max-sm:text-[24px]' style={{lineHeight: '100%'}}>{title}</h3>
    </div>
  )
}
