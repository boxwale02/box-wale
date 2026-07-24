// app/test/page.tsx
import productsData from '@/data/products.json'

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <h2 className="text-xl mb-2">Products in JSON:</h2>
      <ul className="list-disc pl-4">
        {productsData.products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> - slug: <code className="bg-gray-100 px-2 py-1 rounded">{p.slug}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}