// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    address public owner;

    mapping(address => Student) private students;

    event StudentAdded(address indexed user, string name, uint age);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerStudent(address user, string memory name, uint age) public onlyOwner {
        require(!students[user].isRegistered, "Already registered");
        students[user] = Student(name, age, true);
        emit StudentAdded(user, name, age);
    }

    function getStudent(address user) public view returns (Student memory) {
        Student storage student = students[user];
        require(student.isRegistered, "Not registered");
        return student;
    }

    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
}