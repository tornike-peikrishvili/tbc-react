"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

function QRCodeComponent({ order }: { order: any; orderId: any }) {
  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => setShowQR(!showQR);

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qr-code-${order.id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={toggleQR}
        className="mb-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showQR ? "Hide QR Code" : "View QR Code"}
      </motion.button>

      {showQR && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <QRCodeSVG id="qr-code" value={order.id} size={260} />
          <button
            onClick={downloadQRCode}
            className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
          >
            Download QR Code
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default QRCodeComponent;
