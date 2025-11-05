'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import Game from "@/components/game/Game";
import Info from "@/components/info/Info";
import Stats from "@/components/stats/Stats";
import Settings from "@/components/setings/Settings";
import Header from "@/components/header/Header";
import Loading from "./Loading";
import { setAvailablePlayers, setDbPlayers } from "@/reducers/playersSlice";
import { setAvailableChips } from "@/reducers/chipsSlice";
import { setBlindsStructure } from "@/reducers/structureSlice";
import { setDistribution } from '@/reducers/chipsSlice';
import handleChipsTobeUsed from '@/lib/handleChipsTobeUsed';
import { setHistoryData } from "@/reducers/historySlice";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import getFinalResults from "@/lib/getFinalResults";
import { saveInfo } from "@/lib/saveInfo";


export default function Home() {
  const {toast} = useToast();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state?.sheets);
  const chips = useSelector(state => state.chips)
  const players = useSelector((state) => state?.players)
  const game = useSelector((state) => state?.game)
  const money = useSelector((state) => state?.money)
  const [ready, setReady] = useState(false);

  const [view, setView] = useState('game');
  const [centerComponent, setCenterComponent] = useState(null);

  // Format data
  useEffect(() => {
    if(Object.keys(data).length > 0) {
        // Format players data
        const players = data.players.map((player) => ({
          id: player[0],
          name: player[1],
          nick: player[2]
        }))
        dispatch(setDbPlayers(players));
        dispatch(setAvailablePlayers(players));

        // Format chips data
        const chips = data.chips.map((chip) => ({   
          name: chip[0], 
          white: {quantity: parseInt(chip[1]), value: 5}, 
          red: {quantity: parseInt(chip[2]), value: 10}, 
          green: {quantity: parseInt(chip[3]), value: 25}, 
          blue: {quantity: parseInt(chip[4]), value: 50}, 
          black: {quantity: parseInt(chip[5]), value: 100},
          active: true,
        }))
        dispatch(setAvailableChips(chips));

        // Format structure data
        const structure = data.structure.map((row) => ({
          level: parseInt(row[0]), 
          smallBlind: parseInt(row[1]),
          bigBlind: parseInt(row[2]),
        }))
        dispatch(setBlindsStructure(structure));

        // Format history
        const history = data.history.map((row) => ({
          date: row[0],
          startTime: row[1],
          endTime: row[2],
          position: row[3],
          player: row[4],
          reEntry: row[5],
          eliminatedTime: row[6],
          inGameTime: row[7],
          prize: row[8],
        }))
        dispatch(setHistoryData(history));

        setReady(true);
    }
  }, [data])

  // Update center component
  useEffect(() => {
    const components = {
      game: null,
      info: <Info setView={setView} />,
      stats: <Stats setView={setView} />,
      settings: <Settings setView={setView} />,
      none: null
    };

    setCenterComponent(components[view]);
  }, [view])

  // Update the distribution
  useEffect(() => {
    if(data.chips){
      dispatch(setDistribution(handleChipsTobeUsed(chips.available, players.registered)))
    }
  }, [chips.available, players.registered])

  // End of the game
  useEffect(() => {
    if(game.endTime){
      toast({
        title: "Torneo finalizado",
        description: `Felicitaciones ${players.active[0]?.nick || "Jugador"}!`,
        variant: "outline",
      });
      // Get results
      const finalResults = getFinalResults(game, players, money);
      saveInfo(finalResults)
        .then(res => res.error
          ? toast({ title: "Error!", description: "Error guardando resultados", variant: "destructive" })
          : toast({ title: "Resultados guardados", description: "Se han guardado tus resultados.", variant: "outline" })
        );
    }
  }, [game.endTime])

  if (!ready) return <Loading />

  return (
    <>
      <main className="h-screen overflow-hidden bg-background text-white flex flex-col sm:flex-row w-full">
        <Sidebar view={view} setView={setView} />
        <div className='flex flex-col flex-grow h-screen overflow-y-scroll scrollbar-hidden py-4 px-6'>
          <Header />
          <Game view={view} />
          {centerComponent}
          <Toaster />
        </div> 
      </main>
    </>
  );
}
