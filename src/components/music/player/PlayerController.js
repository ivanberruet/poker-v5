import { useEffect } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPauseCircle, faPlayCircle, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { usePlaybackState, useSpotifyPlayer, useWebPlaybackSDKReady } from 'react-spotify-web-playback-sdk';
import { useDispatch } from 'react-redux';
import { setCurrentSongId, setIsPlaying } from '@/reducers/currentSongSlice';

export default function PlayerController() {
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const playbackState = usePlaybackState(true, 100);
  const player = useSpotifyPlayer();
  const spotifyApi = useSpotify();
  const previousTrackId = playbackState?.track_window?.previous_tracks[0]?.id;
  const nextTrackId = playbackState?.track_window?.next_tracks[0]?.id;
  const dispatch = useDispatch();
  

  const handlePlayPause = () => {
    if(playbackState?.paused){
      player?.resume();
      dispatch(setIsPlaying(true));
    }
    else{
      player?.pause();
      dispatch(setIsPlaying(false));
    } 
  }

  useEffect(() => {
    if (playbackState){
      dispatch(setCurrentSongId(playbackState.track_window.current_track.id));
      dispatch(setIsPlaying(!playbackState.paused));
    }
  }, [playbackState?.track_window?.current_track.id]);

  
  if (!webPlaybackSDKReady || !player || !playbackState) return null;
  return (
    <div className='flex items-center justify-evenly gap-4 sm:gap-6'>

      <FontAwesomeIcon 
        onClick={() => spotifyApi.setShuffle(!playbackState.shuffle)} 
        icon={faShuffle} 
        className={`button ${playbackState.shuffle ? 'text-green-500' : 'text-white'}`} 
      /> 

      <FontAwesomeIcon 
        icon={faBackwardStep} 
        className={`button ${previousTrackId ? '' : 'opacity-50'}`} 
        onClick={() => previousTrackId && player?.previousTrack()}
      />
      
      {playbackState?.paused 
        ? <FontAwesomeIcon icon={faPlayCircle} onClick={()=>handlePlayPause()} className='button' />
        : <FontAwesomeIcon icon={faPauseCircle} onClick={()=>handlePlayPause()} className='button' />
      }

      <FontAwesomeIcon
        icon={faForwardStep} 
        className={`button ${nextTrackId ? '' : 'opacity-50'}`} 
        onClick={() => nextTrackId && player?.nextTrack()} 
      />
    </div> 
  )
}
