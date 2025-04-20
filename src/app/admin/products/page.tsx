'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    imageUrl: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const addProduct = async () => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      fetchProducts();
      setNewProduct({ name: '', price: 0, imageUrl: '' });
    } else {
      alert('Failed to add product');
    }
  };

  const deleteProduct = async (id: number) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchProducts();
    } else {
      alert('Failed to delete product');
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin: Manage Products</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          placeholder="Price"
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="text"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          placeholder="Image URL"
          className="w-full border rounded p-2 mb-2"
        />
        <button
          onClick={addProduct}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products yet.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white rounded-xl shadow-md border"
            >
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <p>
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover" />
              </p>
              <button
                onClick={() => deleteProduct(product.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
