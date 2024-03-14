const CandidateTestData = [
  {
    usn: "4SO21CS001",
    name: "Student 1",
    branch: "CSE",
    CGPA: "10",
    skills: ["React", "Astro"],
  },
  {
    usn: "4SO22CD002",
    name: "Student 2",
    branch: "CSDS",
    CGPA: "5",
    skills: ["Baking", "Cooking"],
  },

  {
    usn: "4SO22EC003",
    name: "Student 3",
    branch: "ECE",
    CGPA: "7.5",
    skills: ["Dancing", "Eating"],
  },
  {
    usn: "4SO22EE004",
    name: "Student 4",
    branch: "EEE",
    CGPA: "8.2",
    skills: ["Astro", "Gaming"],
  },
  {
    usn: "4SO20ME005",
    name: "Student 5",
    branch: "MECH",
    CGPA: "9.1",
    skills: ["Hiking", "Jogging"],
  },
  {
    usn: "4SO23CV006",
    name: "Student 6",
    branch: "CIVIL",
    CGPA: "7.8",
    skills: ["Kiting", "Lifting"],
  },
  {
    usn: "4SO22CB007",
    name: "Student 7",
    branch: "CSBS",
    CGPA: "8.9",
    skills: ["Meditating"],
  },
  {
    usn: "4SO22EC008",
    name: "Student 8",
    branch: "ECE",
    CGPA: "8.2",
    skills: ["Reading", "Writing"],
  },
  {
    usn: "4SO21EE009",
    name: "Student 9",
    branch: "EEE",
    CGPA: "8.5",
    skills: ["Swimming", "Cycling"],
  },
  {
    usn: "4SO23ME010",
    name: "Student 10",
    branch: "MECH",
    CGPA: "8.7",
    skills: ["Running", "Jumping"],
  },
  {
    usn: "4SO22CV011",
    name: "Student 11",
    branch: "CIVIL",
    CGPA: "8.3",
    skills: ["Singing", "Dancing"],
  },
  {
    usn: "4SO20CB012",
    name: "Student 12",
    branch: "CSBS",
    CGPA: "9.0",
    skills: ["Coding", "Debugging"],
  },
  {
    usn: "4SO22EC013",
    name: "Student 13",
    branch: "ECE",
    CGPA: "8.6",
    skills: ["Painting", "Sketching"],
  },
  {
    usn: "4SO20EE014",
    name: "Student 14",
    branch: "EEE",
    CGPA: "8.4",
    skills: ["Cooking", "Baking"],
  },
  {
    usn: "4SO21ME015",
    name: "Student 15",
    branch: "MECH",
    CGPA: "8.8",
    skills: ["Gardening", "Fishing"],
  },
  {
    usn: "4SO22CV016",
    name: "Student 16",
    branch: "CIVIL",
    CGPA: "8.1",
    skills: ["Photography", "Videography"],
  },
  {
    usn: "4SO21CB017",
    name: "Student 17",
    branch: "CSBS",
    CGPA: "9.2",
    skills: ["Gaming", "Streaming"],
  },
  {
    usn: "4SO20EC018",
    name: "Student 18",
    branch: "ECE",
    CGPA: "8.9",
    skills: ["Hiking", "Camping"],
  },
  {
    usn: "4SO23EE019",
    name: "Student 19",
    branch: "EEE",
    CGPA: "8.0",
    skills: ["Knitting", "Sewing"],
  },
  {
    usn: "4SO21ME020",
    name: "Student 20",
    branch: "MECH",
    CGPA: "8.5",
    skills: ["Driving", "Riding"],
  },
  {
    usn: "4SO22CV021",
    name: "Student 21",
    branch: "CIVIL",
    CGPA: "8.7",
    skills: ["Climbing", "Trekking"],
  },
  {
    usn: "4SO22CB022",
    name: "Student 22",
    branch: "CSBS",
    CGPA: "9.1",
    skills: ["Yoga", "Meditation"],
  },
  // Existing data truncated for brevity
];

// Function to expand the CandidateTestData array
function expandData(data, rows) {
  const expandedData = [];
  const dataLength = data.length;

  for (let i = 0; i < rows; i++) {
    const originalIndex = i % dataLength;
    const originalData = data[originalIndex];
    const newData = { ...originalData }; // Copy original data

    // Modify unique properties
    newData.usn = newData.usn.slice(0, 6) + String(i + 1).padStart(3, "0");

    expandedData.push(newData);
  }

  return expandedData;
}

const expandedCandidateData = expandData(CandidateTestData, 1800);

export default expandedCandidateData;
