import { Card } from "./Card";
import styles from "./card.module.css";
import { data } from "../db/data";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardType } from "../types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cardService } from "../service/cardService";
import { Spinner } from "./Spinner";
import { formatTimeAgo } from "../utils";

function getInstanceId() {
  return Symbol("instance-id");
}

const InstanceIdContext = createContext<symbol | null>(null);
type State = "idle" | "dragging" | "over";

type CardsListProps = {
  onCardClick: (type: string) => void;
};

const CardContainer = ({
  card,
  onCardClick,
}: {
  card: CardType;
  onCardClick: (type: string) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [state, setState] = useState<State>("idle");

  const instanceId = useContext(InstanceIdContext);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const src = card.type;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "grid-item", src, instanceId }),
        onDragStart: () => setState("dragging"),
        onDrop: () => setState("idle"),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ src }),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId &&
          source.data.type === "grid-item" &&
          source.data.src !== src,
        onDragEnter: () => setState("over"),
        onDragLeave: () => setState("idle"),
        onDrop: () => setState("idle"),
      })
    );
  }, [instanceId, card.type]);

  return (
    <li
      ref={ref}
      key={card.type}
      className={`w-full border-2 rounded-lg ${
        state === "dragging" ? "opacity-50" : ""
      } ${
        state === "over" ? "border-2 border-blue-500" : "border-transparent"
      }`}
      onClick={() => onCardClick(card.type)}
    >
      <Card className={styles.card}>
        <Card.Image
          className="h-[200px] flex-grow rounded-lg overflow-hidden"
          src={card.imgUrl}
          draggable={false}
        />
        <Card.Content className="mt-2 text-black">{card.title}</Card.Content>
      </Card>
    </li>
  );
};

export const CardsList = React.memo(({ onCardClick }: CardsListProps) => {
  const [items, setItems] = React.useState(data);
  const [instanceId] = useState(getInstanceId);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const hasChanges = useRef(false);
  // Initialize with current items
  const previousItems = useRef(JSON.stringify(items));
  const [timeAgoText, setTimeAgoText] = useState<string>("");

  // Update the time ago text every second
  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      setTimeAgoText(formatTimeAgo(lastSaved));
    };

    const interval = setInterval(updateTimeAgo, 1000);
    // Initial update
    updateTimeAgo();

    return () => clearInterval(interval);
  }, [lastSaved]);

  // Periodic save function
  const saveChanges = useCallback(async () => {
    const currentItems = JSON.stringify(items);

    // Only save if there are actual changes
    if (!hasChanges.current || currentItems === previousItems.current) {
      return;
    }

    try {
      setIsSaving(true);
      await cardService.updateCards(items);
      previousItems.current = currentItems;
      hasChanges.current = false;
      setLastSaved(new Date());
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }, [items]);

  // Set up periodic saving
  useEffect(() => {
    const interval = setInterval(saveChanges, 5000);
    return () => clearInterval(interval);
  }, [saveChanges]);

  // Your existing monitor effect with change detection
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationSrc = destination.data.src;
        const startSrc = source.data.src;

        if (typeof destinationSrc !== "string" || typeof startSrc !== "string")
          return;

        setItems((currentItems) => {
          const startIndex = currentItems.findIndex(
            (item) => item.type === startSrc
          );
          const destIndex = currentItems.findIndex(
            (item) => item.type === destinationSrc
          );

          const newItems = [...currentItems];
          [newItems[startIndex], newItems[destIndex]] = [
            newItems[destIndex],
            newItems[startIndex],
          ];

          // Mark that we have changes
          hasChanges.current = true;
          return newItems;
        });
      },
    });
  }, [instanceId]);

  return (
    <>
      <div className="flex mx-4 items-center h-8 text-sm text-white">
        {isSaving ? (
          <div className="flex items-center gap-2">
            <Spinner className="w-4 h-4" />
            <span>Saving changes...</span>
          </div>
        ) : lastSaved && timeAgoText ? (
          <span>Last saved: {timeAgoText}</span>
        ) : null}
      </div>
      <ul className="grid grid-cols-3 gap-4 px-4">
        {items.length > 0 ? (
          <InstanceIdContext.Provider value={instanceId}>
            {items.map((card) => (
              <CardContainer
                key={card.type}
                card={card}
                onCardClick={onCardClick}
              />
            ))}
          </InstanceIdContext.Provider>
        ) : (
          <>No data found</>
        )}
      </ul>
    </>
  );
});
