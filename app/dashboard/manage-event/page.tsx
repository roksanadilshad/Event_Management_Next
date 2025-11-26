"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  image?: string;
  time?: string;
  date: string;
  location?: string;
  category?: string;
  priority?: string;
  createdAt: string;
  createdBy: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");
  const [editFullDesc, setEditFullDesc] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const router = useRouter();

  // Protect page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) router.push("/login");
      else setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch products
  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products");
        setLoading(false);
      });
  };

 useEffect(() => {
  const loadProducts = async () => {
    if (!checkingAuth && user) {
      await fetchProducts();
    }
  };

  loadProducts();
}, [checkingAuth, user]);

  if (checkingAuth)
    return <div className="flex justify-center py-40 items-center">
  <HashLoader
  color="#FFC4C4"
  size={100}
/>
    </div>
  if (loading)
    return <div className="flex justify-center py-40 items-center">
  <HashLoader
  color="#FFC4C4"
  size={100}
/>
    </div>

  const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#850E35",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Product deleted!");
        fetchProducts(); // refresh list
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting product");
    }
  }
};

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditTitle(product.title);
    setEditShortDesc(product.shortDescription);
    setEditFullDesc(product.fullDescription);
    setEditPrice(product.price.toString());
    setEditImageUrl(product.image || "");
    setEditTime(product.time || "");
    setEditDate(product.date || "");
    setEditLocation(product.location || "");
    setEditCategory(product.category || "");
    setEditPriority(product.priority || "");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch(`/api/events/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          shortDesc: editShortDesc,
          fullDesc: editFullDesc,
          price: editPrice,
          image: editImageUrl,
          time: editTime,
          location: editLocation,
          category: editCategory,
          priority: editPriority,
          date: editingProduct.date,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Product updated!");
        setEditingProduct(null);
        fetchProducts();
      } else toast.error("Failed to update product");
    } catch (err) {
      console.error(err);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#FCF5EE] text-[#850E35]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center">
        <h1 className="text-3xl  font-bold mb-4 md:mb-0">Dashboard</h1>

        </div>
        <button
          className="py-2 px-6 bg-[#EE6983] text-white font-semibold rounded-lg shadow hover:bg-[#d94f6b] transition"
          onClick={() => router.push("/dashboard/add-product")}
        >
          Add Event
        </button>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <p className="text-center text-[#850E35] font-medium">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#FFC4C4] rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl"
            >
              {product.image && (
  <Image
    src={product.image.startsWith("http")
      ? product.image
      : `/images/${product.image}`} // if stored in public/images
    alt={product.title || "Product Image"}
    width={600}
    height={400}
    className="object-cover rounded-md"
  />
)}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">{product.title}</h2>
                <p className="text-[#850E35] mb-2 line-clamp-2">{product.shortDescription}</p>
                <p className="font-semibold mb-2">${product.price}</p>
                <p className="text-sm text-[#850E35]/70">
                  Added on: {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 py-2 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#d94f6b] transition"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 py-2 bg-[#850E35] text-white font-medium rounded-lg hover:bg-[#6a0c2a] transition"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FCF5EE] p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={editShortDesc}
                onChange={(e) => setEditShortDesc(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Short Description"
                required
              />
              <textarea
                value={editFullDesc}
                onChange={(e) => setEditFullDesc(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Full Description"
                rows={4}
                required
              />
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Price"
                required
              />
              <input
                type="text"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Image URL (optional)"
              />
              <input
                type="text"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Time"
              />
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Date"
              />
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Location"
              />
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Category"
              />
              <input
                type="text"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full p-3 border-2 border-[#EE6983] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                placeholder="Priority"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#EE6983] text-white font-semibold rounded-lg hover:bg-[#d94f6b] transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 bg-[#850E35] text-white font-semibold rounded-lg hover:bg-[#6a0c2a] transition"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
