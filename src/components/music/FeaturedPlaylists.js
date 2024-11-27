import React, { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { setPlaylistId } from '@/reducers/playlistSlice';
import { useToast } from '@/hooks/use-toast';


export default function FeaturedPlaylists({setView}) {
  const dispatch = useDispatch();
  const { data: session } = useSession()
  const {toast} = useToast();
  const spotifyApi = useSpotify();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);


  useEffect(() => {
    const f = async () => {
      const data = await spotifyApi.getFeaturedPlaylists({country:'AR'}).catch((err)=> toast({ title: "Something went wrong!", description: err.message, variant: "destructive"}))
      setFeaturedPlaylists(data.body.playlists.items);
    }
    session && f()
  }, [spotifyApi, session]);

  return (
    <div className='flex flex-col gap-4 px-8'>
      <h2 className='text-xl font-bold'>Featured Playlists</h2>
      <div className='flex flex-wrap gap-6 mb-48'>
          {featuredPlaylists?.map((playlist) => {
              return <div 
                key={playlist.id} 
                className='cursor-pointer relative group w-56 mb-2 bg-muted/50 hover:bg-muted rounded-md p-4'
                onClick={() => {
                  dispatch(setPlaylistId(playlist.id));
                  setView('playlist');
                }} 
                >
                  <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                      <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
                  </div>
                  <img className='w-48 h-48 mb-4' src={playlist.images[0].url} />
                  <p className='text-base text-white mb-1 w-48 truncate'>{playlist.name}</p>
                  <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist.owner.display_name}</p>
              </div>
          })}
      </div>
    </div>
  )
}
