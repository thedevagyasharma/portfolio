'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './VideoPlayer.styles.css';

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  muteWarningText?: string;
  showMuteControl?: boolean;
}

export default function VideoPlayer({
  src,
  autoplay = false,
  loop = false,
  className = '',
  muteWarningText,
  showMuteControl = true
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update current time as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };

    // Check if metadata is already loaded
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [loop]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    const seekbar = e.currentTarget;
    const rect = seekbar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`video-player ${className}`}>
      <video
        ref={videoRef}
        className="video-player-video"
        autoPlay={autoplay}
        loop={loop}
        muted={isMuted}
        playsInline
        onClick={handlePlayPause}
      >
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="video-player-controls">
        <div className="video-player-controls-left">
          <button
            onClick={handlePlayPause}
            className="video-player-button navbar-button-base"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button
            onClick={handleReplay}
            className="video-player-button navbar-button-base"
            aria-label="Replay"
          >
            <RotateCcw />
          </button>
        </div>

        <div
          className="video-player-seekbar"
          onClick={handleSeek}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
        >
          <div
            className="video-player-seekbar-progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        {showMuteControl && (
          <div className="video-player-controls-right">
            <button
              onClick={handleMuteToggle}
              className="video-player-button navbar-button-base"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>

            {muteWarningText && (
              <span className="video-player-mute-warning">{muteWarningText}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
