import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { setPlaylistInfo } from '@/reducers/playlistSlice';
import { shuffle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/hooks/use-toast';
import useSpotify from '@/hooks/useSpotify';
import Song from './Song';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]
export default function Playlist({setView}) {
  const { data: session } = useSession()
  const {toast} = useToast();
  const spotifyApi = useSpotify();
  const {id: playlistId, info: playlist} = useSelector((state) => state.playlist);
  const [color, setColor] = useState(null);
  const dispatch = useDispatch();

  const playPlaylist = () => {
    spotifyApi.play({
      context_uri: playlist?.uri
    }).catch((err)=> toast({ title: "Something went wrong!", description: err.message, variant: "destructive"}))
  }

  useEffect(() => {
    if (session) {
      spotifyApi.getPlaylist(playlistId)
      .then((data) => {
        dispatch(setPlaylistInfo(data.body))
      })
      .catch((err) => console.log("Something went wrong!", err))
    }
  }, [spotifyApi, playlistId, session])
  
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlist])

  return (
    <>
      {playlist && (
      <>
        <section className={`flex flex-col justify-between bg-gradient-to-b ${color} to-background h-72 p-4 sm:p-8 text-white`}>

          <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5' onClick={() => setView("search")} />

          <div className='flex items-end space-x-2 sm:space-x-7'>
            <img src={playlist?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' alt='playlist'></img>
            
            <div>
              <p>Playlist</p>
              <h1 className='text-base md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
            </div>
          </div>

        </section>

        <div className='p-8'>
          <div onClick={() => playPlaylist()} className='opacity-90 hover:opacity-100 transition-all ease-in-out duration-200 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 cursor-pointer hover:scale-105'>
              <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
          </div>
        </div>

        <div className='px-8 pb-28 text-white'>
          {playlist?.tracks?.items.map((track,i) => (
            <Song 
                key={i} 
                track={track.track} 
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
