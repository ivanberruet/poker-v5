import useSpotify from '@/hooks/useSpotify';
import React, { useEffect, useRef, useState } from 'react';
import FeaturedPlaylists from './FeaturedPlaylists';
import SearchResults from './SearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search({setView}) {
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const spotify = useSpotify()

    
    async function updateSearchResults(query) {
      if(query === '') {
        setSearchData(null)
      }
      else{
        const data =  await spotify.search(query, ["artist", "playlist", "track"])
        setSearchData(data)
      }
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    
    return (
    <>
      <section className='text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-7 left-10 h-6 w-6 text-neutral-800' />
          <input value={inputValue} onChange={async (e) => {
              setInputValue(e.target.value)
              await updateSearchResults(e.target.value)
          }} ref={inputRef} className='rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0' />
      </section>
      
      <div>
          {searchData && <SearchResults
            playlists={searchData?.body.playlists.items.filter((playlist) => playlist)}
            songs={searchData?.body.tracks.items.filter((track) => track)}
            artists={searchData?.body.artists.items.filter((artist) => artist)}
            setView={setView}
          />}
      </div>
    </>
  );
}
