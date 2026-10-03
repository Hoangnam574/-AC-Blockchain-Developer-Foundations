// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) private students;

    function register(string memory name, uint age) public {
        require(!students[msg.sender].isRegistered, "Already registered");
        students[msg.sender] = Student(name, age, true);
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