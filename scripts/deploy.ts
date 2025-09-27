import { ethers } from "hardhat";

async function main() {
  console.log("Deploying StudentSponsorship contract...");

  // Dirección de USDC en Polygon Mumbai (testnet)
  // Para localhost, necesitarás desplegar un token USDC mock
  const USDC_ADDRESS = "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e"; // USDC en Polygon Mumbai
  
  // Obtener el contrato
  const StudentSponsorship = await ethers.getContractFactory("StudentSponsorship");
  
  // Desplegar el contrato con la dirección de USDC
  const studentSponsorship = await StudentSponsorship.deploy(USDC_ADDRESS);
  
  // Esperar a que se confirme el despliegue
  await studentSponsorship.waitForDeployment();
  
  const contractAddress = await studentSponsorship.getAddress();
  
  console.log("StudentSponsorship deployed to:", contractAddress);
  console.log("USDC Token Address:", USDC_ADDRESS);
  
  // Agregar algunos estudiantes reales (con privacidad)
  console.log("Adding students from India...");
  
  // Estudiantes con IDs únicos y solo región (no ubicación específica)
  await studentSponsorship.addStudent(
    "IND-STU-001", 
    ethers.parseUnits("500", 6), // 500 USDC (6 decimales)
    "Northern India"
  );
  
  await studentSponsorship.addStudent(
    "IND-STU-002", 
    ethers.parseUnits("400", 6), // 400 USDC
    "Southern India"
  );
  
  await studentSponsorship.addStudent(
    "IND-STU-003", 
    ethers.parseUnits("600", 6), // 600 USDC
    "Eastern India"
  );
  
  console.log("Students added successfully!");
  
  // Mostrar información del contrato
  console.log("\nContract Information:");
  console.log("- Address:", contractAddress);
  console.log("- USDC Token:", USDC_ADDRESS);
  console.log("- Total Students:", await studentSponsorship.totalStudents());
  console.log("- Contract USDC Balance:", ethers.formatUnits(await studentSponsorship.getContractBalance(), 6), "USDC");
  
  // Guardar la información del contrato para uso en la app
  const contractInfo = {
    address: contractAddress,
    usdcAddress: USDC_ADDRESS,
    network: "localhost",
    deployedAt: new Date().toISOString(),
    students: [
      { id: "IND-STU-001", region: "Northern India", goal: "500 USDC" },
      { id: "IND-STU-002", region: "Southern India", goal: "400 USDC" },
      { id: "IND-STU-003", region: "Eastern India", goal: "600 USDC" }
    ]
  };
  
  console.log("\nContract info to use in your app:");
  console.log(JSON.stringify(contractInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
