import { CardType } from "../types";
import { arrayToObj } from "../utils";

export const data: CardType[] = [
  {
    type: "bank draft",
    title: "Bank Draft",
    position: 0,
    imgUrl:
      "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    type: "invoice",
    title: "Invoice",
    position: 2,
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1683880731792-39c07ceea617?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvcmtwbGFjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    type: "bank-draft-2",
    title: "Bank Draft 2",
    position: 3,
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1661764256397-af154e87b1b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    position: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const dataMap = arrayToObj(data, "type");
