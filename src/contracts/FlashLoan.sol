pragma solidity ^0.7.0;

contract FlashLoan {
    // The address of the lender
    address public lender;

    // The amount of the loan
    uint256 public loanAmount;

    // The maximum duration of the loan, in blocks
    uint256 public loanDuration;

    // The borrower's collateral, in case they are unable to repay the loan
    uint256 public collateral;

    // The borrower's address
    address public borrower;

    // The block number at which the loan was granted
    uint256 public loanBlock;

    // The block number at which the loan is due to be repaid
    uint256 public dueBlock;

    constructor(address _lender, uint256 _loanAmount, uint256 _loanDuration, uint256 _collateral) public {
        lender = _lender;
        loanAmount = _loanAmount;
        loanDuration = _loanDuration;
        collateral = _collateral;
        loanBlock = block.number;
        dueBlock = loanBlock + loanDuration;
    }

    // Borrower calls this function to request the loan
    function requestLoan() public {
        require(borrower == address(0), "Loan has already been requested");
        require(block.number <= dueBlock, "Loan duration has expired");
        borrower = msg.sender;
        lender.transfer(loanAmount);
    }

    // Borrower calls this function to repay the loan
    function repayLoan() public {
        require(borrower == msg.sender, "Only the borrower can repay the loan");
        require(block.number <= dueBlock, "Loan has already expired");
        borrower.transfer(collateral);
        lender.transfer(loanAmount);
        delete this;
    }

    // Lender calls this function if the borrower fails to repay the loan
    function seizeCollateral() public {
        require(borrower != msg.sender, "Borrower cannot seize their own collateral");
        require(block.number > dueBlock, "Loan has not yet expired");
        lender.transfer(collateral);
        delete this;
    }
}