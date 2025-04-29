import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountInfoCard from "../components/AccountInfoCard";

const interpretAccountInfo = (data) => {
  if (!data || !data.result || !data.result.value) {
    return "error";
  }

  const acc = data.result.value;
  const summary = {
    lamports: acc.lamports,
    sol: acc.lamports / 1e9,
    owner: acc.owner,
    executable: acc.executable,
    rentEpoch: acc.rentEpoch,
  };

  if (acc.data?.parsed) {
    summary.program = acc.data.program;
    summary.type = acc.data.parsed.type;
    summary.details = acc.data.parsed.info;
  }

  return summary;
};

const AccountPage = () => {
  const { address } = useParams(); // ← bitno
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/account-info", {
          address,
        });
        const interpreted = interpretAccountInfo(response.data);
        setAccountData(interpreted);
      } catch (error) {
        console.error("Failed to fetch account info", error);
        setAccountData("error");
      }
    };

    if (address) {
      fetchAccountInfo();
    }
  }, [address]);

  return (
    <div className="p-8">
      <AccountInfoCard accountData={accountData} />
    </div>
  );
};

export default AccountPage;
