// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Interface para USDC (ERC-20)
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract StudentSponsorship {
    // Estructura para almacenar información de estudiantes (con privacidad)
    struct Student {
        string studentId;        // ID único en lugar de nombre real
        uint256 goal;           // Meta en USDC (6 decimales)
        uint256 raised;         // Recaudado en USDC
        string region;          // Solo región, no ubicación específica
        bool isActive;
    }
    
    // Estructura para almacenar información de donaciones
    struct Donation {
        address donor;
        string studentId;
        uint256 amount;         // En USDC
        uint256 timestamp;
    }
    
    // Variables de estado
    address public owner;
    IERC20 public usdcToken;
    uint256 public totalDonations;
    uint256 public totalStudents;
    
    // Mappings
    mapping(string => Student) public students;
    mapping(uint256 => Donation) public donations;
    mapping(address => uint256[]) public donorDonations;
    
    // Eventos
    event StudentAdded(string indexed studentId, uint256 goal, string region);
    event DonationMade(
        address indexed donor,
        string indexed studentId,
        uint256 amount,
        uint256 timestamp
    );
    event FundsWithdrawn(string indexed studentId, uint256 amount);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier studentExists(string memory _studentId) {
        require(students[_studentId].isActive, "Student does not exist");
        _;
    }
    
    constructor(address _usdcToken) {
        owner = msg.sender;
        usdcToken = IERC20(_usdcToken);
    }
    
    // Función para agregar un estudiante (solo owner)
    function addStudent(
        string memory _studentId,
        uint256 _goal,
        string memory _region
    ) external onlyOwner {
        require(!students[_studentId].isActive, "Student already exists");
        require(_goal > 0, "Goal must be greater than 0");
        
        students[_studentId] = Student({
            studentId: _studentId,
            goal: _goal,
            raised: 0,
            region: _region,
            isActive: true
        });
        
        totalStudents++;
        emit StudentAdded(_studentId, _goal, _region);
    }
    
    // Función para hacer una donación en USDC
    function donate(string memory _studentId, uint256 _amount) 
        external 
        studentExists(_studentId)
    {
        require(_amount > 0, "Donation amount must be greater than 0");
        
        // Transferir USDC del donante al contrato
        require(
            usdcToken.transferFrom(msg.sender, address(this), _amount),
            "USDC transfer failed"
        );
        
        // Actualizar el monto recaudado del estudiante
        students[_studentId].raised += _amount;
        
        // Crear registro de donación
        donations[totalDonations] = Donation({
            donor: msg.sender,
            studentId: _studentId,
            amount: _amount,
            timestamp: block.timestamp
        });
        
        // Registrar donación del donante
        donorDonations[msg.sender].push(totalDonations);
        
        totalDonations++;
        
        emit DonationMade(msg.sender, _studentId, _amount, block.timestamp);
    }
    
    // Función para retirar fondos USDC (solo owner, para enviar a estudiantes)
    function withdrawFunds(string memory _studentId, uint256 _amount) 
        external 
        onlyOwner 
        studentExists(_studentId)
    {
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= students[_studentId].raised, "Insufficient funds");
        require(usdcToken.balanceOf(address(this)) >= _amount, "Contract has insufficient USDC");
        
        // Reducir el monto recaudado
        students[_studentId].raised -= _amount;
        
        // Enviar USDC al owner (quien luego lo enviará al estudiante)
        require(usdcToken.transfer(owner, _amount), "USDC transfer to owner failed");
        
        emit FundsWithdrawn(_studentId, _amount);
    }
    
    // Función para obtener información de un estudiante
    function getStudent(string memory _studentId) 
        external 
        view 
        returns (string memory studentId, uint256 goal, uint256 raised, string memory region, bool isActive)
    {
        Student memory student = students[_studentId];
        return (student.studentId, student.goal, student.raised, student.region, student.isActive);
    }
    
    // Función para obtener el balance USDC del contrato
    function getContractBalance() external view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }
    
    // Función para obtener el progreso de un estudiante (porcentaje)
    function getStudentProgress(string memory _studentId) 
        external 
        view 
        studentExists(_studentId)
        returns (uint256)
    {
        Student memory student = students[_studentId];
        if (student.goal == 0) return 0;
        return (student.raised * 100) / student.goal;
    }
    
    // Función para obtener donaciones de un donante
    function getDonorDonations(address _donor) 
        external 
        view 
        returns (uint256[] memory)
    {
        return donorDonations[_donor];
    }
    
    // Función para obtener información de una donación específica
    function getDonation(uint256 _donationId) 
        external 
        view 
        returns (address donor, string memory studentId, uint256 amount, uint256 timestamp)
    {
        require(_donationId < totalDonations, "Donation does not exist");
        Donation memory donation = donations[_donationId];
        return (donation.donor, donation.studentId, donation.amount, donation.timestamp);
    }
    
    // Función para aprobar USDC antes de donar
    function approveUSDC(uint256 _amount) external {
        require(usdcToken.approve(address(this), _amount), "USDC approval failed");
    }
}
