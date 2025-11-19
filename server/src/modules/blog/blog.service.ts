// blog.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IBlog } from "./blog.interface";
    import { Blog } from "./blog.model";

    // Create New blog service
 
    export const createBlogService = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

// getAll blog service

    export const getAllBlogService = async (query: Record<string, unknown>) => {
      const blogQueries = new QueryBuilder(Blog.find(), query)
      .sort()
      .filter()
      .search([
            'name',
            'category',
            'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await blogQueries.modelQuery;
      const meta = await blogQueries.countTotal();
      return {result , meta};
};

// get blog by Id or single  service

export const getBlogByIdService = async (id:string) => {
  const result = await Blog.findById(id);
  return result;
};

export const getBlogBySlugService = async (slug:string) => {
  let blog;
  if(slug){
    blog = await Blog.findOne({slug:slug});
  }
  return blog;
};

// delete blog by Id or single  service

export const deleteBlogByIdService = async (id:string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
// update blog by Id or single  service

export const updateBlogByIdService = async (id:string,payload:Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      