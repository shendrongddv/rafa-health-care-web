'use client';

import { useState } from 'react';
import YouTube, { YouTubePlayer as YTPlayer, YouTubeEvent } from 'react-youtube';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubePlayerProps {
  title: string;
  videoId: string;
}

export function YouTubePlayer({ title, videoId }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<YTPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const opts = {
    height: '90',
    width: '160',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      mute: 0
    },
  };

  const handleReady = (event: YouTubeEvent) => {
    console.log('YouTube Player Ready');
    setPlayer(event.target);
    setIsLoading(false);
  };

  const handlePlay = async () => {
    try {
      if (!player) {
        console.error('Player not ready');
        return;
      }

      if (!isPlaying) {
        player.unMute();
        await player.playVideo();
        console.log('Playing video');
        setIsPlaying(true);
      } else {
        await player.pauseVideo();
        console.log('Pausing video');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error playing video:', error);
      toast.error('Error playing audio');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={handlePlay}
        disabled={isLoading}
        className={cn(
          "h-12 w-12 rounded-full transition-all duration-1000 border bg-slate-50",
          isPlaying && "text-primary hover:text-primary [animation:spin_3s_linear_infinite]",
          "hover:scale-105 active:scale-95"
        )}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>

      <div className="flex-1">
        <h3 className="font-medium leading-tight line-clamp-1">{title}</h3>
      </div>

      {/* Hidden YouTube player */}
      <div className="fixed -bottom-full left-0 invisible">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={handleReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnd={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
