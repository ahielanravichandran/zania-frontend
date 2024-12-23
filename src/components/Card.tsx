import React, { useState } from "react";
import { cn } from "../utils";
import { Spinner } from "./Spinner";

type CardType = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
> & {
  Image: typeof CardImage;
  Content: typeof CardContent;
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border bg-white text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}) as CardType;

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, draggable, alt, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn(className)} {...props}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner />
        </div>
      )}
      <img
        className="h-full w-full object-cover"
        ref={ref}
        src={src}
        alt={alt}
        draggable={draggable}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));

Card.Image = CardImage;
Card.Content = CardContent;

export { Card };
