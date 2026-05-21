import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle2, RefreshCw } from 'lucide-react';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (!scanResult) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      scannerRef.current.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((e: any) => console.error("Failed to clear scanner", e));
      }
    };
  }, [scanResult]);

  function onScanSuccess(decodedText: string) {
    setScanResult(decodedText);
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  }

  function onScanFailure() {
    // console.warn(`Code scan error = ${error}`);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <QrCode size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black">Register Bottle</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Scan QR or NFC Tag</p>
           </div>
        </div>

        {!scanResult ? (
          <div id="reader" className="overflow-hidden rounded-3xl border-4 border-slate-50" />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
             <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-green-600" size={32} />
             </div>
             <h4 className="text-lg font-black mb-1">Registration Successful</h4>
             <p className="text-sm text-slate-400 font-medium mb-8">Bottle ID: {scanResult}</p>
             <button
               onClick={() => setScanResult(null)}
               className="flex items-center gap-2 mx-auto text-blue-600 font-bold text-sm hover:underline"
             >
               <RefreshCw size={16} />
               Scan another
             </button>
          </motion.div>
        )}

        <div className="mt-8 p-4 bg-slate-50 rounded-2xl">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
             Place the QR code on your AquaLink bottle within the frame above to automatically link it to your account.
           </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
