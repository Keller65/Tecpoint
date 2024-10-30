export interface Product {
  id: number;
  name?: string;
  price?: string;
  currency?: string;
  images: { src: string }[];
  slug?: string;
  description?: string
  sku?: string
}

export const getWooCommerceProducts = async () => {
  try {
    const response = await fetch('https://tecpoint.ws/wp-json/wc/v3/products', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`ck_2406bdb0efd3117366b3a54861feb7aad8bd126f:cs_0a7a1205e3dcc73631f8249a4cef6b1bc1adf710`).toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`Error woocommerce: ${response.statusText}`);
    }

    const products = await response.json();
    console.log(products);
    return products;

  } catch (error) {
    console.error('Error al realizar el fetch de los productos:', error);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  let products: Product[] = [];
  let page = 1;
  const perPage = 100; // Número de productos por página

  try {
    while (true) {
      const response = await fetch(`https://tecpoint.ws/wp-json/wc/v3/products?per_page=${perPage}&page=${page}`, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`ck_2406bdb0efd3117366b3a54861feb7aad8bd126f:cs_0a7a1205e3dcc73631f8249a4cef6b1bc1adf710`).toString('base64')
        }
      });

      if (!response.ok) {
        throw new Error(`Error woocommerce: ${response.statusText}`);
      }

      const pageProducts: Product[] = await response.json();
      products = [...products, ...pageProducts];

      // Si no hay más productos en la página, terminamos el ciclo
      if (pageProducts.length < perPage) break;
      page++;
    }

    return products; // Retornamos todos los productos
  } catch (error) {
    console.error('Error al realizar el fetch de los productos:', error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const response = await fetch(`https://tecpoint.ws/wp-json/wc/v3/products?slug=${slug}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`ck_2406bdb0efd3117366b3a54861feb7aad8bd126f:cs_0a7a1205e3dcc73631f8249a4cef6b1bc1adf710`).toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`Error woocommerce: ${response.statusText}`);
    }

    const products: Product[] = await response.json();
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
};