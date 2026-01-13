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

  // Consolidated state for the edit modal
  const [editFormData, setEditFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  // 1. Protect page and handle Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Fetch Products
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
        console.error(err);
        toast.error("Failed to fetch products");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!checkingAuth && user) {
      fetchProducts();
    }
  }, [checkingAuth, user]);

  // 3. Handle Delete
  const handleDelete = async (id) => {
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
          toast.success("Event deleted!");
          fetchProducts();
        } else {
          toast.error("Failed to delete");
        }
      } catch (err) {
        toast.error("Error deleting event");
      }
    }
  };

  // 4. Modal Handlers (The "Responsive" part)
  const openEditModal = (product) => {
    // Spreading the whole product into state at once is instant
    setEditFormData({ ...product });
  };

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
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Error updating event");
    } finally {
      setIsSaving(false);
    }
  };

  if (checkingAuth || loading) {
    return (
      <div className="flex justify-center py-40 items-center">
        <HashLoader color="#FFC4C4" size={100} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#FCF5EE] text-[#850E35]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <button
          className="py-2 px-6 bg-[#EE6983] text-white font-semibold rounded-lg shadow hover:bg-[#d94f6b] transition active:scale-95"
          onClick={() => router.push("/dashboard/add-product")}
        >
          Add Event
        </button>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center font-medium">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#FFC4C4] rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl flex flex-col"
            >
              {product.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image.startsWith("http") ? product.image : `/images/${product.image}`}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-1">{product.title}</h2>
                <p className="text-[#850E35] mb-2 line-clamp-2 text-sm">
                  {product.shortDescription}
                </p>
                <p className="font-bold text-lg mb-2">${product.price}</p>
                
                <div className="mt-auto flex gap-2">
                  <button
                    className="flex-1 py-2 bg-[#EE6983] text-white font-medium rounded-lg hover:bg-[#d94f6b] transition active:scale-95"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 py-2 bg-[#850E35] text-white font-medium rounded-lg hover:bg-[#6a0c2a] transition active:scale-95"
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
      {editFormData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#FCF5EE] p-6 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Title</label>
                  <input
                    name="title"
                    value={editFormData.title || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg outline-none focus:ring-2 focus:ring-[#EE6983]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Short Description</label>
                  <input
                    name="shortDescription"
                    value={editFormData.shortDescription || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg outline-none focus:ring-2 focus:ring-[#EE6983]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={editFormData.fullDescription || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg outline-none focus:ring-2 focus:ring-[#EE6983]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Price</label>
                  <input
                    name="price"
                    type="number"
                    value={editFormData.price || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg outline-none focus:ring-2 focus:ring-[#EE6983]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Location</label>
                  <input
                    name="location"
                    value={editFormData.location || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Time</label>
                  <input
                    name="time"
                    value={editFormData.time || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase mb-1 block opacity-70">Category</label>
                  <input
                    name="category"
                    value={editFormData.category || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border-2 border-[#EE6983] rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-[#EE6983] text-white font-bold rounded-lg hover:bg-[#d94f6b] disabled:opacity-50 transition active:scale-95 shadow-md"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 bg-[#850E35] text-white font-bold rounded-lg hover:bg-[#6a0c2a] transition active:scale-95 shadow-md"
                  onClick={() => setEditFormData(null)}
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
