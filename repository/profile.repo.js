import { Profile } from "../models/Profile.model.js";
import { EmptyProfileModel } from "../utils/getEmpltyModel.js";

export const createProfile = async (candidate) => {
  let newProfile = EmptyProfileModel;
  newProfile.candidateID = candidate._id;
  newProfile.fullName = candidate.fullName;
  newProfile.email = candidate.email;
  newProfile.personalDetails.email = candidate.email;
  newProfile.mobileNumber = candidate.mobileNumber;
  newProfile.profilePicture = candidate.picture ? candidate.picture : "";
  newProfile.personalDetails.maritalStatus = "single";
  newProfile.personalDetails.gender = "male";

  const profile = await Profile.create(newProfile);

  return profile;
};

export const updateProfileByCandidateID = async (id,data) => {

  const profile = await Profile.findOne({ candidateID: id });

  if (!profile) throw new CustomError(404, "Candidate profile not found.");

  const { profilePicture, fullName, jobTitle, companyName, location, experience, salary, mobileNumber, email, availabilityToJoin, employment, personalDetails, education} = data;
  const { educationType, university, course, courseType, specialization, duration, percentage } = education;
  const { isCurrentEmployement, employmentType,totalExperience, currentCompanyName, currentJobTitle, joiningDate, currentSalary, salaryBloakdown, skills, jobProfile, noticePeriod, } = employment;
  const { gender, maritalStatus, dob, category, abled, type, workplaceAssistance, address, city, pincode,} = personalDetails;
 
     profile.fullName = fullName || profile.fullName;
     profile.profilePicture = profilePicture || profile.profilePicture;
     profile.jobTitle = jobTitle || profile.jobTitle;
     profile.companyName = companyName || profile.companyName;
     profile.lastUpdatedAt = Date.now();
     profile.location = location || profile.location;
     profile.experience = experience || profile.experience;
     profile.salary = salary || profile.salary;
     profile.mobileNumber = mobileNumber || profile.mobileNumber;
     profile.email = email || profile.email;
     profile.availabilityToJoin = availabilityToJoin || profile.availabilityToJoin;
     profile.education.educationType = educationType || profile.education.educationType;
     profile.education.university = university || profile.education.university;
     profile.education.course = course || profile.education.course;
     profile.education.courseType = courseType || profile.education.courseType;
     profile.education.specialization = specialization || profile.education.specialization;
     profile.education.duration = duration || profile.education.duration;
     profile.education.percentage = percentage || profile.education.percentage;
     
     
     profile.employment.isCurrentEmployement = isCurrentEmployement || profile.employment.isCurrentEmployement;
     profile.employment.employmentType = employmentType || profile.employment.employmentType;
     profile.employment.totalExperience = totalExperience || profile.employment.totalExperience;
     profile.employment.currentCompanyName = currentCompanyName || profile.employment.currentCompanyName;
     profile.employment.currentJobTitle = currentJobTitle || profile.employment.currentJobTitle;
     profile.employment.joiningDate = joiningDate || profile.employment.joiningDate;
     profile.employment.currentSalary = currentSalary || profile.employment.currentSalary;
     profile.employment.salaryBloakdown = salaryBloakdown || profile.employment.salaryBloakdown;
     profile.employment.skills = skills || profile.employment.skills;
     profile.employment.jobProfile = jobProfile || profile.employment.jobProfile;
     profile.employment.noticePeriod = noticePeriod || profile.employment.noticePeriod;
     
     profile.personalDetails.email = email || profile.personalDetails.email;
     profile.personalDetails.mobileNumber = mobileNumber || profile.personalDetails.mobileNumber;
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

    return profile;
};
