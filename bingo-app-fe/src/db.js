const buzzwords = [
  "DevOps",
  "Development",
  "Terraform",
  "Front-end",
  "Back-end",
  "Websockets",
  "Cloud",
  "AWS",
  "Pipeline",
  "Jenkins",
  "Waterfall",
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
  "Security",
  "Deploy",
  "Environment",
  "Infrastructure",
  "Node",
  "Provision",
  "Snapshot",
  "Unit test",
  "Cypress",
  "React",
  "JavaScript",
  "Terratest",
  "Production",
  "Career",
  "Express",
  "Team",
  "Variable",
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
