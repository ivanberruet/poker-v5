import React, { useEffect, useState } from 'react'
import Search from './Search';
import Library from './Library';
import PlayList from './PlayList';
import Album from './Album';
import MusicSidebar from './MusicSidebar';
import Artist from './Artist';

export default function Music({view: mainView}) {
  const [view, setView] = useState('search');
  const [centerComponent, setCenterComponent] = useState(<Search />);

  useEffect(() => {
    const components = {
      search: <Search setView={setView} />,
      library: <Library setView={setView} />,
      playlist: <PlayList setView={setView} />,
      artist: <Artist setView={setView} />,
      album: <Album setView={setView} />,
    };

    setCenterComponent(components[view]);
  }, [view])


  return (
    <>
    <main className={`h-screen overflow-hidden ${mainView === 'music' ? '' : 'hidden'}`}>
      <div className="flex w-full">
        <MusicSidebar view={view} setView={setView} />
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hidden'>
          {centerComponent}
        </div>
      </div> 
    </main>

    </>
  )
}
