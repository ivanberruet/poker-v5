'use client'
import * as React from "react"
import Image from "next/image";
import { CircleUserIcon, Home, Info, LineChart, Music, PanelLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui//button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui//sheet";
import DesktopLink from "./DesktopLink";
import MobileLink from "./MobileLink";
import { signOut } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useSpotify from "@/hooks/useSpotify";

export default function Sidebar({ view, setView }) {
  const spotifyApi = useSpotify();
  const handleToken = () => {
    const f = async () => {
      const refreshToken = spotifyApi.getRefreshToken();
      if (!refreshToken) {
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(refreshedToken.access_token);
        spotifyApi.setRefreshToken(refreshedToken.refresh_token);
        
      }
    }
    f();
  }

  return (
    <div className="Sidebar_container | w-full sm:w-fit flex flex-col bg-muted/40 text-accent-foreground">

      {/* Desktop */}
      <aside className="hidden w-14 h-full flex-col border-r border-muted bg-background sm:flex">
        <nav className="flex flex-col h-full items-center gap-4 sm:gap-6 px-2 sm:py-4">
          <Image src="/logo.png" alt="Logo" width={25} height={25} className="hidden sm:block "></Image>

          <DesktopLink icon={<Home className="h-5 w-5" />} text="Inicio" className={view === "game" ? "bg-accent text-foreground " : "text-muted-foreground"} setView={setView} value="game" />

          <DesktopLink icon={<Info className="h-5 w-5" />} text="Información" className={view === "info" ? "bg-accent text-foreground " : "text-muted-foreground"} setView={setView} value="info" />

          <DesktopLink icon={<LineChart className="h-5 w-5" />} text="Estadísticas" className={view === "stats" ? "bg-accent text-foreground " : "text-muted-foreground"} setView={setView} value="stats" />

          <DesktopLink icon={<Music className="h-5 w-5" />} text="Música" className={view === "music" ? "bg-accent text-foreground " : "text-muted-foreground"} setView={setView} value="music" />

          <DesktopLink icon={<Settings className="h-5 w-5" />} text="Configuración" className={view === "settings" ? "bg-accent text-foreground " : "text-muted-foreground"} setView={setView} value="settings" />

          <Popover>
            <PopoverTrigger className="mt-auto inline-block">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground md:h-8 md:w-8">
                <CircleUserIcon className="h-5 w-5" />  
              </div>
            </PopoverTrigger>
            <PopoverContent side={"right"} className="w-fit h-fit text-sm py-2 px-3 cursor-pointer">
              <div onClick={()=>handleToken()}>Refrescar token</div>
              <div onClick={signOut}>Cerrar</div>
            </PopoverContent>
          </Popover>

        </nav>

      </aside>
      
      {/* Mobile */}
      <div className="flex flex-col sm:gap-4 sm:hidden">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-muted bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs text-accent-foreground">
            <VisuallyHidden asChild><SheetTitle>Menu</SheetTitle></VisuallyHidden>
              <nav className="flex flex-col gap-6 text-lg font-medium h-full">

                <MobileLink icon={<Home className="h-5 w-5" />} text="Inicio" className={view === "game" ? "text-foreground " : "text-muted-foreground"} setView={setView} value="game" />

                <MobileLink icon={<Info className="h-5 w-5" />} text="Información" className={view === "info" ? "text-foreground " : "text-muted-foreground"} setView={setView} value="info" />

                <MobileLink icon={<LineChart className="h-5 w-5" />} text="Estadísticas" className={view === "stats" ? "text-foreground " : "text-muted-foreground"} setView={setView} value="stats" />

                <MobileLink icon={<Music className="h-5 w-5" />} text="Música" className={view === "music" ? "text-foreground " : "text-muted-foreground"} setView={setView} value="music" />

                <MobileLink icon={<Settings className="h-5 w-5" />} text="Configuración" className={view === "settings" ? "text-foreground " : "text-muted-foreground"} setView={setView} value="settings" />

                <Popover>
                  <PopoverTrigger className="mt-auto inline-block w-fit">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground md:h-8 md:w-8">
                      <CircleUserIcon className="h-5 w-5" />  
                    </div>
                  </PopoverTrigger>
                  <PopoverContent onClick={signOut} side={"right"} className="w-fit h-fit text-sm py-2 px-3 cursor-pointer">
                      Cerrar sesión
                  </PopoverContent>
                </Popover>

              </nav>
            </SheetContent>
          </Sheet>

          <Image src="/logo.png" alt="Logo" width={30} height={30}></Image>
        </header>
      </div>

    </div>  
  )
}
