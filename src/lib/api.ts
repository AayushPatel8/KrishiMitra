import { supabase } from './supabase';
import type { Farm, FarmCrop, FarmerProduct } from './types';

export async function getFarmerFarms(): Promise<Farm[]> {
  const { data: farms, error: farmsError } = await supabase
    .from('farms')
    .select('*')
    .order('created_at', { ascending: true });

  if (farmsError) {
    throw new Error('Error fetching farms');
  }

  // Get crops for all farms
  const { data: crops, error: cropsError } = await supabase
    .from('farm_crops')
    .select('*')
    .in('farm_id', farms.map(f => f.id));

  if (cropsError) {
    throw new Error('Error fetching farm crops');
  }

  // Combine farms with their crops
  return farms.map(farm => ({
    ...farm,
    crops: crops
      .filter(crop => crop.farm_id === farm.id)
      .map(crop => crop.crop_name)
  }));
}

async function uploadFarmImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('farm_images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Image upload error:', uploadError);
    throw new Error('Error uploading farm image');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('farm_images')
    .getPublicUrl(filePath);

  return publicUrl;
}

async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('product_images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Image upload error:', uploadError);
    throw new Error('Error uploading product image');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product_images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function createFarm(
  farm: Omit<Farm, 'id' | 'farmer_id' | 'created_at' | 'updated_at'>, 
  crops: string[],
  image?: File
) {
  // Get the current user's ID
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  // Upload image if provided
  let image_url: string | undefined;
  if (image) {
    try {
      image_url = await uploadFarmImage(image);
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Error uploading farm image');
    }
  }

  // Create the farm
  const { data: farmData, error: farmError } = await supabase
    .from('farms')
    .insert({
      farmer_id: user.id,
      name: farm.name,
      state: farm.state,
      district: farm.district,
      village: farm.village,
      pincode: farm.pincode,
      land_size: farm.land_size,
      land_unit: farm.land_unit,
      farming_type: farm.farming_type,
      image_url
    })
    .select()
    .single();

  if (farmError) {
    console.error('Farm creation error:', farmError);
    throw new Error('Error creating farm');
  }

  if (!farmData) {
    throw new Error('No farm data returned after creation');
  }

  // Create crops if specified
  if (crops.length > 0) {
    const cropInserts = crops.map(crop => ({
      farm_id: farmData.id,
      crop_name: crop
    }));

    const { error: cropsError } = await supabase
      .from('farm_crops')
      .insert(cropInserts);

    if (cropsError) {
      console.error('Crops creation error:', cropsError);
      // If crops creation fails, delete the farm to maintain consistency
      await supabase.from('farms').delete().eq('id', farmData.id);
      throw new Error('Error adding farm crops');
    }
  }

  return farmData;
}

export async function updateFarm(
  farmId: string,
  farm: Omit<Farm, 'id' | 'farmer_id' | 'created_at' | 'updated_at'>,
  crops: string[],
  image?: File
) {
  // Upload new image if provided
  let image_url: string | undefined;
  if (image) {
    try {
      image_url = await uploadFarmImage(image);
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Error uploading farm image');
    }
  }

  // Update farm details
  const { error: farmError } = await supabase
    .from('farms')
    .update({
      name: farm.name,
      state: farm.state,
      district: farm.district,
      village: farm.village,
      pincode: farm.pincode,
      land_size: farm.land_size,
      land_unit: farm.land_unit,
      farming_type: farm.farming_type,
      ...(image_url && { image_url }),
      updated_at: new Date().toISOString()
    })
    .eq('id', farmId);

  if (farmError) {
    console.error('Farm update error:', farmError);
    throw new Error('Error updating farm');
  }

  // Delete existing crops
  const { error: deleteError } = await supabase
    .from('farm_crops')
    .delete()
    .eq('farm_id', farmId);

  if (deleteError) {
    console.error('Crops deletion error:', deleteError);
    throw new Error('Error updating farm crops');
  }

  // Add new crops
  if (crops.length > 0) {
    const cropInserts = crops.map(crop => ({
      farm_id: farmId,
      crop_name: crop
    }));

    const { error: cropsError } = await supabase
      .from('farm_crops')
      .insert(cropInserts);

    if (cropsError) {
      console.error('Crops creation error:', cropsError);
      throw new Error('Error adding farm crops');
    }
  }
}

export async function deleteFarm(farmId: string) {
  const { error } = await supabase
    .from('farms')
    .delete()
    .eq('id', farmId);

  if (error) {
    console.error('Farm deletion error:', error);
    throw new Error('Error deleting farm');
  }
}

export async function getFarmerProducts(): Promise<FarmerProduct[]> {
  const { data: products, error } = await supabase
    .from('farmer_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Error fetching products');
  }

  return products;
}

export async function createProduct(
  product: Omit<FarmerProduct, 'id' | 'farmer_id' | 'created_at' | 'updated_at'>,
  image?: File
) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  let image_url: string | undefined;
  if (image) {
    try {
      image_url = await uploadProductImage(image);
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Error uploading product image');
    }
  }

  const { data, error } = await supabase
    .from('farmer_products')
    .insert({
      farmer_id: user.id,
      name: product.name,
      description: product.description,
      category: product.category,
      unit: product.unit,
      price: product.price,
      stock: product.stock,
      image_url
    })
    .select()
    .single();

  if (error) {
    console.error('Product creation error:', error);
    throw new Error('Error creating product');
  }

  return data;
}

export async function updateProduct(
  productId: string,
  product: Omit<FarmerProduct, 'id' | 'farmer_id' | 'created_at' | 'updated_at'>,
  image?: File
) {
  let image_url: string | undefined;
  if (image) {
    try {
      image_url = await uploadProductImage(image);
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Error uploading product image');
    }
  }

  const { error } = await supabase
    .from('farmer_products')
    .update({
      name: product.name,
      description: product.description,
      category: product.category,
      unit: product.unit,
      price: product.price,
      stock: product.stock,
      ...(image_url && { image_url }),
      updated_at: new Date().toISOString()
    })
    .eq('id', productId);

  if (error) {
    console.error('Product update error:', error);
    throw new Error('Error updating product');
  }
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('farmer_products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Product deletion error:', error);
    throw new Error('Error deleting product');
  }
}