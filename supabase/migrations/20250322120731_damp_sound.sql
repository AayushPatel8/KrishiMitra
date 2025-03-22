/*
  # Add farmer products and pricing management

  1. New Tables
    - `farmer_products`
      - `id` (uuid, primary key)
      - `farmer_id` (uuid, references auth.users)
      - `name` (text, product name)
      - `description` (text, optional)
      - `category` (text, product category)
      - `unit` (text, either 'kg' or 'pcs')
      - `price` (numeric, current price)
      - `stock` (numeric, available quantity)
      - `image_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for farmers to manage their products
    - Add policies for users to view products
*/

-- Create farmer_products table
CREATE TABLE IF NOT EXISTS farmer_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  unit text NOT NULL CHECK (unit IN ('kg', 'pcs')),
  price numeric NOT NULL,
  stock numeric NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE farmer_products ENABLE ROW LEVEL SECURITY;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS farmer_products_farmer_id_idx ON farmer_products(farmer_id);

-- Policies for farmers (full access to their own products)
CREATE POLICY "Anyone can view products"
  ON farmer_products
  FOR SELECT
  USING (true);

CREATE POLICY "Farmers can create their own products"
  ON farmer_products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own products"
  ON farmer_products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete their own products"
  ON farmer_products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Create storage bucket for product images if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('product_images', 'product_images', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Create storage policies for product images
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product_images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product_images');

CREATE POLICY "Users can update their own product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product_images' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product_images' AND auth.uid() = owner);