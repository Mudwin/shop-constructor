import styles from './ContentTile.module.css';

interface ContentTileProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function ContentTile({ children, width, height }: ContentTileProps) {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className={styles.tile}>
      {children}
    </div>
  );
}
