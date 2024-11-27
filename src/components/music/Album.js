import React, { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons';
import Song from './Song';
import { useToast } from '@/hooks/use-toast';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

export default function Album({setView}) {
  const { data: session } = useSession()
  const {toast} = useToast();
  const spotifyApi = useSpotify();
  const albumId = useSelector((state) => state.album.albumId);
  const [color, setColor] = useState(null);
  const [album, setAlbum] = useState(null);

  const playAlbum = () => {
    spotifyApi.play({
      context_uri: album?.uri
    }).catch((err)=> toast({ title: "Something went wrong!", description: err.message, variant: "destructive"}))
  }
  
  useEffect(() => {
    if (session) {
      spotifyApi.getAlbum(albumId)
      .then((data) => {
        setAlbum(data.body)
      })
      .catch((err) => console.log("Something went wrong!", err))
    }
  }, [spotifyApi, albumId, session])
  
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [album])

  
  return (
    <>
      {album && (
      <>
      <section className={`flex flex-col justify-between bg-gradient-to-b ${color} to-background h-72 p-4 sm:p-8 text-white`}>

        <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5' onClick={() => setView("search")} />
      
        <div className='flex items-end space-x-2 sm:space-x-7'>
          <img src={album?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' alt='album'></img>
          
          <div>
            <p onClick={() => setView('artist')} className='cursor-pointer font-bold'>{album?.artists?.[0]?.name}</p>
            <p>Album</p>
            <h1 className='text-base md:text-3xl xl:text-5xl font-bold'>{album?.name}</h1>
          </div>
        </div>
      </section>

      <div className='p-8'>
        <div onClick={() => playAlbum()} className='opacity-90 hover:opacity-100 transition-all ease-in-out duration-200 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 cursor-pointer hover:scale-105'>
            <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
        </div>
      </div>


      <div className='px-8 pb-28 text-white'>
        {album?.tracks?.items.map((track,i) => (
          <Song 
              key={i} 
              track={track} 
              order={i}
              setView={setView} 
              />
            ))}
      </div>
      </>
      )}
    </>
  )
}
