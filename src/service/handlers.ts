import { http, HttpResponse } from "msw";
import { data as initialData } from "../db/data";
import { CardType } from "../types";
import { localStorageService } from "../service/localStorage";

const STORAGE_KEY = "cards_data";

// Initialize storage with default data if empty
if (!localStorageService.readValue(STORAGE_KEY)) {
  localStorageService.setValue(STORAGE_KEY, initialData);
}

export const handlers = [
  // Get all cards
  http.get("/api/cards", () => {
    const cards = localStorageService.readValue<CardType[]>(STORAGE_KEY) || [];
    return HttpResponse.json(cards, { status: 200 });
  }),

  // Update cards order
  http.put("/api/cards/reorder", async ({ request }) => {
    const updatedCards = (await request.json()) as CardType[];
    localStorageService.setValue(STORAGE_KEY, updatedCards);
    return HttpResponse.json(updatedCards, { status: 200 });
  }),

  // Add new card
  http.post("/api/cards", async ({ request }) => {
    const newCard = (await request.json()) as CardType;
    const cards = localStorageService.readValue<CardType[]>(STORAGE_KEY) || [];
    const updatedCards = [...cards, newCard];
    localStorageService.setValue(STORAGE_KEY, updatedCards);
    return HttpResponse.json(newCard, { status: 201 });
  }),

  // Delete card
  http.delete("/api/cards/:type", ({ params }) => {
    const { type } = params;
    if (!type)
      return HttpResponse.json({ error: "Type is required" }, { status: 400 });

    const cards = localStorageService.readValue<CardType[]>(STORAGE_KEY) || [];
    const updatedCards = cards.filter((card) => card.type !== type.toString());
    localStorageService.setValue(STORAGE_KEY, updatedCards);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
