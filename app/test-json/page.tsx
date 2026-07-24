// app/test-json/page.tsx
import productsData from '@/data/products.json'

export default function TestJsonPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">JSON Data Test</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
        {JSON.stringify(productsData, null, 2)}
      </pre>
    </div>
  );
}