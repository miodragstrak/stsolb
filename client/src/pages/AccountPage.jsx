import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const { address } = useParams();
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/account-info", {
          address: address,
        });
        setAccountInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch account info", err);
      }
    };

    fetchAccountInfo();
  }, [address]);

  return (
    <div>
      <h2>Account Info for {address}</h2>
      {accountInfo ? (
        <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AccountPage;
