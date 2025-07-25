import React from "react";
import { Button } from "./button";
import { Star } from "./star";
import { useModal } from "./modal";

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  color?: string;
  feedbackMessages?: string[];
}
export function Rating({
  heading = "Rate Your Experience",
  color = "text-yellow-500",
  feedbackMessages = ["Terrible", "Poor", "Fair", "Good", "Excellent"],
  className,
  ...rest
}: RatingProps) {
  const [rating, setRating] = React.useState<number>(0);
  const [hover, setHover] = React.useState<number>(0);

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleHoverEnter = (value: number) => {
    setHover(value);
  };

  const handleHoverLeave = () => {
    setHover(0);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      openModal();
    }
  };

  const handleClose = () => {
    setRating(0);
    setHover(0);
  };

  const { RatingModal, openModal } = useModal({ rating, onClose: handleClose });

  return (
    <>
      <div
        className={`flex items-center flex-col gap-4 ${className}`}
        {...rest}
      >
        <h2 className="text-lg font-semibold mb-2">{heading}</h2>
        <div className="flex items-center gap-2">
          {stars.map((star) => (
            <Star
              key={star}
              color={star <= (hover || rating) ? color : "text-gray-300"}
              rating={star}
              onClick={handleClick}
              onHoverEnter={handleHoverEnter}
              onHoverLeave={handleHoverLeave}
            />
          ))}
        </div>
        {rating > 0 && (
          <p className="text-lg text-gray-600 font-semibold">
            {feedbackMessages[rating]}
          </p>
        )}
        <div>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit
          </Button>
        </div>
      </div>
      <RatingModal />
    </>
  );
}
