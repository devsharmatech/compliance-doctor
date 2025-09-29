export interface IService {
  _id: string;
    name: string;
  description: string;
   type: string;
  category?: {_id: number | string; name: string;};
  icon?: string;
  ctaLabel?: string;
  isActive: boolean;
  slug: string;
  bannerImage?: string;
  gallery?: string[];
  contentSections?: {
    title: string;
    content: string;
    image?: string;
  }[];
  features?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
  testimonials?: {
    name: string;
    quote: string;
    image?: string;
  }[];
  metaTitle?: string;
  metaDescription?: string;
  featuredFor?: ('navbar' | 'footer' | 'hero' | 'homepage' | 'sidebar')[];
  order?: number;
  createdAt?: Date;
  formFields?: IFormField[];
}

export interface IFormField {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'file' | 'email';
  options?: string[]; // for select, radio
  required?: boolean;
  placeholder?: string;
}
