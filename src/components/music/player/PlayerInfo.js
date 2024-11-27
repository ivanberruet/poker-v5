import { usePlaybackState } from 'react-spotify-web-playback-sdk';

export default function PlayerInfo() {
  const playbackState = usePlaybackState(true, 100);
  const songInfo = playbackState?.track_window?.current_track

  return(
  songInfo
  ?
    <div className='flex items-center justify-start lg:space-x-4'>
      <img className='hidden lg:inline h-10 w-10' src={songInfo?.album?.images[0]?.url} alt="" />
      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists[0]?.name}</p>
      </div>
    </div>
  :
  <div className='hidden md:inline h-10 w-10'></div>
  )  
}
