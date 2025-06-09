import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card }; 