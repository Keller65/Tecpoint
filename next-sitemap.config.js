module.exports = {
  siteUrl: 'https://tecpoint.vercel.app',
  generateRobotsTxt: true,
  outDir: 'public',
  sitemapSize: 50000,
  async additionalPaths(config) {
    const fetchAllProducts = async () => {
      let products = [];
      let page = 1;
      const perPage = 100;

      try {
        while (true) {
          const response = await fetch(
            `https://tecpoint.ws/wp-json/wc/v3/products?per_page=${perPage}&page=${page}`,
            {
              headers: {
                'Authorization':
                  'Basic ' +
                  Buffer.from(
                    `${process.env.NEXT_PUBLIC_WC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WC_SECRET_KEY}`
                  ).toString('base64'),
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error WooCommerce: ${response.statusText}`);
          }

          const pageProducts = await response.json();
          products = [...products, ...pageProducts];

          if (pageProducts.length < perPage) break;
          page++;
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }

      return products;
    };

    const products = await fetchAllProducts();
    return products.map((product) => ({
      loc: `${config.siteUrl}/shop/${product.slug}`,
      lastmod: new Date().toISOString(),
    }));
  },
};
