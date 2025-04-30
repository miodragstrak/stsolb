import React from "react";

const AccountInfoCard = ({ accountData }) => {
  return (
    <div>
      <h3 c>Account information</h3>
      <p><strong>Owner:</strong> {accountData.owner}</p>
      <p><strong>Lamports:</strong> {accountData.lamports}</p>
      <p><strong>SOL:</strong> {accountData.sol}</p>

      {accountData.program && (
        <>
          <hr />
          <p></p>
          <h3>Program and Type</h3>
          <p><strong>Program:</strong> {accountData.program}</p>
          <p><strong>Type:</strong> {accountData.type}</p>

          <hr />
          <p></p>
          <h3>Details (parsed)</h3>
          <pre>
            {JSON.stringify(accountData.details, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default AccountInfoCard;
