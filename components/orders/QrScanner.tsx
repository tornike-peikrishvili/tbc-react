"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrReader } from "react-qr-reader";

function QRScanner({ orderId }: any) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [access, setAccess] = useState<string | null>(null);

  const toggleScanner = () => setScanning(!scanning);

  const handleScan = (result: any) => {
    if (result) {
      const scannedValue = result?.text;
      setScanResult(scannedValue);
      setScanning(false);

      if (orderId === scannedValue) {
        setAccess("Access Granted");
      } else {
        setAccess("Access Denied");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={toggleScanner}
        className="mb-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {scanning ? "Stop Scanning" : "Scan QR Code"}
      </motion.button>

      {scanning && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <QrReader
            onResult={handleScan}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      )}

      {scanResult && (
        <motion.div
          className="mt-4 w-full max-w-md rounded bg-gray-100 p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="mb-2 text-lg font-semibold">Scan Result:</h3>
          <p className="mb-2">{scanResult}</p>
          {access && (
            <p
              className={`font-bold ${access === "Access Granted" ? "text-green-600" : "text-red-600"}`}
            >
              {access}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default QRScanner;
