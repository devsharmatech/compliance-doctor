export interface Blog {
  title: string;
  image: string;
  url: string;
  buttonTitle: string;
  description: string;
  isActive: boolean;
}

export interface BlogSection {
  _id: string;
  // title: string;
  // description: string;
  // blogs: Blog[];
  // isActive: boolean;
  title: string;
  image: string;
  url: string;
  buttonTitle: string;
  description: string;
  isActive: boolean;
  slug?: string;
}
