import { useState } from 'react';
import { transactionAPI } from '@/lib/api';

export default function TestConnection() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await transactionAPI.getAllTransactions();
      setResult({
        success: true,
        data: response.data,
        message: 'Connection successful!'
      });
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message,
        message: 'Connection failed!'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Backend Connection</h1>
      
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold text-green-600">
            {result.message}
          </h3>
          <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
