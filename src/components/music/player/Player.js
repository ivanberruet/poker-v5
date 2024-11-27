'use client';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react'
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { StateConsumer } from './StateConsumer';
import PlayerController from './PlayerController';
import PlayerInfo from './PlayerInfo';
import PlayerVolume from './PlayerVolume';

export default function Player() {
  const { data: session } = useSession();
  const getOAuthToken = useCallback(
    callback => callback(session?.accessToken),
    [session?.accessToken],
  );
  
  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify Player on Next.js"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      initialVolume={0.5}
    >
      <div className='col-span-4 text-white flex items-center justify-evenly gap-6 text-xs lg:text-base px-2 md:px-8 xl:grid xl:grid-cols-3'>
        <PlayerInfo />
        <PlayerController /> 
        <PlayerVolume />       

      </div>
      <StateConsumer access_token={session?.accessToken} />        
    </WebPlaybackSDK>
  )
}
