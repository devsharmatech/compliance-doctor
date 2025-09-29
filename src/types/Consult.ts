export interface IConsult {
  _id: string;
  consultType: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  additionalDetails?: { title: string; image?: string }[]; //  Changed from string
  contentSections?: {
    title: string;
    content: string;
    image?: string;
    optionalContent: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];

  advantageSections?: {
    title: string;
    image?: string;
    content: string;
  }[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsultType {
  _id: string;
  name: string;
}
