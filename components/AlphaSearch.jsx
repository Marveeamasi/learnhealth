'use client'

import { alphabets, HEALTH_TOPICS } from '@/dummyData'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl'

export default function AlphaSearch({handleSetAlphabet}) {
  const [healthTopics, setHealthTopics] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSearchResults, setFilteredSearchResults] = useState([])
  const [showAllSearchResults, setShowAllSearchResults] = useState(false)
  const [activeAlphabet, setActiveAlphabet] = useState('')
  const [filteredAlphabetResults, setFilteredAlphabetResults] = useState([])

  useEffect(() => {
    setHealthTopics(HEALTH_TOPICS)
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    setActiveAlphabet('')
    if (term.trim() === '') {
      setFilteredSearchResults([])
      return
    }
    const lowerTerm = term.toLowerCase()
    const filtered = healthTopics
      .filter((item) => item.toLowerCase().includes(lowerTerm))
      .sort()
    setFilteredSearchResults(filtered)
  }

  const handleFilterConditionTopic = (alphabet) => {
    setSearchTerm('')
    setFilteredSearchResults([])
    setShowAllSearchResults(false)
    setActiveAlphabet(alphabet)
    const filtered = healthTopics
      .filter((item) => item.toLowerCase().startsWith(alphabet.toLowerCase()))
      .sort()
    setFilteredAlphabetResults(filtered);
    handleSetAlphabet(alphabet);
  }

  const shouldShowSearchResults = searchTerm.trim() !== ''

  return (
    <section className="flex flex-col w-full gap-10 relative">

      {shouldShowSearchResults && (
        <div className={`bg-[#F9E9DA] px-30 py-10 max-sm:px-5 w-full absolute top-[-300px] max-sm:top-[-350px] shadow-lg flex flex-col justify-between gap-5 z-30`}>
          <div className={`grid grid-cols-3 gap-5 justify-between items-center max-w-[897px] w-full ${showAllSearchResults && 'max-h-[192px] overflow-y-scroll'}`}>
           {filteredSearchResults?.length === 0?
        <>
        Result for "{searchTerm}" not found
        </>
        :
        <> 
        {(showAllSearchResults ? filteredSearchResults : filteredSearchResults.slice(0, 12)).map(topic =>
              <Link href={'/health-topics/'+topic.replace(/-/g, '-')} key={topic} className='text-[20px] max-sm:text-[12px] font-[400]'>{topic}</Link>
            )}
            </>
            }
          </div>
        {filteredSearchResults?.length > 12 && (
        <div
            className="flex gap-2 items-center text-[20px] max-sm:text-center font-[700] cursor-pointer"
            onClick={() => setShowAllSearchResults(prev => !prev)}
        >
            {showAllSearchResults ? 'View Less' : 'View All'} <SlArrowRightCircle className={showAllSearchResults ? `rotate-270 ` : `rotate-90`}/>
        </div>
        )}
        </div>
      )}

      <div className='flex flex-col w-full px-30 max-sm:px-5 gap-10'>
        <div className="max-w-[466px] w-full h-[53px] rounded-[32px] font-[400] bg-[#F3F2F2] flex items-center py-[18px] px-[24px]">
          <input
            className="outline-none placeholder:text-[#858585] text-sm flex-[1]"
            placeholder="Search by keyword, disease or topic"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CiSearch />
        </div>

        <div className="grid grid-cols-12 gap-3 font-[500] text-sm max-sm:flex max-sm:justify-start max-sm:flex-wrap w-full max-w-[680px]">
          {alphabets.map((alphabet) =>
            <div
              key={alphabet}
              onClick={() => handleFilterConditionTopic(alphabet)}
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-full cursor-pointer`}
               style={{background: activeAlphabet === alphabet ? '#D9D9D9' : '#F3F2F2'}}
            >
              {alphabet}
            </div>
          )}
        </div>
      </div>

      {activeAlphabet && (
        <div className='flex flex-col px-30 max-sm:px-5 gap-5'>
          <h1 className='text-[32px] font-[600]'>Topics starting with “{activeAlphabet}”</h1>
          <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5 justify-between items-center max-w-[897px] w-full'>
           {filteredAlphabetResults?.length === 0? 
           <>
           Result for “{activeAlphabet}” not found
           </>
           :
           <>
           {filteredAlphabetResults.map(topic =>
              <Link href={'/health-topics/'+topic.replace(/ /g, '-')} key={topic} className='text-[20px] font-[500]'>{topic}</Link>
            )}
            </>
            }
          </div>
        </div>
      )}
    </section>
  )
}
