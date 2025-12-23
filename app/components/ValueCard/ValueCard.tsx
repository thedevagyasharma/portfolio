import { ValuePixelArt } from '../PixelArt';
import { valueShapes } from '../PixelArt/valueShapes';
import './ValueCard.styles.css';

type ValueCardProps = {
  value: keyof typeof valueShapes;
  title: string;
  description: string;
};

export default function ValueCard({ value, title, description }: ValueCardProps) {
  return (
    <div className="value-card">
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
