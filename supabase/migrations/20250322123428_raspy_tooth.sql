/*
  # Add farm reference to farmer products

  1. Changes
    - Add farm_id column to farmer_products table
    - Add foreign key constraint to farms table
    - Update RLS policies to check farm ownership
*/

-- Add farm_id column
ALTER TABLE farmer_products 
ADD COLUMN farm_id uuid REFERENCES farms(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS farmer_products_farm_id_idx ON farmer_products(farm_id);

-- Update RLS policies to include farm ownership check
DROP POLICY IF EXISTS "Farmers can create their own products" ON farmer_products;
DROP POLICY IF EXISTS "Farmers can update their own products" ON farmer_products;
DROP POLICY IF EXISTS "Farmers can delete their own products" ON farmer_products;

CREATE POLICY "Farmers can create their own products"
  ON farmer_products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = farmer_id AND
    EXISTS (
      SELECT 1 FROM farms
      WHERE farms.id = farm_id
      AND farms.farmer_id = auth.uid()
    )
  );

CREATE POLICY "Farmers can update their own products"
  ON farmer_products
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = farmer_id AND
    EXISTS (
      SELECT 1 FROM farms
      WHERE farms.id = farm_id
      AND farms.farmer_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = farmer_id AND
    EXISTS (
      SELECT 1 FROM farms
      WHERE farms.id = farm_id
      AND farms.farmer_id = auth.uid()
    )
  );

CREATE POLICY "Farmers can delete their own products"
  ON farmer_products
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = farmer_id AND
    EXISTS (
      SELECT 1 FROM farms
      WHERE farms.id = farm_id
      AND farms.farmer_id = auth.uid()
    )
  );