import React, { useState } from 'react'
import useSpotify from '@/hooks/useSpotify';
import { milisToMinutesAndSeconds } from '@/lib/milisToMinutesAndSeconds';
import { setAlbumId } from '@/reducers/albumSlice';
import { setArtistId } from '@/reducers/artistSlice';
import { setCurrentSongId, setIsPlaying } from '@/reducers/currentSongSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/hooks/use-toast';

export default function Song({order, track, setView}) {
  const dispatch = useDispatch();
  const {toast} = useToast();
  const spotifyApi = useSpotify();
  const [hover, setHover] = useState(false);

  const {currentSongId, isPlaying} = useSelector((state) => state?.currentSong);
  

  const playSong = () => {
    spotifyApi.play({
      uris: [track.uri]
    }).catch((err)=> toast({ title: "Something went wrong!", description: err.message, variant: "destructive"}))
    dispatch(setCurrentSongId(track.id));
    dispatch(setIsPlaying(true));
  }  
  const pauseSong = () => {
    spotifyApi.pause({
      uris: [track.uri]
    })
    dispatch(setCurrentSongId(track.id));
    dispatch(setIsPlaying(false));
  }  

  const selectArtist = (id) => {
    dispatch(setArtistId(id));
    setView('artist');
  }
    
  const selectAlbum = (id) => {
    dispatch(setAlbumId(id));
    setView('album');
  }
    
  return (
    track && (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='grid grid-cols-2 text-gray-500 py-4 sm:px-5 hover:bg-white/10 rounded-lg'>

      <div className='flex items-center space-x-4'>
        { isPlaying && track.id === currentSongId
          ? hover
           ? <FontAwesomeIcon icon={faPauseCircle} onClick={pauseSong} className='w-5 h-5 text-white cursor-pointer' />
           : <FontAwesomeIcon icon={faMusic} className={`h-5 w-5 ${currentSongId === track.id && 'active-song' }`} />
          : hover
            ? <FontAwesomeIcon icon={faPlayCircle} onClick={playSong} className='w-5 h-5 text-white cursor-pointer' />
            : <p className={`w-5 h-5 ${currentSongId === track.id && 'active-song' }`}>{order + 1}</p>
        }
        {track?.album &&<img className='h-10 w-10' src={track?.album?.images[0]?.url} alt="album" />}

        <div>
          <p onClick={playSong} 
            className={`w-36 lg:w-64 truncate text-white cursor-pointer ${currentSongId === track.id && 'active-song' }`}>
            {track?.name}
          </p>
          <p className='w-36 sm:w-96 truncate'>{track?.artists.map((artist,i) => {
            return (
              <span key={i} className='truncate'>
                <span onClick={() => selectArtist(artist.id)} className='text-gray-500 cursor-pointer hover:underline'>{artist?.name}</span>
                <span>{i !== track.artists.length - 1 && ', '}</span>
              </span>
            )
          })}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p onClick={() => selectAlbum(track.album.id)} className='w-40 hidden md:inline-flex cursor-pointer hover:underline'>{track?.album?.name}</p>
        <p>{milisToMinutesAndSeconds(track?.duration_ms)}</p>
      </div>
    </div>
    )
  )
}
