-- Seed data for Tree Nuts e-commerce

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Almonds', 'almonds', 'Premium quality almonds from California and Mediterranean regions', '/placeholder.svg?height=200&width=200'),
('Walnuts', 'walnuts', 'Fresh English walnuts and black walnuts', '/placeholder.svg?height=200&width=200'),
('Pistachios', 'pistachios', 'Turkish and Iranian pistachios, roasted and raw', '/placeholder.svg?height=200&width=200'),
('Cashews', 'cashews', 'Creamy cashews from India and Vietnam', '/placeholder.svg?height=200&width=200'),
('Dried Fruits', 'dried-fruits', 'Naturally dried fruits including dates, figs, and apricots', '/placeholder.svg?height=200&width=200'),
('Mixed Nuts', 'mixed-nuts', 'Carefully curated mixed nut selections', '/placeholder.svg?height=200&width=200');

-- Insert products
INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, rating, review_count) VALUES
('Premium California Almonds', 'premium-california-almonds', 'Raw, unsalted California almonds. Perfect for snacking or baking. Rich in vitamin E and healthy fats.', 24.99, 29.99, 1, '/placeholder.svg?height=300&width=300', 100, 4.8, 124),
('Organic Medjool Dates', 'organic-medjool-dates', 'Large, soft Medjool dates from organic farms. Naturally sweet and perfect for healthy snacking.', 18.99, NULL, 5, '/placeholder.svg?height=300&width=300', 75, 4.9, 89),
('Turkish Pistachios', 'turkish-pistachios', 'Roasted and lightly salted Turkish pistachios. Known for their rich flavor and vibrant color.', 32.99, 39.99, 3, '/placeholder.svg?height=300&width=300', 50, 4.7, 156),
('Mixed Dried Fruits', 'mixed-dried-fruits', 'Assorted premium dried fruits including apricots, figs, and dates. No added sugar.', 21.99, NULL, 5, '/placeholder.svg?height=300&width=300', 80, 4.6, 203),
('Raw Cashews', 'raw-cashews', 'Premium raw cashews from sustainable farms. Creamy texture and mild flavor.', 28.99, 34.99, 4, '/placeholder.svg?height=300&width=300', 60, 4.5, 87),
('English Walnuts', 'english-walnuts', 'Fresh English walnut halves. Rich in omega-3 fatty acids and perfect for baking.', 26.99, NULL, 2, '/placeholder.svg?height=300&width=300', 90, 4.7, 142),
('Roasted Almonds', 'roasted-almonds', 'Lightly roasted almonds with sea salt. Crunchy and flavorful snack.', 22.99, 27.99, 1, '/placeholder.svg?height=300&width=300', 120, 4.6, 98),
('Organic Dried Apricots', 'organic-dried-apricots', 'Sun-dried organic apricots. No sulfur added, naturally sweet and chewy.', 19.99, NULL, 5, '/placeholder.svg?height=300&width=300', 70, 4.8, 76),
('Deluxe Mixed Nuts', 'deluxe-mixed-nuts', 'Premium mix of almonds, cashews, walnuts, and pistachios. Perfect for entertaining.', 35.99, 42.99, 6, '/placeholder.svg?height=300&width=300', 45, 4.9, 134),
('Honey Roasted Cashews', 'honey-roasted-cashews', 'Cashews roasted with natural honey. Sweet and savory combination.', 31.99, NULL, 4, '/placeholder.svg?height=300&width=300', 55, 4.4, 67);
