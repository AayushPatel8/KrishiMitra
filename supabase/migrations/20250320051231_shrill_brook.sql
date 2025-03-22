/*
  # Create farms table and related schemas

  1. New Tables
    - `farms`
      - `id` (uuid, primary key)
      - `name` (text, farm name)
      - `farmer_id` (uuid, references auth.users)
      - `state` (text, state name)
      - `district` (text)
      - `village` (text)
      - `pincode` (text)
      - `land_size` (numeric, size of land)
      - `land_unit` (text, either 'acres' or 'hectares')
      - `farming_type` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `farm_crops`
      - `id` (uuid, primary key)
      - `farm_id` (uuid, references farms)
      - `crop_name` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated farmers to manage their own farms
    - Add policies for authenticated farmers to manage their farm crops
*/

-- Create farms table
CREATE TABLE IF NOT EXISTS farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  state text NOT NULL,
  district text NOT NULL,
  village text NOT NULL,
  pincode text NOT NULL,
  land_size numeric NOT NULL,
  land_unit text NOT NULL CHECK (land_unit IN ('acres', 'hectares')),
  farming_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create farm_crops table
CREATE TABLE IF NOT EXISTS farm_crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE NOT NULL,
  crop_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_crops ENABLE ROW LEVEL SECURITY;

-- Create policies for farms
CREATE POLICY "Farmers can view their own farms"
  ON farms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can insert their own farms"
  ON farms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own farms"
  ON farms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = farmer_id)
  WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete their own farms"
  ON farms
  FOR DELETE
  TO authenticated
  USING (auth.uid() = farmer_id);

-- Create policies for farm_crops
CREATE POLICY "Farmers can view their own farm crops"
  ON farm_crops
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM farms
    WHERE farms.id = farm_crops.farm_id
    AND farms.farmer_id = auth.uid()
  ));

CREATE POLICY "Farmers can insert crops for their own farms"
  ON farm_crops
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM farms
    WHERE farms.id = farm_crops.farm_id
    AND farms.farmer_id = auth.uid()
  ));

CREATE POLICY "Farmers can delete crops from their own farms"
  ON farm_crops
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM farms
    WHERE farms.id = farm_crops.farm_id
    AND farms.farmer_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS farms_farmer_id_idx ON farms(farmer_id);
CREATE INDEX IF NOT EXISTS farm_crops_farm_id_idx ON farm_crops(farm_id);