import { Candidate } from "../models/Candidate.model.js";
import { Profile } from "../models/Profile.model.js";
import { CustomError } from "../middlewares/errorHandler.js";

export const getCandidateDetails = async (req, res, next) => {
    try {
      const { id } = req.user;
      if (!id) throw new CustomError(400, "Candidate ID is required.");

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
      const { id } = req.user;
      if (!id) throw new CustomError(400, "Candidate ID is required.");
  
      const profile = await Profile.findOne({ candidateID: id });
      if (!profile) throw new CustomError(404, "Candidate profile not found.");
      const { fullName, jobTitle, companyName, location, experience, salary, mobileNumber, email, availabilityToJoin, employment, personalDetails} = req.body;
      const { isCurrentEmployement, employmentType } = employment;
      const { gender, maritalStatus, dob, category, abled, type, workplaceAssistance, address, city, pincode} = personalDetails;
  
      profile.fullName = fullName || profile.fullName;
      profile.jobTitle = jobTitle || profile.jobTitle;
      profile.companyName = companyName || profile.companyName;
      profile.location = location || profile.location;
      profile.experience = experience || profile.experience;
      profile.salary = salary || profile.salary;
      profile.mobileNumber = mobileNumber || profile.mobileNumber;
      profile.email = email || profile.email;
      profile.availabilityToJoin = availabilityToJoin || profile.availabilityToJoin;
      
      profile.employment.isCurrentEmployement = isCurrentEmployement || profile.employment.isCurrentEmployement;
      profile.employment.employmentType = employmentType || profile.employment.employmentType;
      
      profile.personalDetails.gender = gender || profile.personalDetails.gender;
      profile.personalDetails.maritalStatus = maritalStatus || profile.personalDetails.maritalStatus;
      profile.personalDetails.dob = dob || profile.personalDetails.dob;
      profile.personalDetails.category = category || profile.personalDetails.category;
      profile.personalDetails.abled = abled || profile.personalDetails.abled;
      profile.personalDetails.type = type || profile.personalDetails.type;
      profile.personalDetails.workplaceAssistance = workplaceAssistance || profile.personalDetails.workplaceAssistance;
      profile.personalDetails.address = address || profile.personalDetails.address;
      profile.personalDetails.city = city || profile.personalDetails.city;
      profile.personalDetails.pincode = pincode || profile.personalDetails.pincode;

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
  