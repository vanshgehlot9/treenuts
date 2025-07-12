-- Update GST number for all products
UPDATE products 
SET gst_number = '08CYZPJ048Q1Z9' 
WHERE gst_number IS NULL OR gst_number != '08CYZPJ048Q1Z9'; 