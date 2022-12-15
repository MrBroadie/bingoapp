const buzzwords = [
  "DevOps",
  "Synergy",
  "Development",
  "Terraform",
  "Front-end",
  "Back-end",
  "Sockets",
  "Cloud",
  "AWS",
  "Lambda",
  "Pipeline",
  "Jenkins",
  "EC2",
  "Docker",
  "ECS",
  "ECR",
  "Hosted",
  "Branch",
  "Prisma",
  "Postgres",
  "Scrum",
  "Table",
  "Agile",
  "API",
  "Build",
  "CI/CD",
  "Deployment",
  "Environment",
  "BitBucket",
  "GitHub",
  "Infrastructure",
  "Node",
  "Nginx",
  "Provision",
  "Source control",
  "Snapshot",
  "Unit test",
  "Cypress",
  "React",
  "JavaScript",
  "SonarQube",
  "Production",
  "Database",
  "Express",
  "Team",
  "CSS",
];

export const generateBingoSheet = () => {
  const buzzwordsClone = buzzwords.map((arr) => arr);

  const bingoSheet = [];

  const getArrayIndex = () => Math.floor(Math.random() * buzzwordsClone.length);

  for (let i = 0; i < 9; i++) {
    const num = getArrayIndex();

    bingoSheet.push(buzzwordsClone[num]);
    buzzwordsClone.splice([num], 1);
  }

  return bingoSheet;
};
