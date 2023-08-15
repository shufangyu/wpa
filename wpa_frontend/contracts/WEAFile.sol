// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WEAFile {
    IERC20 weaToken;

    constructor(address _tokenAddress) {
        weaToken = IERC20(_tokenAddress);
    }
    
    event ReEncryptionRequest(address indexed previousEmployer, address indexed futureEmployer, string cid, string reEncryptionKey);
    
    struct CreateReEncryptionKeyRequest {
        address futureEmployer;
        string cid;
        bool isDone;
    }

    struct ReEncrypteWorkPerformanceReviews {
        address previousEmployer;
        string cid;
    }

    mapping(address => string) public publicKeys;
    mapping(string => address) public cidOfEncryptedWorkPerformanceReviewToPreviousEmployer;

    mapping(address => ReEncrypteWorkPerformanceReviews[]) public futureEmployerToReEncrypteWorkPerformanceReviews;
    mapping(address => uint256) public reEncrypteWorkPerformanceReviewsCount;

    mapping(address => CreateReEncryptionKeyRequest[]) public createReEncryptionKeyRequests;
    mapping(address => uint256) public createReEncryptionKeyRequestCount;

    function registerPublicKey(string memory publicKey) public {
        publicKeys[msg.sender] = publicKey;
    }

    function addWorkPerformanceReview(string memory cid) public {
        cidOfEncryptedWorkPerformanceReviewToPreviousEmployer[cid] = msg.sender;

        weaToken.transfer(msg.sender, 1);
    }

    function addCreateReEncryptionKeyRequest(string memory cid) public {
        weaToken.transferFrom(msg.sender, address(this), 2);
        address previousEmployerAddress = cidOfEncryptedWorkPerformanceReviewToPreviousEmployer[cid];
        createReEncryptionKeyRequests[previousEmployerAddress].push(CreateReEncryptionKeyRequest(msg.sender, cid, false));
        createReEncryptionKeyRequestCount[previousEmployerAddress]++;
    }

    function addReEncryptionRequest(uint requestIndex, string memory reEncryptionKey) public {
        weaToken.transfer(msg.sender, 1);

        address futureEmployer = createReEncryptionKeyRequests[msg.sender][requestIndex].futureEmployer;
        string memory cid = createReEncryptionKeyRequests[msg.sender][requestIndex].cid;

        createReEncryptionKeyRequests[msg.sender][requestIndex].isDone = true;

        emit ReEncryptionRequest(msg.sender, futureEmployer, cid, reEncryptionKey);
    }

    function addReEncryptedWorkPerformanceReview(address futureEmployer, string memory cid) public {
        futureEmployerToReEncrypteWorkPerformanceReviews[futureEmployer].push(ReEncrypteWorkPerformanceReviews(msg.sender, cid));
        reEncrypteWorkPerformanceReviewsCount[futureEmployer]++;
    }
}