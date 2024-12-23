import { HttpClient, HttpMethodEnum } from "./httpClient";
import { CardType } from "../types";

class CardService {
  private http: HttpClient;
  private static instance: CardService;

  private constructor() {
    this.http = HttpClient.getInstance("/api");
  }

  public static getInstance(): CardService {
    if (!CardService.instance) {
      CardService.instance = new CardService();
    }
    return CardService.instance;
  }

  async fetchCards(): Promise<CardType[]> {
    return this.http.get<CardType[]>("/cards");
  }

  async updateCards(cards: CardType[]): Promise<CardType[]> {
    return this.http.request<CardType[], CardType[]>("/cards/reorder", {
      method: HttpMethodEnum.PUT,
      body: cards,
    });
  }

  async addCard(card: CardType): Promise<CardType> {
    return this.http.post<CardType, CardType>("/cards", card);
  }

  async deleteCard(type: string): Promise<void> {
    return this.http.request(`/cards/${type}`, {
      method: HttpMethodEnum.DELETE,
    });
  }
}

export const cardService = CardService.getInstance();
