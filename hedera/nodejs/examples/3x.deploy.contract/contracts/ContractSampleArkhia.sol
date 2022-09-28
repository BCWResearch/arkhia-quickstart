// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

 contract ContractSampleArkhia  {

    receive() external payable {}

    fallback() external payable {}

    event ArkhiaClientEvent(
        address indexed from,
        uint256 timestamp,
        string name,
        string description
    );
    
    struct ArkhiaClient {
        address from;
        uint256 timestamp;
        string name;
        string description;
    }

    struct ArkhiaMetadata {
        string creatorName;
        string description;
    }
    
    address payable owner;

    ArkhiaClient[] arkhiaClients;
    ArkhiaMetadata arkhiaMetadata;

    constructor(string memory _creatorName, string memory _description) {
        owner = payable(msg.sender);
        arkhiaMetadata.creatorName = _creatorName;
        arkhiaMetadata.description = _description;
    }

    function getArkhiaClients() public view returns (ArkhiaClient[] memory) {
        return arkhiaClients;
    }

    function getArkhiaMetadata() public view returns (ArkhiaMetadata memory) {
        return arkhiaMetadata;
    }

    function addArkhiaClient(string memory _name, string memory _description) external returns (ArkhiaClient memory)  {

        require(bytes(_name).length > 0 && bytes(_description).length > 0, "Please insert a name and description");

        arkhiaClients.push(ArkhiaClient(
            msg.sender,
            block.timestamp,
            _name,
            _description
        ));

        emit ArkhiaClientEvent(
            msg.sender,
            block.timestamp,
            _name,
            _description
        );

        return arkhiaClients[arkhiaClients.length-1];
    }
}
