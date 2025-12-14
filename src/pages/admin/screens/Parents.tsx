import Banner from "@/components/shared/Banner";
import { parentProfileService } from "@/services/parentProfileService";
import { Edit2, Eye, EyeOff, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminPortalDate } from "../utils/date";

interface ParentInfo {
    name: string;
    parentId: string;
    email: string;
    phone: string;
    address: string;
    occupation: string;
    relationship: string;
    linkedStudentId: string;
    linkedStudentName: string;
    password?: string;
}

interface ParentProfile {
    _id?: string;
    parentInfo: ParentInfo;
}

const emptyParent: ParentInfo = {
    name: "",
    parentId: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    relationship: "",
    linkedStudentId: "",
    linkedStudentName: "",
    password: "",
};

const Parents = () => {
    const dateLabel = getAdminPortalDate();
    const [parentProfiles, setParentProfiles] = useState<ParentProfile[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentParent, setCurrentParent] = useState<ParentInfo>(emptyParent);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [viewingParent, setViewingParent] = useState<ParentProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const data = await parentProfileService.getParentProfiles();
            if (Array.isArray(data)) {
                setParentProfiles(data);
            } else {
                setParentProfiles([]);
                console.error("Expected array of parents but got:", data);
            }
        } catch (error) {
            toast.error("Failed to fetch parents");
        }
    };

    const filteredParents = parentProfiles.filter((profile) => {
        const searchLower = searchTerm.toLowerCase();
        const info = profile.parentInfo || {};
        return (
            (info.name || "").toLowerCase().includes(searchLower) ||
            (info.parentId || "").toLowerCase().includes(searchLower) ||
            (info.email || "").toLowerCase().includes(searchLower) ||
            (info.linkedStudentName || "").toLowerCase().includes(searchLower)
        );
    });

    const handleOpenCreate = () => {
        setCurrentParent(emptyParent);
        setEditingId(null);
        setShowPassword(false);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (profile: ParentProfile) => {
        setCurrentParent({ ...profile.parentInfo, password: "" });
        setEditingId(profile._id || null);
        setShowPassword(false);
        setIsModalOpen(true);
    };

    const handleOpenView = (profile: ParentProfile) => {
        setViewingParent(profile);
        setIsViewModalOpen(true);
    };

    const handleOpenDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                parentInfo: {
                    name: currentParent.name,
                    parentId: currentParent.parentId,
                    email: currentParent.email,
                    phone: currentParent.phone,
                    address: currentParent.address,
                    occupation: currentParent.occupation,
                    relationship: currentParent.relationship,
                    linkedStudentId: currentParent.linkedStudentId,
                    linkedStudentName: currentParent.linkedStudentName,
                    ...(currentParent.password && { password: currentParent.password }),
                },
            };

            if (editingId) {
                await parentProfileService.updateParentProfile(editingId, payload);
                toast.success("Parent updated successfully");
            } else {
                if (!currentParent.password) {
                    toast.error("Password is required for new parent accounts");
                    setIsLoading(false);
                    return;
                }
                await parentProfileService.createParentProfile(payload);
                toast.success("Parent created successfully");
            }

            setIsModalOpen(false);
            fetchParents();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Operation failed";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        setIsLoading(true);

        try {
            await parentProfileService.deleteParentProfile(deletingId);
            toast.success("Parent deleted successfully");
            setIsDeleteModalOpen(false);
            fetchParents();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete parent";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Banner
                title="Parent Directory"
                subtitle="Browse and manage parent/guardian profiles."
                right={
                    <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
                        {dateLabel}
                    </p>
                }
            />

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Parents & Guardians</h2>
                        <p className="text-sm text-gray-500">Manage parent accounts and student associations</p>
                    </div>
                    <button
                        onClick={handleOpenCreate}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#647FBC] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5a73b3] transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Parent
                    </button>
                </div>

                {/* Search */}
                <div className="mt-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, email, or linked student..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                        />
                    </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Parent ID</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Relationship</th>
                                <th className="px-4 py-3">Linked Student</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredParents.map((profile) => (
                                <tr key={profile._id} className="bg-white hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{profile.parentInfo?.name}</td>
                                    <td className="px-4 py-3">{profile.parentInfo?.parentId}</td>
                                    <td className="px-4 py-3">{profile.parentInfo?.email}</td>
                                    <td className="px-4 py-3">{profile.parentInfo?.phone}</td>
                                    <td className="px-4 py-3">{profile.parentInfo?.relationship}</td>
                                    <td className="px-4 py-3">{profile.parentInfo?.linkedStudentName || "N/A"}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenView(profile)}
                                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleOpenEdit(profile)}
                                                className="rounded p-1 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                                                title="Edit"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDelete(profile._id!)}
                                                className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredParents.length === 0 && (
                        <div className="py-8 text-center text-sm text-gray-500">
                            {searchTerm ? "No parents match your search." : "No parent records found."}
                        </div>
                    )}
                </div>
            </section>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingId ? "Edit Parent" : "Add New Parent"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentParent.name}
                                        onChange={(e) => setCurrentParent({ ...currentParent, name: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Parent ID *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentParent.parentId}
                                        onChange={(e) => setCurrentParent({ ...currentParent, parentId: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={currentParent.email}
                                        onChange={(e) => setCurrentParent({ ...currentParent, email: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={currentParent.phone}
                                        onChange={(e) => setCurrentParent({ ...currentParent, phone: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={currentParent.address}
                                        onChange={(e) => setCurrentParent({ ...currentParent, address: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Occupation
                                    </label>
                                    <input
                                        type="text"
                                        value={currentParent.occupation}
                                        onChange={(e) => setCurrentParent({ ...currentParent, occupation: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Relationship *
                                    </label>
                                    <select
                                        required
                                        value={currentParent.relationship}
                                        onChange={(e) => setCurrentParent({ ...currentParent, relationship: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                    >
                                        <option value="">Select relationship</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Guardian">Guardian</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Linked Student ID
                                    </label>
                                    <input
                                        type="text"
                                        value={currentParent.linkedStudentId}
                                        onChange={(e) => setCurrentParent({ ...currentParent, linkedStudentId: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                        placeholder="Student's ID"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Linked Student Name
                                    </label>
                                    <input
                                        type="text"
                                        value={currentParent.linkedStudentName}
                                        onChange={(e) => setCurrentParent({ ...currentParent, linkedStudentName: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                        placeholder="Student's name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {editingId ? "New Password (leave blank to keep current)" : "Password *"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required={!editingId}
                                        value={currentParent.password}
                                        onChange={(e) => setCurrentParent({ ...currentParent, password: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                                        placeholder={editingId ? "Leave blank to keep current password" : "Enter password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="rounded-lg bg-[#647FBC] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a73b3] disabled:opacity-50"
                                >
                                    {isLoading ? "Saving..." : editingId ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && viewingParent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Parent Details</h3>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Parent ID</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.parentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.phone || "N/A"}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.address || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Occupation</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.occupation || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Relationship</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.relationship}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Linked Student ID</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.linkedStudentId || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Linked Student Name</p>
                                    <p className="font-medium text-gray-900">{viewingParent.parentInfo.linkedStudentName || "N/A"}</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Parent</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this parent? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Parents;
