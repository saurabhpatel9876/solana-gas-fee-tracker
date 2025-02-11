"use client"
// import { Connection, clusterApiUrl } from '@solana/web3.js';
import {
    Connection,
    clusterApiUrl,
    Transaction,
    SystemProgram,
    Keypair,
  } from '@solana/web3.js';
  import Image from 'next/image'
  import Logo from "../public/logo.jpg"
import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// Backend: Fetch Fees
const fetchFees = async () => {
//   const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/QWDrB2hMGREbNd46_D2j9YliRY2goYd5', 'confirmed');
// try {
//     // Fetch the latest blockhash
//     const { blockhash } = await connection.getLatestBlockhash('finalized');

//     // Create a dummy transaction to estimate fees
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: Keypair.generate().publicKey, // Dummy sender
//         toPubkey: Keypair.generate().publicKey,   // Dummy receiver
//         lamports: 1, // Small amount for estimation
//       })
//     );
//     transaction.recentBlockhash = blockhash;

//     // Estimate the fee for this transaction
//     const fee = await connection.getFeeForMessage(transaction.compileMessage());

//     console.log('Transaction fee (lamports):', fee.value);
//     return fee.value;
//   } catch (error) {
//     console.error('Error fetching fees:', error);
//     return null;
//   }




try {
    // Fetch the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash('finalized');

    // Create a mock transaction to estimate fees
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: Keypair.generate().publicKey, // Dummy sender
        toPubkey: Keypair.generate().publicKey,   // Dummy receiver
        lamports: 1, // Minimal amount for estimation
      })
    );

    // Assign a dummy fee payer
    transaction.feePayer = Keypair.generate().publicKey;

    // Set the recent blockhash
    transaction.recentBlockhash = blockhash;

    // Estimate the fee for this transaction
    const fee = await connection.getFeeForMessage(transaction.compileMessage());

    console.log('Transaction fee (lamports):', fee.value);
    return fee.value;
  } catch (error) {
    console.error('Error fetching fees:', error);
    return null;
  }
};

// Helper: Convert Lamports to SOL
const lamportsToSol = (lamports) => lamports / 1_000_000_000;

// Frontend: React Component
const SolanaFeeTracker = () => {
  const [feeData, setFeeData] = useState([]);

  useEffect(() => {
    const fetchAndSetFees = async () => {
      const lamportsPerSignature = await fetchFees();
      if (lamportsPerSignature) {
        const feeInSol = lamportsToSol(lamportsPerSignature);
        setFeeData((prevData) => [
          ...prevData,
          { time: new Date().toLocaleTimeString(), fee: feeInSol },
        ]);
      }
    };

    fetchAndSetFees();

    const interval = setInterval(fetchAndSetFees, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black ">
      <div className='flex m-5'>
      {/* <Image alt='logo' src={Logo} width={150} height={100} className=' rounded-full' /> */}
     
      </div>
      <div className="text-8xl mb-8 font-extrabold m-10  ">⚡Solana Gas Fee Tracker⚡</div>
<h1 className='m-5 font-extrabold'>


It connects to the Solana blockchain and fetches the latest network fees required to process a transaction.
<br/>
<br/>


It calculates and displays the transaction fee in lamports (the smallest unit of SOL) and converts it to SOL for better understanding.
</h1>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <LineChart width={800} height={400} data={feeData}>
          <Line type="monotone" dataKey="fee" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
        <p className="text-center mt-4 text-gray-600">
          Latest Fee: {feeData.length > 0 ? feeData[feeData.length - 1].fee.toFixed(9) : 'Loading...'} SOL per signature
        </p>
      </div>
    </div>
  );





 
};

export default SolanaFeeTracker;
