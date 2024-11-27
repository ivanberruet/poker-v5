import { useEffect, useState } from 'react'
import { usePlaybackState, useSpotifyPlayer, useWebPlaybackSDKReady } from 'react-spotify-web-playback-sdk';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

export default function PlayerVolume() {
  const { data: session, status } = useSession()
  const [volume, setVolume] = useState(50);
  const player = useSpotifyPlayer();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const playbackState = usePlaybackState(true, 100);
  const spotifyApi = useSpotify();
  
  useEffect(() => {
    session && spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body) {
        setVolume(data.body.device.volume_percent);
        console.log("volume", data.body.device.volume_percent);
      }
      
    })
  }, [spotifyApi, player]);
  

  useEffect(() => {
    if (player && volume >= 0 && volume < 100) {
      setTimeout(() => player.setVolume(volume/100), 300);
    }
  }, [volume, player]);

    
  if (!webPlaybackSDKReady || !player || !playbackState) return null;
  return (
    <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
      {volume > 0
      ? (
      <><FontAwesomeIcon icon={faVolumeHigh} 
        onClick={() => setVolume(0)} className='button' />
        <input 
        className='w-10 md:w-28'
        type="range" 
        value={volume} 
        min={0} 
        max={100} 
        onChange={(e) => setVolume(Number(e.target.value))} 
      /></>)
      : (
      <><FontAwesomeIcon icon={faVolumeXmark} 
        onClick={() => setVolume(50)} className='button' />
        <input 
        className='w-10 md:w-28'
        type="range" 
        value={volume} 
        min={0} 
        max={100} 
        onChange={(e) => setVolume(Number(e.target.value))} 
      /></>)
    }
  </div>
)
}
