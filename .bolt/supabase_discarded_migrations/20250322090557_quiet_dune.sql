/*
  # Fix product creation policies

  1. Changes
    - Drop existing policies
    - Create new, more permissive policies for product management
    - Add missing storage policies for product images

  2. Security
    - Enable RLS
    - Add policies for farmers to manage their products
    - Add policies for users to view products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Farmers can view their own products" ON farmer_products;
DROP POLICY IF EXISTS "Farmers can insert their own products" ON farmer_products;
DROP POLICY IF EXISTS "Farmers can update their own products" ON farmer_products;
DROP POLICY IF EXISTS "Farmers can delete their own products" ON farmer_products;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON farmer_products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON farmer_products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Enable update for users based on farmer_id"
  ON farmer_products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Enable delete for users based on farmer_id"
  ON farmer_products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Create storage bucket for product images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product_images', 'product_images', true)
ON CONFLICT (id) DO NOTHING;

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