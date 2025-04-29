import React from "react";

const AccountInfoCard = ({ accountData }) => {
  if (!accountData) {
    return <div>🔄 Učitavanje podataka o nalogu...</div>;
  }

  if (accountData === "error") {
    return <div className="text-red-500">⚠️ Greška pri učitavanju naloga.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">📄 Detalji o nalogu</h2>

      <div className="space-y-2">
        <p><strong>💰 SOL balans:</strong> {accountData.sol.toFixed(6)} SOL</p>
        <p><strong>🪙 Lamports:</strong> {accountData.lamports}</p>
        <p><strong>👤 Vlasnik:</strong> {accountData.owner}</p>
        <p><strong>🧠 Executable:</strong> {accountData.executable ? "Da" : "Ne"}</p>
        <p><strong>📅 Rent Epoch:</strong> {accountData.rentEpoch}</p>
      </div>

      {accountData.program && (
        <>
          <hr className="my-4" />
          <h3 className="text-xl font-semibold">🔧 Program i tip</h3>
          <p><strong>Program:</strong> {accountData.program}</p>
          <p><strong>Tip:</strong> {accountData.type}</p>

          <hr className="my-4" />
          <h3 className="text-xl font-semibold">📦 Detalji (parsed)</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(accountData.details, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default AccountInfoCard;
