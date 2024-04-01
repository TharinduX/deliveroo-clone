export type MenuItem = {
  id: string;
  categoryId: string;
  isPopular: boolean;
  name: string;
  itemSlug: string;
  description: string;
  image: string;
  kcal: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  categorySlug: string;
  restaurantId: string;
  menuItems: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type RestaurantType = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  phone: string;
  image: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
};
