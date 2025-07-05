-- Update product prices to Indian Rupees

UPDATE products SET 
  price = 1999,
  original_price = 2499
WHERE slug = 'premium-california-almonds';

UPDATE products SET 
  price = 1499,
  original_price = NULL
WHERE slug = 'organic-medjool-dates';

UPDATE products SET 
  price = 2799,
  original_price = 3299
WHERE slug = 'turkish-pistachios';

UPDATE products SET 
  price = 1899,
  original_price = NULL
WHERE slug = 'mixed-dried-fruits';

UPDATE products SET 
  price = 2399,
  original_price = 2899
WHERE slug = 'raw-cashews';

UPDATE products SET 
  price = 2199,
  original_price = NULL
WHERE slug = 'english-walnuts';

UPDATE products SET 
  price = 1899,
  original_price = 2299
WHERE slug = 'roasted-almonds';

UPDATE products SET 
  price = 1699,
  original_price = NULL
WHERE slug = 'organic-dried-apricots';

UPDATE products SET 
  price = 2999,
  original_price = 3599
WHERE slug = 'deluxe-mixed-nuts';

UPDATE products SET 
  price = 2699,
  original_price = NULL
WHERE slug = 'honey-roasted-cashews';
