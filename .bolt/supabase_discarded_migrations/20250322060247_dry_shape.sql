/*
  # Add farm image support

  1. Changes
    - Add `image_url` column to farms table
    - Enable storage extension
    - Create storage bucket for farm images
    - Set up storage bucket policies
*/

-- Enable storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage";

-- Add image_url column to farms table
ALTER TABLE farms ADD COLUMN IF NOT EXISTS image_url text;

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('farm_images', 'farm_images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket policies
CREATE POLICY "Authenticated users can upload farm images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'farm_images');

CREATE POLICY "Anyone can view farm images"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'farm_images');

CREATE POLICY "Users can update their own farm images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'farm_images' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own farm images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'farm_images' AND auth.uid() = owner);