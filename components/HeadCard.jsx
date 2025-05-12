import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeadCard({img,title,h='h-[360px]',text='text-[32px]',textsm='text-[24px]', topic='', isFeature=false}) {
  return (
    <div className={`flex flex-col gap-[16px] ${isFeature && 'max-sm:w-[227px]'}`}>
      <div className={`${h} w-full bg-[#F9E9DA] flex items-center ${isFeature && 'max-sm:w-[227px]'} justify-center`}>
      <Image src={img} alt='card' width={2000} height={2000} className={`${h} object-cover object-top w-full`}/>
      </div>
     { topic!== '' && <Link className='underline text-[13px] font-[400] text-[#004D43]' href={'#'}>{topic}</Link>}
      <Link href={`/health-topics/${title.replace(/ /g, '-')}`} className={`${text} font-semibold max-sm:${textsm} leading-[100%]`}>{title}</Link>
    </div>
  )
}
