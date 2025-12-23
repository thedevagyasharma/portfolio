'use client';

import { ValuePixelArt, valueShapes } from '@/app/components/features';
import { useGridSnap } from '@/app/hooks/useGridSnap';
import './ValueCard.styles.css';

type ValueCardProps = {
  value: keyof typeof valueShapes;
  title: string;
  description: string;
};

export default function ValueCard({ value, title, description }: ValueCardProps) {
  const cardRef = useGridSnap();

  return (
    <div ref={cardRef} className="value-card">
      <div className="value-card-artifact">
        <ValuePixelArt value={value} />
      </div>
      <div className="value-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
