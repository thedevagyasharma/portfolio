'use client';

import { PixelArtDisplay } from '@/app/components/features/PixelArt/PixelArtDisplay';
import { face_long } from '@/app/components/features/PixelArt/shapes';
import './MobileWarning.styles.css';

export default function MobileWarning() {
  return (
    <div className="mobile-warning">
      <div className="mobile-warning__content">
        <div className="mobile-warning__icon">
          <PixelArtDisplay
            shapes={[face_long, face_long]}
            gridTiles={4}
            morphStyle="scatter"
            config={{ displayDuration: 6500 }}
          />
        </div>
        <h1>Hey there!</h1>
        <p>I built this portfolio to shine on bigger screens.</p>
        <p>Grab your desktop or laptop for the full experience!</p>
      </div>
    </div>
  );
}
