"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consolidated form state for speed
  const [editFormData, setEditFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) router.push("/login");
      else setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProducts = () => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/events?userId=${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!checkingAuth && user) fetchProducts();
  }, [checkingAuth, user]);

  // INSTANT MODAL OPEN
  const openEditModal = (product) => {
    // Spreading the product into state once is faster than 11 individual sets
    setEditFormData({ ...product });
  };

  // GENERIC INPUT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/events/${editFormData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Event updated!");
        setEditFormData(null);
        fetchProducts();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating event");
    } finally {
      setIsSaving(false);
    }
  };

  if (checkingAuth || loading)
    return (
      <div className="flex justify-center py-40 items-center">
        <HashLoader color="#FFC4C4" size={100} />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-[#FCF5EE] text-[#850E35]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="py-2 px-6 bg-[#EE6983] text-white font-semibold rounded-lg shadow hover:bg-[#d94f6b] transition"
          onClick={() => router.push("/dashboard/add-product")}
        >
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-[#FFC4C4] rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl">
            {product.image && (
              <Image
                src={product.image.startsWith("http") ? product.image : `/images/${product.image}`}
                alt={product.title}
                width={600}
                height={400}
                className="object-cover h-48 w-full"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="font-semibold mb-4">${product.price}</p>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#d94f6b] transition"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 py-2 bg-[#850E35] text-white font-medium rounded-lg"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REFACTORED MODAL */}
      {editFormData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FCF5EE] p-6 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase opacity-70">Event Title</label>
                <input
                  name="title"
                  value={editFormData.title || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-[#EE6983] rounded-lg focus:ring-2 focus:ring-[#EE6983] outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase opacity-70">Short Description</label>
                <input
                  name="shortDescription"
                  value={editFormData.shortDescription || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-[#EE6983] rounded-lg focus:ring-2 focus:ring-[#EE6983] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase opacity-70">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  value={editFormData.price || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-[#EE6983] rounded-lg focus:ring-2 focus:ring-[#EE6983] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase opacity-70">Category</label>
                <input
                  name="category"
                  value={editFormData.category || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-[#EE6983] rounded-lg focus:ring-2 focus:ring-[#EE6983] outline-none"
                />
              </div>

              <div className="md:col-span-2 flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-[#EE6983] text-white font-bold rounded-lg disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditFormData(null)}
                  className="flex-1 py-3 bg-[#850E35] text-white font-bold rounded-lg shadow-md active:scale-95"
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
