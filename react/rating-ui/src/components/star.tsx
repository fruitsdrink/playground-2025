type StarProps = {
  rating: number;
  color?: string;
  onClick: (rating: number) => void;
  onHoverEnter: (rating: number) => void;
  onHoverLeave: () => void;
};
export function Star({
  color,
  rating,
  onClick,
  onHoverEnter,
  onHoverLeave,
}: StarProps) {
  return (
    <span
      className={`text-2xl ${color || "text-yellow-500"} cursor-pointer`}
      onClick={() => onClick(rating)}
      onMouseEnter={() => onHoverEnter(rating)}
      onMouseLeave={onHoverLeave}
    >
      {"\u2605"}
    </span>
  );
}
