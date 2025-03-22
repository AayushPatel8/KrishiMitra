/*
  # Add farm image support

  1. Changes
    - Add `image_url` column to farms table
    - Create storage bucket for farm images
*/

-- Add image_url column to farms table
ALTER TABLE farms ADD COLUMN IF NOT EXISTS image_url text;

-- Enable storage
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('farm_images', 'farm_images', true)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO storage.policies (bucket_id, name, permission, definition)
  VALUES
    ('farm_images', 'Authenticated users can upload farm images', 'INSERT', '(role() = ''authenticated''::text)'),
    ('farm_images', 'Anyone can view farm images', 'SELECT', '(role() = ''anon''::text)'),
    ('farm_images', 'Users can update their own farm images', 'UPDATE', '(role() = ''authenticated''::text AND auth.uid() = owner)'),
    ('farm_images', 'Users can delete their own farm images', 'DELETE', '(role() = ''authenticated''::text AND auth.uid() = owner)')
  ON CONFLICT (bucket_id, name) DO NOTHING;
END $$;