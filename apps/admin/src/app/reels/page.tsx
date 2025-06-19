'use client';

import { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';

const ReelsPage = () => {
    const [reels, setReels] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ title: '', link: '' });
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const hasFetchedRef = useRef(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastReelRef = useRef<HTMLDivElement | null>(null);

    const addReel = async (formData: { title: string; link: string; }, setReels) => {
        const res = await fetch("/api/reels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: formData.title, link: formData.link }),
        });
        const data = await res.json();
        if (data.success && data.response !== null) {
            setReels((prev) => [...prev, data.response]);
            toast.success('New reel added successfully');
        } else {
            toast.error('Failed to add reel');
        }
    }

    const editReel = async (editId: number, formData: { title: string; link: string; }, setReels) => {
        const res = await fetch(`/api/reels/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: formData.title, link: formData.link }),
        });
        const data = await res.json();
        if (data.success && data.response !== null) {
            setReels((prev) => prev.map((r) => (r.id === editId ? { ...r, ...formData } : r)));
            toast.success('Reel updated successfully');
        } else {
            toast.error('Failed to update reel');
        }
    }

    const deleteReel = async (confirmDeleteId: number, setReels) => {
        const res = await fetch(`/api/reels/${confirmDeleteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        if (data.success && data.response !== null) {
            setReels((prev) => prev.filter((r) => r.id !== confirmDeleteId));
            toast.success('Reel deleted successfully');
        } else {
            toast.error('Failed to delete reel');
        }
    }

    const fetchReels = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch("/api/reels/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page, size: 6, searchTerm: "" }),
            });

            const data = await res.json();
            if (data.success && data.response.reels.length > 0) {
                setReels((prev) => [...prev, ...data.response.reels]);
                setHasMore(data.response.reels.length === 6);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching reels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        document.title = "Reels | Culinary Medicine";
        window.scrollTo(0, 0);
        fetchReels(page);
    }, [page]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });
        if (lastReelRef.current) {
            observer.current.observe(lastReelRef.current);
        }
    }, [loading, hasMore]);

    const openDialog = (reel?: typeof reels[0]) => {
        if (reel) {
            setEditId(reel.id);
            setFormData({ title: reel.title, link: reel.link });
        } else {
            setEditId(null);
            setFormData({ title: '', link: '' });
        }
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setFormData({ title: '', link: '' });
        setEditId(null);
    };

    const handleSave = async () => {
        if (editId !== null) {
            await editReel(editId, formData, setReels);
        } else {
            if (!formData.title || !formData.link) {
                toast.error('Please fill in both fields');
                return;
            }
            await addReel(formData, setReels);
        }
        closeDialog();
    };

    const confirmDelete = (id: number) => {
        setConfirmDeleteId(id);
    };

    const handleConfirmDelete = async () => {
        if (confirmDeleteId !== null) {
            await deleteReel(confirmDeleteId, setReels);
            setConfirmDeleteId(null);
        }
    };


    const cancelDelete = () => {
        setConfirmDeleteId(null);
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-50 to-white">
            <Toaster position="top-center" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🎬 Reels Manager</h1>
                <button
                    onClick={() => openDialog()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaPlus className="inline mr-2" /> Add New Reel
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="bg-white shadow-lg p-4 rounded-xl border hover:shadow-xl transition"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">{reel.title}</h2>
                        <a
                            href={reel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm break-all"
                        >
                            {reel.link}
                        </a>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => openDialog(reel)}
                                className="text-yellow-500 hover:text-yellow-600"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => confirmDelete(reel.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isOpen} onClose={closeDialog} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10">
                        <button
                            onClick={closeDialog}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes />
                        </button>

                        <Dialog.Title className="text-xl font-bold mb-4">
                            {editId !== null ? 'Edit Reel' : 'Add New Reel'}
                        </Dialog.Title>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border p-2 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Link"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                className="w-full border p-2 rounded-lg"
                            />
                            <button
                                onClick={handleSave}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog open={confirmDeleteId !== null} onClose={cancelDelete} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 z-10">
                        <Dialog.Title className="text-lg font-bold text-gray-800 mb-4">
                            Confirm Delete
                        </Dialog.Title>
                        <p className="mb-6 text-gray-600">Are you sure you want to delete this reel?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default ReelsPage;
