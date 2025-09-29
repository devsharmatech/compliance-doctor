export interface INotice {
  _id: string;
  title: string;
  description: string;
  tag?: string;
  publishedDate: string;
  type: 'update' | 'dueDate';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}

export interface INoticePayload {
  title: string;
  description: string;
  tag?: string;
  publishedDate: string;
  type: 'update' | 'dueDate';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}
