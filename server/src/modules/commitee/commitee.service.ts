// commitee.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { ICommitee } from "./commitee.interface";
import { Commitee } from "./commitee.model";

// Create New commitee service

export const createCommiteeService = async (payload: ICommitee) => {
  const result = await Commitee.create(payload);
  return result;
};

// getAll commitee service

export const getAllCommiteeService = async (query: Record<string, unknown>) => {
  const commiteeQueries = new QueryBuilder(Commitee.find(), query)
    .sort()
    .filter()
    .search([
      'name',
      'roleType',
      // 'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()

  const result = await commiteeQueries.modelQuery;
  const meta = await commiteeQueries.countTotal();
  return {result, meta};
};

// get commitee by Id or single  service

export const getCommiteeByIdService = async (id: string) => {
  const result = await Commitee.findById(id);
  return result;
};

// delete commitee by Id or single  service

export const deleteCommiteeByIdService = async (id: string) => {
  const result = await Commitee.findByIdAndDelete(id);
  return result;
};
// update commitee by Id or single  service

export const updateCommiteeByIdService = async (id: string, payload: Partial<ICommitee>) => {
  const result = await Commitee.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


// Get only slugs of all donation projects
export const getAllRoleTypeMembersService = async () => {
  const roleTypeMembers = await Commitee.distinct("roleType")
    

  return roleTypeMembers;
};

