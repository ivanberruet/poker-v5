import React, { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify';
import { shuffle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setArtistId } from '@/reducers/artistSlice';
import { setAlbumId } from '@/reducers/albumSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons';
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
export default function Artist({setView}) {
  const spotifyApi = useSpotify();
  const {artistId} = useSelector((state) => state.artist);
  const [color, setColor] = useState(null);
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const dispatch = useDispatch();

  const selectAlbum = (id) => {
    dispatch(setAlbumId(id))
    setView('album')
  }

  // Fetch data
  useEffect(() => {
    if (artistId) {
      // Fetch the artist
      spotifyApi.getArtist(artistId)
        .then((data) => {
          setArtist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
      // Fetch top tracks
      spotifyApi.getArtistTopTracks(artistId, 'AR')
        .then((data) => {
          setTopTracks(data.body.tracks);
        })
        .catch((err) => console.log("Something went wrong!", err));
        // Fetch related artists
        spotifyApi.getArtistRelatedArtists(artistId)
        .then((data) => {
          setRelatedArtists(data.body.artists);
        })
        .catch((err) => console.log("Something went wrong!", err));
        // Fetch albums
        spotifyApi.getArtistAlbums(artistId)
        .then((data) => {
          setAlbums(data.body.items);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [artistId]);
  
  // Color effect
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [artistId])

  return (
    <>
      <section className={`flex flex-col justify-between bg-gradient-to-b ${color} to-background h-72 p-4 sm:p-8 text-white`}>
      
        <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5' onClick={() => setView("search")} />
        
        <div className='flex items-end space-x-2 sm:space-x-7'>
          <img src={artist?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' alt='artist'></img>
          
          <div>
            <p>Artista</p>
            <h1 className='text-base md:text-3xl xl:text-5xl font-bold'>{artist?.name}</h1>
          </div>
        </div>

      </section>
      
      {/* Top tracks */}
      <div className='space-y-4'>
          <h2 className='text-xl font-bold px-4 sm:px-8'>Top tracks</h2>
          <div className='text-white px-4 sm:px-8 flex flex-col space-y-1 pb-6 h-[32rem] overflow-scroll scrollbar-hidden'>
              {topTracks?.slice(0, 25).map((track, i) => {
                  return <Song
                      key={i} 
                      track={track} 
                      order={i}
                      setView={setView}
                  />
              })}
          </div>
      </div>

      {/* Albums */}
      <div className='space-y-4'>
        <h2 className='text-xl font-bold px-4 sm:px-8'>Albums</h2>
        <div className='flex justify-center sm:justify-start flex-wrap gap-4 px-4 sm:px-8 pb-28'>
            {albums?.map((album) => {
                return <div onClick={() => selectAlbum(album?.id)} key={album.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                    <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                        <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
                    </div>
                    <img className='w-48 h-48 mb-4 rounded-full' src={album?.images[0]?.url} />
                    <p className='text-base text-white mb-1 w-48 truncate'>{album?.name}</p>
                    <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Artist</p>
                </div>
            })}
        </div>
      </div>

      {/* Related artists */}
      <div className='space-y-4'>
        <h2 className='text-xl font-bold px-4 sm:px-8'>Albums</h2>
        <div className='flex justify-center sm:justify-start flex-wrap gap-4 px-4 sm:px-8 pb-28'>
            {relatedArtists?.slice(0, 4).map((artist) => {
                return <div onClick={() => dispatch(setArtistId(artist?.id))} key={artist?.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
                    <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                        <FontAwesomeIcon icon={faPlay} className='h-6 w-6 text-black' />
                    </div>
                    <img className='w-48 h-48 mb-4 rounded-full' src={artist?.images[0]?.url} />
                    <p className='text-base text-white mb-1 w-48 truncate'>{artist?.name}</p>
                    <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>Artist</p>
                </div>
            })}
        </div>
      </div>


    </>
  )
}
