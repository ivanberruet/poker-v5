import spotifyApi from '@/lib/spotify';
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function useSpotify() {
  const { data: session, status } = useSession()
  
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi.setRefreshToken(session.refreshToken);
    }
  },[session])  
  
  return spotifyApi
}
