import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClockButton from './ClockButton';
import { setDate, setInGameTime, setIsPaused, setIsStarted, setStartTime } from '@/reducers/gameSlice';
import { useMediaQuery } from '@uidotdev/usehooks';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { setCurrentLevel } from '@/reducers/timeSlice';

export default function Clock() {
  const dispatch = useDispatch();
  const {isStarted, isPaused, inGameTime} = useSelector((state) => state?.game);
  const {perLevel, currentLevel} = useSelector((state) => state?.time);

	const xl = useMediaQuery('(min-width:1080px)');
	const xxl = useMediaQuery('(min-width:1440px)');
	const timerWidth = xxl ? 225 : xl ? 200 : 175 
	const timerStrokeWidth = xxl ? 16 : xl ? 14 : 12

  const handleStart = () => {
    dispatch(setIsStarted(true));
    dispatch(setDate(new Date().toLocaleDateString()));
    dispatch(setStartTime(new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })))
  };

  const handlePause = () => {
    dispatch(setIsPaused(!isPaused));
  };

  const handleComplete = () => {
    dispatch(setCurrentLevel(currentLevel+1));
  }

  const updateGameTime = (rt) =>{
		if(isStarted){
      dispatch(setInGameTime(inGameTime+1))
		}
	}

  const children = ({ remainingTime }) => {
		var minutes = "00"	;
		var seconds = "00";
		if(!isNaN(remainingTime)){
			minutes = Math.floor(remainingTime / 60)
			seconds = remainingTime % 60 >= 10 ? remainingTime % 60 : `0${remainingTime % 60}`
		}
			return(
				<div className='w-full flex flex-col items-center'>
					<span className='text-semibold text-white text-lg xl:text-2xl absolute top-10 2xl:top-14 m-auto'>Nivel {currentLevel}</span>
					<span className='mt-4 w-full text-center font-semibold text-white text-4xl xl:text-5xl'>{`${minutes}:${seconds}`}</span>
				</div>
		)
	}


  return (
    <div className={`Clock | flex flex-col gap:4 xl:gap-0`}>

      <div className="ButtonContainer | h-fit flex justify-center gap-8 pb-8">
        {isStarted 
        ? <ClockButton state={isPaused} handleFunction={handlePause} lavel1="Reanudar" lavel2="Pausar" />
        : <ClockButton state={isStarted} handleFunction={handleStart} lavel1="Detener" lavel2="Iniciar" />
        }
      </div>

      <div className='CountdownCircleTimer | flex justify-center'>
        <CountdownCircleTimer
          isPlaying={isStarted && !isPaused}
          // initialRemainingTime={100}
          duration={perLevel*60}
          // duration={5} // Para debug
          size={timerWidth}
          colors={['#1A9AEF', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[perLevel*60*.5, perLevel*60*.25, 90, 0]}
          // colorsTime={[60, 15, 5, 0]} // Para debug
          trailColor= 'rgba(0, 0, 0, 0.3)'
          strokeWidth={timerStrokeWidth}
          updateInterval={1}
          onComplete={(te)=>{
            isStarted ? handleComplete() : console.log(te);
            return { shouldRepeat: true, delay: 0 }
          }}
          onUpdate={(rt)=> rt !==0 ? updateGameTime(rt) : null}
        >
          {({ remainingTime, elapsedTime }) => children({ remainingTime, elapsedTime })}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}
