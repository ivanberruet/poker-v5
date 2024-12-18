import React, { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { setPlaylistId } from '@/reducers/playlistSlice';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


export default function Library ({setView }) {
  const dispatch = useDispatch();
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState(null)


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data?.body?.items.filter((playlist) => playlist) ?? []);
      })
    }
  }, [session, spotifyApi]);


  return (
      <>
        <section className='h-20 p-8'></section>

        <div className='flex flex-col gap-4 px-8'>
          <h2 className='text-xl font-bold'>Playlists</h2>
          <div className='flex flex-wrap gap-6 mb-48'>
              {playlists?.map((playlist,i) => {
                  return <div 
                    key={i} 
                    className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'
                    onClick={() => {
                      dispatch(setPlaylistId(playlist?.id));
                      setView('playlist');
                    }} 
                    >
                      <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                          <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
                      </div>
                      <img className='w-48 h-48 mb-4' src={playlist?.images[0]?.url} />
                      <p className='text-base text-white mb-1 w-48 truncate'>{playlist?.name}</p>
                      <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist?.owner?.display_name}</p>
                  </div>
              })}
          </div>
        </div>
    </>
  );
}
