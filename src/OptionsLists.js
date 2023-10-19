function optionList(list) {
  let options = [];
  if (list === "previousRequirements") {
    options = [
      { label: "react", value: "React" },
      { value: "java", label: "java" },
      { value: ".Net", label: ".Net" },
      { value: "Python", label: "Python" },
      { value: "JavaScipt", label: ".JavaScipt" },
      { value: "C, C++", label: "C, C++" },
    ];
  } else if (list === "employmentType") {
    options = [
      { label: "full time", value: "full time" },
      { value: "Contract", label: "Contract" },
      { value: "Permanent", label: "Permanent" },
    ];
  } else if (list === "annualCTC") {
    options = [
      { label: "1 Lakh", value: "1 Lakh" },
      { label: "2 Lakhs", value: "2 Lakhs" },
      { label: "3 Lakhs", value: "3 Lakhs" },
      { label: "4 Lakhs", value: "4 Lakhs" },
      { label: "5 Lakhs", value: "5 Lakhs" },
      { label: "6 Lakhs", value: "6 Lakhs" },
      { label: "7 Lakhs", value: "7 Lakhs" },
      { label: "8 Lakhs", value: "8 Lakhs" },
      { label: "9 Lakhs", value: "9 Lakhs" },
      { label: "10 Lakhs", value: "10 Lakhs" },
    ];
  } else if (list === "thousands") {
    options = [
      { label: "10 Thousands", value: "10 Thousands" },
      { label: "20 Thousands", value: "20 Thousands" },
      { label: "30 Thousands", value: "30 Thousands" },
      { label: "40 Thousands", value: "40 Thousands" },
      { label: "50 Thousands", value: "50 Thousands" },
      { label: "60 Thousands", value: "60 Thousands" },
      { label: "70 Thousands", value: "70 Thousands" },
      { label: "80 Thousands", value: "80 Thousands" },
      { label: "90 Thousands", value: "90 Thousands" },
    ];
  } else if (list === "minimumSalary") {
    options = [
      { label: "2 lakh", value: "2" },
      { value: "5", label: "5 lakh" },
      { value: "2", label: "2" },
    ];
  } else if (list === "minimumWorkExperience") {
    options = [
      { label: "1 Year", value: "1 Year" },
      { label: "2 Years", value: "2 Years" },
      { label: "3 Years", value: "3 Years" },
      { label: "4 Years", value: "4 Years" },
      { label: "5 Years", value: "5 Years" },
      { label: "6 Years", value: "6 Years" },
      { label: "7 Years", value: "7 Years" },
      { label: "8 Years", value: "8 Years" },
      { label: "9 Years", value: "9 Years" },
      { label: "10 Years", value: "10 Years" },
    ];
  } else if (list === "monthsExperience") {
    options = [
      { label: "1 Month", value: "1 Month" },
      { label: "2 Months", value: "2 Months" },
      { label: "3 Months", value: "3 Months" },
      { label: "4 Months", value: "4 Months" },
      { label: "5 Months", value: "5 Months" },
      { label: "6 Months", value: "6 Months" },
      { label: "7 Months", value: "7 Months" },
      { label: "8 Months", value: "8 Months" },
      { label: "9 Months", value: "9 Months" },
      { label: "10 Months", value: "10 Months" },
      { label: "11 Months", value: "11 Months" },
      { label: "12 Months", value: "12 Months" },
    
    ];
  } else if (list === "jobLocation") {
    options = [
      { label: "Delhi", value: "Delhi" },
      { value: "Puna", label: "Puna" },
      { value: "Surat", label: "Surat" },
    ];
  } else if (list === "educationQualification") {
    options = [
      { label: "Graduate", value: "Graduate" },
      { value: "Post Graduate", label: "Post Graduate" },
      { value: "Diploma", label: "Diploma" },
    ];
  } else if (list === "jobCategorization") {
    options = [
      { label: "Information Technology", value: "Information Technology" },
      { value: "Product management", label: "Product management" },
      { value: "HR", label: "HR" },
    ];
  } else if (list === "rating") {
    options = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ];
  } else if (list === "Date") {
    options = [
      { value: "3/1/2023", label: "3/1/2023" },
      { value: "2/1/2023", label: "2/1/2023" },
      { value: "3/1/2023", label: "3/1/2023" },
    ];
  } else if (list === "degree") {
    options = [
      { label: "Computer Science", value: "Computer Science" },
      { value: "B.Sc", label: "B.Sc" },
      { value: "MBA", label: "MBA" },
    ];
  } else if (list === "NP") {
    options = [
      { label: "1 Week", value: "1 Week" },
      { label: "2 Weeks", value: "2 Weeks" },
      { label: "3 Weeks", value: "3 Weeks" },
      { label: "4 Weeks", value: "4 Weeks" },
    ];
  }else if (list === "functionalArea") {
    options = [
      { label: "Software Development", value: "Software Development" },
      { label: "AI", value: "AI" },
      { label: "Machine Learning", value: "Machine Learning" },
      { label: "Game Developer", value: "Game Developer" },
    ];
  }

  return options;
}
export default {
  optionList,
};
