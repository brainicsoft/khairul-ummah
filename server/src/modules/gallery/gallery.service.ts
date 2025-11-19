// gallery.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IGallery } from "./gallery.interface";
    import { Gallery } from "./gallery.model";

    // Create New gallery service
 
    export const createGalleryService = async (payload: IGallery) => {
  const result = await Gallery.create(payload);
  return result;
};

// getAll gallery service

    export const getAllGalleryService = async (query: Record<string, unknown>) => {
      const galleryQueries = new QueryBuilder(Gallery.find(), query)
      .sort()
      .filter()
      .search([
            'image',
            'alt',
            'title',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await galleryQueries.modelQuery;
      const meta = await galleryQueries.countTotal();
      return {result , meta};
};

// get gallery by Id or single  service

export const getGalleryByIdService = async (id:string) => {
  const result = await Gallery.findById(id);
  return result;
};

// delete gallery by Id or single  service

export const deleteGalleryByIdService = async (id:string) => {
  const result = await Gallery.findByIdAndDelete(id);
  return result;
};
// update gallery by Id or single  service

export const updateGalleryByIdService = async (id:string,payload:Partial<IGallery>) => {
  const result = await Gallery.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      