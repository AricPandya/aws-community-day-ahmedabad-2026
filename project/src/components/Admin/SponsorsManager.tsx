import { useState } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { Sponsor } from "../../lib/supabase";
import { supabase } from "../../lib/supabase";
import { uploadFile, deleteFile } from "../../lib/storage";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SponsorsManagerProps {
  sponsors: Sponsor[];
  onUpdate: (sponsors: Sponsor[]) => void;
}

const TIER_OPTIONS = [
  "Platinum Sponsors",
  "Gold Sponsors",
  "Silver Sponsors",
  "Booth Sponsors",
  "Community Partners",
  "Ticketing Partners",
  "Venue Partners",
] as const;

export function SponsorsManager({ sponsors, onUpdate }: SponsorsManagerProps) {
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");

  const filteredSponsors = sponsors
    .filter(
      (s) =>
        s.company_name.toLowerCase().includes(search.toLowerCase()) ||
        s.tier.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = filteredSponsors.findIndex((s) => s.id === active.id);
    const newIndex = filteredSponsors.findIndex((s) => s.id === over.id);

    const reordered = [...filteredSponsors];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    // Update UI immediately for better UX
    const reorderedWithNewOrder = reordered.map((sponsor, index) => ({
      ...sponsor,
      sort_order: index + 1
    }));
    
    const immediateUpdate = sponsors.map((s) => {
      const updated = reorderedWithNewOrder.find((r) => r.id === s.id);
      return updated || s;
    });
    
    onUpdate(immediateUpdate);

    try {
      await Promise.all(
        reordered.map((sponsor, index) =>
          supabase
            .from("sponsors")
            .update({ sort_order: index + 1 })
            .eq("id", sponsor.id)
        )
      );
    } catch (error) {
      alert("Failed to update order");
      // Revert on error
      onUpdate(sponsors);
    }
  };

  const deleteSponsor = async (id: string) => {
    if (confirm("Delete this sponsor?")) {
      try {
        const sponsor = sponsors.find((s) => s.id === id);
        if (sponsor?.logo_url) {
          await deleteFile(sponsor.logo_url, "sponsors");
        }
        const { error } = await supabase.from("sponsors").delete().eq("id", id);
        if (error) throw error;
        onUpdate(sponsors.filter((s) => s.id !== id));
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  const saveSponsor = async (sponsor: Omit<Sponsor, "id">) => {
    try {
      const maxSortOrder = Math.max(...sponsors.map(s => s.sort_order || 0), 0);
      const sponsorWithOrder = { ...sponsor, sort_order: maxSortOrder + 1 };
      
      const { data, error } = await supabase
        .from("sponsors")
        .insert([sponsorWithOrder])
        .select()
        .single();
      if (error) throw error;
      onUpdate([...sponsors, data]);
      setAdding(false);
    } catch (error) {
      alert("Failed to add");
    }
  };

  const updateSponsor = async (sponsor: Sponsor) => {
    try {
      const { data, error } = await supabase
        .from("sponsors")
        .update({
          company_name: sponsor.company_name,
          tier: sponsor.tier,
          logo_url: sponsor.logo_url,
          website_url: sponsor.website_url,
          description: sponsor.description,
          contact_email: sponsor.contact_email,
          benefits: sponsor.benefits,
        })
        .eq("id", sponsor.id)
        .select()
        .single();
      if (error) throw error;
      onUpdate(sponsors.map((s) => (s.id === sponsor.id ? data : s)));
      setEditing(null);
    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Manage Sponsors</h2>
        <button
          onClick={() => setAdding(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Sponsor
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search sponsors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <SortableContext
              items={filteredSponsors.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSponsors.map((sponsor) => (
                  <SortableRow
                    key={sponsor.id}
                    sponsor={sponsor}
                    onEdit={setEditing}
                    onDelete={deleteSponsor}
                  />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </div>
      </DndContext>

      {adding && (
        <SponsorModal
          sponsors={sponsors}
          onSave={saveSponsor}
          onCancel={() => setAdding(false)}
        />
      )}
      {editing && (
        <SponsorModal
          sponsors={sponsors}
          sponsor={editing}
          onSave={(data) => updateSponsor({ ...editing, ...data })}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function SponsorModal({
  sponsors,
  sponsor,
  onSave,
  onCancel,
}: {
  sponsors: Sponsor[];
  sponsor?: Sponsor;
  onSave: (data: Omit<Sponsor, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    company_name: sponsor?.company_name || "",
    tier: sponsor?.tier,
    logo_url: sponsor?.logo_url || "",
    website_url: sponsor?.website_url || "",
    description: sponsor?.description || "",
    contact_email: sponsor?.contact_email || "",
    benefits: sponsor?.benefits || [],
    sort_order: sponsor?.sort_order || 0,
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, "sponsors", sponsor?.id || "new");
      setFormData({ ...formData, logo_url: url });
    } catch (error) {
      alert("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {sponsor ? "Edit" : "Add"} Sponsor
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            placeholder="Company Name *"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={formData.tier || ""}
            onChange={(e) =>
              setFormData({ ...formData, tier: e.target.value as any })
            }
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Tier</option>
            {TIER_OPTIONS.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
          {formData.tier === "__custom__" && (
            <input
              type="text"
              placeholder="Enter new tier name"
              onChange={(e) =>
                setFormData({ ...formData, tier: e.target.value })
              }
              className="w-full p-2 border rounded mt-2"
              required
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded"
                disabled={uploading}
              />
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) =>
                  setFormData({ ...formData, logo_url: e.target.value })
                }
                placeholder="Or paste image URL"
                className="w-full p-2 border rounded"
              />
            </div>
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {formData.logo_url && (
              <img
                src={formData.logo_url}
                alt="Preview"
                className="w-20 h-20 object-contain mt-2"
              />
            )}
          </div>
          <input
            type="url"
            value={formData.website_url}
            onChange={(e) =>
              setFormData({ ...formData, website_url: e.target.value })
            }
            placeholder="Website URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
            className="w-full p-2 border rounded h-20"
          />
          <input
            type="email"
            value={formData.contact_email}
            onChange={(e) =>
              setFormData({ ...formData, contact_email: e.target.value })
            }
            placeholder="Contact Email"
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SortableRow({
  sponsor,
  onEdit,
  onDelete,
}: {
  sponsor: Sponsor;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sponsor.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          {...listeners}
          className="bg-orange-100 border border-orange-300 text-orange-800 px-2 py-1 rounded text-xs font-medium cursor-grab active:cursor-grabbing"
        >
          {sponsor.sort_order || 0}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={sponsor.logo_url}
          alt={sponsor.company_name}
          className="w-12 h-12 object-contain"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {sponsor.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {sponsor.tier}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
        {sponsor.website_url ? (
          <a
            href={sponsor.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Visit
          </a>
        ) : (
          "-"
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(sponsor)}
            className="text-indigo-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(sponsor.id)}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}