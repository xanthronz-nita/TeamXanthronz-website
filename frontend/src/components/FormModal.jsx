import { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, ChevronDown } from "lucide-react";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

/**
 * Reusable FormModal component for all CRUD operations across the app
 * @param {Object} tab - Tab configuration with key, label, fields, etc.
 * @param {Object} record - The item being edited (null for create)
 * @param {Function} onClose - Callback when modal closes
 * @param {Function} onSuccess - Callback when form submits successfully
 */
export default function FormModal({ tab, record, onClose, onSuccess }) {
  const isEdit = !!record;

  const [form, setForm] = useState(() => {
    const initial = {};
    tab.fields.forEach((field) => {
      if (field.type === "file") return;
      if (field.name === "skills" && record?.skills) {
        initial[field.name] = record.skills.join(", ");
      } else if (field.name === "highlights" && record?.highlights) {
        initial[field.name] = record.highlights.join("\n");
      } else if (field.name === "rankSummary" && record?.rankSummary) {
        initial[field.name] = JSON.stringify(record.rankSummary, null, 2);
      } else if (field.name === "date" && record?.date) {
        initial[field.name] = new Date(record.date).toISOString().split("T")[0];
      } else {
        initial[field.name] = record?.[field.name] ?? "";
      }
    });
    return initial;
  });

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      let res;

      // For gallery edit, send JSON only with type and caption
      if (isEdit && tab.key === "gallery") {
        const data = {
          type: form.type,
          caption: form.caption || "",
        };
        res = await api.put(`/${tab.key}/${record.id}`, data);
        onSuccess(res.data.data, isEdit);
      } else {
        // For all other cases, use FormData
        const formData = new FormData();

        tab.fields.forEach((field) => {
          if (field.type === "file") return;
          const value = form[field.name];
          if (value === "" || value === undefined) return;

          if (field.name === "skills") {
            const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
            formData.append("skills", JSON.stringify(arr));
          } else if (field.name === "highlights") {
            const arr = value.split("\n").map((s) => s.trim()).filter(Boolean);
            formData.append("highlights", JSON.stringify(arr));
          } else if (field.name === "rankSummary") {
            try {
              JSON.parse(value);
              formData.append("rankSummary", value);
            } catch {
              throw new Error("Rank Summary must be valid JSON");
            }
          } else {
            formData.append(field.name, value);
          }
        });

        const fileField = tab.fields.find((f) => f.type === "file");
        if (file && fileField) {
          formData.append(fileField.name, file);
        }

        if (isEdit) {
          res = await api.put(`/${tab.key}/${record.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          const CREATE_URLS = {
            squads: "/squads/create-member",
            achievements: "/achievements/create-achievement",
            events: "/events/create-event",
            gallery: "/gallery/new-image",
            sponsors: "/sponsors/new-sponsor",
          };

          const createUrl = CREATE_URLS[tab.key];
          res = await api.post(createUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }

        onSuccess(res.data.data, isEdit);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        className="relative bg-[#050f07] border border-[#00FF88]/20 rounded-2xl w-full max-w-lg mx-auto shadow-2xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.88, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 32 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <h3
            className="text-base font-black text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {isEdit
              ? `EDIT ${tab.label.toUpperCase().replace(/S$/, "")}`
              : `ADD ${tab.label.toUpperCase().replace(/S$/, "")}`}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-[#00FF88] hover:bg-[#00FF88]/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {tab.fields.map((field) => {
            // Skip image field when editing gallery
            if (isEdit && tab.key === "gallery" && field.type === "file") {
              return null;
            }

            return (
              <div key={field.name} className="flex flex-col gap-2">
                <label
                  className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {field.type === "select" ? (
                  <div className="relative">
                    <select
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00FF88]/50 transition-all cursor-pointer"
                    >
                      <option value="">Select...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                ) : field.type === "textarea" || field.type === "json" ? (
                  <textarea
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    rows={field.type === "json" ? 4 : 3}
                    placeholder={field.type === "json" ? '{"key": "value"}' : ""}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF88]/50 transition-all resize-none"
                  />
                ) : field.type === "file" ? (
                  <div
                    className={`relative border border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300
                      ${
                        file
                          ? "border-[#00FF88]/50 bg-[#00FF88]/5"
                          : "border-white/15 hover:border-[#00FF88]/30 hover:bg-white/[0.02]"
                      }`}
                    onClick={() =>
                      document.getElementById(`file-${field.name}`).click()
                    }
                  >
                    <input
                      id={`file-${field.name}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0] || null)}
                    />
                    <Upload
                      size={20}
                      className={file ? "text-[#00FF88]" : "text-gray-500"}
                    />
                    <span className="text-xs text-gray-400">
                      {file
                        ? file.name
                        : isEdit
                        ? "Upload new image (optional)"
                        : "Click to upload"}
                    </span>
                    <span className="text-[10px] text-gray-600">Max 700KB</span>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF88]/50 transition-all"
                  />
                )}
              </div>
            );
          })}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="p-6 border-t border-white/8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-bold hover:border-white/20 hover:text-white transition-all"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            CANCEL
          </button>
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-sm tracking-widest shadow-[0_0_20px_rgba(0,255,136,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {isSubmitting ? "SAVING..." : isEdit ? "UPDATE" : "CREATE"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
