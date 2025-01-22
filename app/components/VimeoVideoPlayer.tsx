import React from 'react';
import PropTypes from 'prop-types';

interface VimeoVideoPlayerProps {
  videoId: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
}

export function VimeoVideoPlayer({
  videoId,
  className,
  width = '100%',
  height = '400px',
  title = 'Vimeo Video',
}: VimeoVideoPlayerProps) {
  if (!videoId) {
    console.error('VimeoEmbed requires a videoId prop.');
    return null;
  }

  const embedUrl = `https://player.vimeo.com/video/${videoId}`;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></iframe>
    </div>
  );
}
