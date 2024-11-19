import axios from 'axios';

// Тип для продукту
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
}

// Тип для категорії
export interface Category {
  id: number;
  name: string;
  image: string;
}

// Ендпоїнти для API
const API_URL = 'https://api.escuelajs.co/api/v1';

// Отримання продуктів
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    return data.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      description: product.description.slice(0, 100) + '...', // Обрізаємо опис
      categoryId: product.category.id, // Додаємо категорію до продукту
    }));
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
};

// Отримання категорій
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);
    return data.map((category: any) => ({
      id: category.id,
      name: category.name,
      image: category.image,
    }));
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
};

// Отримання продукту за ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.images[0],
      description: data.description,
      categoryId: data.category.id,
    };
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return null;  // Якщо продукт не знайдений або сталася помилка, повертаємо null
  }
};
