import React, { useState, useRef, useEffect } from 'react';
import './CoverFlow.css';
import { musics } from '../const/music';

interface CoverFlowProps {
  items: typeof musics;
}

const NON_SELECTED_ALBUMS_ANGLE = 55;

const CoverFlow: React.FC<CoverFlowProps> = ({ items }) => {
  const CENTERED_ALBUM = Math.floor(items.length / 2);
  const [selectedIndex, setSelectedIndex] = useState(CENTERED_ALBUM);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);

    setSelectedIndex((prev) => {
      const newIndex = prev + delta;
      return Math.max(0, Math.min(newIndex, items.length - 1));
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    }
  }, []);

  const renderPlaylistItem = items.map((item, index) => {
    const distance = index - selectedIndex;
    const translateX = distance * 200;
    const angle = NON_SELECTED_ALBUMS_ANGLE;
    const rotation = distance === 0 ? 0 : distance < 0 ? angle : -angle;
    const scale = index === selectedIndex ? 1 : 0.87;
    const zIndex = index === selectedIndex ? 100 : items.length - Math.abs(distance);

    return (
      <div
        key={item.id}
        className="coverflow-item"
        style={{
          transform: `translateX(${translateX}px) rotateY(${rotation}deg) scale(${scale})`,
          zIndex,
        }}
      >
        <img src={item.albumCover} alt={item.title} />
        {selectedIndex === index && <div className="coverflow-item-info">
          <p>{item.title}</p>
          <span>{item.artistName}</span>
        </div>}
      </div>
    );
  });

  return (
    <div
      className="coverflow-container"
      ref={containerRef}
      onWheel={handleScroll}
    >
      <div className="coverflow-wrapper">
        {renderPlaylistItem}
      </div>
    </div>
  );
};

export default CoverFlow; 