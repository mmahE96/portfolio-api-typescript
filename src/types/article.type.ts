import { User } from "./user.type";

interface Article {
  id: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  category: any;
  dateCreated?: string;
  dateUpdated?: string;
  authorId?: number;
  author: User;
  Category? : any
  categoryId? : number
}


interface Category {
  id?: string;
  name: string;
  articles: any;
}

export { Article, Category };
