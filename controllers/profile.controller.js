import { Profile } from "../models/Profile.model.js";
import { CustomError } from "../middlewares/errorHandler.js";
import { updateProfileByCandidateID } from "../repository/profile.repo.js";
// import { customResponse } from "../utils/cutomResponse.js";

export const getCandidateDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) throw new CustomError(400, "Candidate ID is required.");

    const profile = await Profile.findOne({ candidateID: id });
    if (!profile) throw new CustomError(404, "Candidate profile not found.");

    res
      .status(200)
      .json(
        {success: true, message:"Profile details fetched successfully.", profile}
      );
  } catch (error) {
    next(error);
  }
};

export const updateCandidateDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) throw new CustomError(400, "Candidate ID is required.");

    const profile = await updateProfileByCandidateID(id, req.body);

    res
      .status(200)
      .json(
        {success:true,message: "Candidate details updated successfully.", profile}
      );
  } catch (error) {
    next(error);
  }
};
