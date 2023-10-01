// ActionTracker.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ActionTracker {
    struct Task {
        string description;
        bool isCompleted;
        address assignedTo;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    event TaskAdded(uint taskId, string description, address assignedTo);
    event TaskCompleted(uint taskId);

    function addTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task({
            description: _description,
            isCompleted: false,
            assignedTo: address(0)
        });
        emit TaskAdded(taskCount, _description, address(0));
    }

    function markTaskComplete(uint _taskId) public {
        require(_taskId <= taskCount, "Invalid Task ID");
        tasks[_taskId].isCompleted = true;
        emit TaskCompleted(_taskId);
    }

    function assignTask(uint _taskId, address _assignee) public {
        require(_taskId <= taskCount, "Invalid Task ID");
        tasks[_taskId].assignedTo = _assignee;
        emit TaskAdded(_taskId, tasks[_taskId].description, _assignee);
    }
}
