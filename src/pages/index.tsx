import { useState, useEffect } from "react";

export default function Home() {
  const [dataNetwork, setDataNetwork] = useState({
    supply: {
      max: "",
      total: "",
      circulating: "",
      locked: "",
      treasury: "",
      reserves: "",
    },
    stake: {
      live: "",
      active: "",
    },
  });

  const [dataBlock, setDataBlock] = useState({
    time: "",
    height: "",
    hash: "",
    slot: "",
    epoch: "",
    epoch_slot: "",
    slot_leader: "",
    size: "",
    tx_count: "",
    output: "",
    fees: "",
    block_vrf: "",
    op_cert: "",
    op_cert_counter: "",
    previous_block: "",
    next_block: "",
    confirmations: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataNetwork = async () => {
      try {
        const response = await fetch("/api/network");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("NETWORK", data);
        setDataNetwork(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchDataBlock = async () => {
      try {
        const response = await fetch("/api/block");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("BLOCK", data);
        setDataBlock(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchDataNetwork();
    fetchDataBlock();
  }, []);

  return (
    <div>
      <h1 className="mb-4">Kepoin Cardano</h1>
      {error && <p>Error: {error}</p>}
      {!dataNetwork && <p>Loading...</p>}
      {dataNetwork && (
        <div className="mb-4">
          <p>Reserve: {dataNetwork.supply.reserves} Lovelace</p>
          <p>Treasury: {dataNetwork.supply.treasury} Lovelace</p>
        </div>
      )}
      {dataBlock && (
        <div className="mb-4">
          <p>Block: {dataBlock.height}</p>
          <p>Previous Block: {dataBlock.previous_block}</p>
          <p>Hash Block: {dataBlock.previous_block}</p>
        </div>
      )}
    </div>
  );
}
