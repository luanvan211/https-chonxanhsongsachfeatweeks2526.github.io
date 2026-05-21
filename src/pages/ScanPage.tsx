import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { QrCode, CheckCircle2, AlertCircle } from 'lucide-react';

const ScanPage: React.FC = () => {
  const { user } = useAuth();
  const { registerBottle } = useData();
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText: string) {
      setScanResult(decodedText);
      scanner.clear();

      // Mock bottle registration
      if (user) {
        registerBottle({
          id: Math.random().toString(36).substr(2, 9),
          ownerId: user.id,
          type: 'Standard ReBottle',
          color: 'Green',
          size: '500ml',
          registeredAt: new Date().toISOString()
        });
      }
    }

    function onScanFailure() {
      // Quietly handle scan failure
    }

    return () => {
      scanner.clear().catch(e => console.warn("Failed to clear scanner", e));
    };
  }, [user, registerBottle]);

  const handleSimulateScan = () => {
    if (user) {
        registerBottle({
          id: Math.random().toString(36).substr(2, 9),
          ownerId: user.id,
          type: 'Standard ReBottle',
          color: 'Green',
          size: '500ml',
          registeredAt: new Date().toISOString()
        });
        setScanResult('SIMULATED-QR-CODE-123');
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Your Bottle</h2>
        <p className="text-gray-500 mb-8">Scan the QR code on your ReBottle to add it to your account.</p>

        {!scanResult ? (
          <div className="space-y-6">
            <div id="reader" className="overflow-hidden rounded-2xl border-4 border-gray-100"></div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <QrCode className="w-4 h-4" />
              <span>Align QR code within the frame</span>
            </div>

            <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest font-bold">Or use NFC</p>
                <button
                  onClick={() => alert("Searching for NFC tags... (requires Chrome on Android)")}
                  className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-bold border-2 border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  Hold Phone Near Bottle
                </button>
            </div>

            <button
                onClick={handleSimulateScan}
                className="text-xs text-gray-400 underline"
            >
                Simulate Scan (for testing)
            </button>
          </div>
        ) : (
          <div className="py-12 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600 mb-8">Your bottle has been registered successfully. You've earned 10 tokens!</p>
            <button
              onClick={() => setScanResult(null)}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
            >
              Scan Another
            </button>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start text-left max-w-sm">
        <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          Make sure your camera lens is clean and you're in a well-lit area for the best scanning experience.
        </p>
      </div>
    </div>
  );
};

export default ScanPage;
