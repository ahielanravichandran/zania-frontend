import { useMemo } from "react";
import { getCardDataById } from "../entities/card";
import { Card } from "./Card";
import styles from "./card.module.css";
import { cn } from "../utils";
import useKeypress from "../hooks/useKeyPress";

type PeekCardProps = {
  type: string;
  onClose: (type: string) => void;
};

const PeekCard = ({ type, onClose }: PeekCardProps) => {
  const card = useMemo(() => {
    return getCardDataById(type);
  }, [type]);

  useKeypress("Escape", () => onClose(""));

  return (
    <>
      <div
        className="fixed z-[1] bg-black/80 inset-0"
        onClick={() => onClose("")}
      ></div>
      <div
        className={cn(
          "fixed -translate-x-1/2 -translate-y-1/2 scale-[2] left-1/2 top-1/2 z-[2]"
        )}
      >
        <Card className={cn(styles.card)} onClick={() => onClose("")}>
          <Card.Image
            className="h-[200px] flex-grow rounded-lg overflow-hidden"
            src={card.imgUrl}
          />
          <Card.Content className="mt-2">{card.title}</Card.Content>
        </Card>
      </div>
    </>
  );
};

export default PeekCard;
