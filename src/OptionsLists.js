function optionList(list) {
  let options = [];
  if (list === "previousRequirements") {
    options = [
      { label: "react", value: "React" },
      { value: "java", label: "java" },
      { value: ".Net", label: ".Net" },
    ];
  } else if (list === "employmentType") {
    options = [
      { label: "full time", value: "full time" },
      { value: "22", label: "2" },
      { value: "2", label: "2" },
    ];
  } else if (list === "annualCTC") {
    options = [
      { label: "2 lakh", value: "2" },
      { value: "5", label: "5 lakh" },
      { value: "2", label: "2" },
    ];
  } else if (list === "thousands") {
    options = [
      { label: "2 thousand", value: "2" },
      { value: "5", label: "5 thousand" },
      { value: "4", label: "4 thousand" },
    ];
  } else if (list === "minimumSalary") {
    options = [
      { label: "2 lakh", value: "2" },
      { value: "5", label: "5 lakh" },
      { value: "2", label: "2" },
    ];
  } else if (list === "minimumWorkExperience") {
    options = [
      { label: "2 year", value: "2" },
      { value: "5", label: "5 year" },
      { value: "6", label: "6 year" },
    ];
  } else if (list === "monthsExperience") {
    options = [
      { label: "2", value: "2" },
      { value: "5", label: "3" },
      { value: "6", label: "2" },
    ];
  } else if (list === "jobLocation") {
    options = [
      { label: "Delhi", value: "Delhi" },
      { value: "Puna", label: "Puna" },
      { value: "Surat", label: "Surat" },
    ];
  } else if (list === "educationQualification") {
    options = [
      { label: "MCA", value: "MCA" },
      { value: "BCA", label: "BCA" },
      { value: "BSC", label: "BSC" },
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
    ];
  } else if (list === "Date") {
    options = [
      { value: "1/1/2023", label: "1/1/2023" },
      { value: "2/1/2023", label: "2/1/2023" },
      { value: "3/1/2023", label: "3/1/2023" },
    ];
  }

  return options;
}
export default {
  optionList,
};
