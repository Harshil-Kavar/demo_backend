import { Candidate } from "../models/Candidate.model.js";
import { Profile } from "../models/Profile.model.js";
import { CustomError } from "../middlewares/errorHandler.js";

export const getCandidateDetails = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new CustomError(400, "Candidate ID is required.");

      const candidate = await Candidate.findById(id);
      if (!candidate) throw new CustomError(404, "Candidate not found.");

      const profile = await Profile.findOne({ candidateID: id });
      if (!profile) throw new CustomError(404, "Candidate profile not found.");

      res.status(200).json({
        success: true,
        message: "Profile details fetched successfully.",
        profile,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateCandidateDetails = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new CustomError(400, "Candidate ID is required.");
  
      const candidate = await Candidate.findById(id);
      if (!candidate) throw new CustomError(404, "Candidate not found.");
  
      const profile = await Profile.findOne({ candidateID: id });
      if (!profile) throw new CustomError(404, "Candidate profile not found.");
  
      const { fullName, jobTitle, companyName, location, experience, salary, mobileNumber, email, availabilityToJoin, employment} = req.body;
      const { isCurrentEmployement, employmentType, personalDetails } = employment;
      const { gender, maritalStatus, dob, category, abled, type, workplaceAssistance, address, city, pincode} = personalDetails;
  
    profile.fullName = fullName || candidate.fullName;
    profile.jobTitle = jobTitle || profile.jobTitle;
    profile.companyName = companyName || profile.companyName;
    profile.location = location || profile.location;
    profile.experience = experience || profile.experience;
    profile.salary = salary || profile.salary
    profile.mobileNumber = mobileNumber || candidate.mobileNumber;
    profile.email = email || candidate.email;
    profile.availabilityToJoin = availabilityToJoin || profile.availabilityToJoin;

    profile.employment.isCurrentEmployement = isCurrentEmployement || profile.employment.isCurrentEmployement;
    profile.employment.employmentType = employmentType || profile.employment.employmentType;

    profile.employment.personalDetails.gender = gender || profile.employment.personalDetails.gender 
    profile.employment.personalDetails.maritalStatus = maritalStatus || profile.employment.personalDetails.maritalStatus 
    profile.employment.personalDetails.dob = dob || profile.employment.personalDetails.dob 
    profile.employment.personalDetails.category = category || profile.employment.personalDetails.category 
    profile.employment.personalDetails.abled = abled || profile.employment.personalDetails.abled 
    profile.employment.personalDetails.type = type || profile.employment.personalDetails.type 
    profile.employment.personalDetails.workplaceAssistance = workplaceAssistance || profile.employment.personalDetails.workplaceAssistance 
    profile.employment.personalDetails.address = address || profile.employment.personalDetails.address 
    profile.employment.personalDetails.city = city || profile.employment.personalDetails.city 
    profile.employment.personalDetails.pincode = pincode || profile.employment.personalDetails.pincode 

    await profile.save();
    res.status(200).json({
        success: true,
        message: "Candidate details updated successfully.",
        profile,
      });
  
    } catch (error) {
      next(error);
    }
  };
  