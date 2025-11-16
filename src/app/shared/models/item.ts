export interface Item {
  id: number;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  tags?: string[];
}
