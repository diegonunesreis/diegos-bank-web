import React from "react";

const Transactions = ({ transactions }) => {

  const transformedType = (transType) => {
    switch (transType) {
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdraw";
      case "sent":
        return "Payment Sent";
      case "received":
        return "Payment Received";
      default:
        return "";
    }
  }

  return (
    <div className="transactions">
      <h2 className="title">Last Transactions</h2>
      <ul className="list">
        {
          transactions.map((transaction) => (
            <li className="item" key={transaction._id}>
              <div className="info">
                <div className="transactionType">{ transformedType(transaction.transactionType) }</div>
                <div className="transactionOrigin">{ transaction.relatedAccount?.name }</div>
                <div className="transactionAmount">{ transaction.transactionAmount }</div>
              </div>
              <div className="transactionDate">21 Jan</div>
            </li>
          ))
        }


      </ul>
    </div >
  );
}

export default Transactions;