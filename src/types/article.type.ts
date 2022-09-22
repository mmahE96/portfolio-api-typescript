interface Article {
  id?: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  category: any;
  date?: string;
  author: any;
}

interface Category {
  id?: string;
  name: string;
  articles: any;
}

export { Article, Category };
