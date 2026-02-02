import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, X, Info, FileText, ShieldCheck } from "lucide-react";

export default function EditCanceledBooking({ open, onClose, cancellation, token, onSaved }) {
    const [form, setForm] = useState({
        reason: "",
        admin_note: "",
        status: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cancellation) {
            setForm({
                reason: cancellation.reason || "",
                admin_note: cancellation.admin_note || "",
                status: cancellation.status || "pending"
            });
        }
    }, [cancellation]);

    if (!open || !cancellation) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const save = async () => {
        setLoading(true);
        try {
            await axios.put(
                `http://localhost:8000/api/cancel-bookings/${cancellation.id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSaved();
            onClose();
        } catch (err) {
            console.error("Failed to save cancellation update", err);
            alert("Error updating record");
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = "flex items-center gap-2 text-[11px] sm:text-[12px] font-black text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";
    const inputStyle = "w-full border-2 border-slate-100 rounded-2xl p-3 sm:p-4 text-sm sm:text-base font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all bg-slate-50/50 hover:bg-white focus:bg-white";

    return (
        /* SHTUAR: p-4 qe modali te kete hapesire nga edges ne mobile */
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
                onClick={onClose} 
            />

            {/* Modal Container */}
            {/* NDRYSHUAR: max-w-xl dhe max-h qe te mos jete i ngjitur me marginat e telefonit */}
            <div className="relative bg-white w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                    <div className="overflow-hidden">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">Review Request</h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium truncate">
                            ID: <span className="text-indigo-600">#{cancellation.id}</span>
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 sm:p-3 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 rounded-2xl text-slate-400 transition-all shrink-0"
                    >
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 custom-scrollbar">
                    
                    {/* Info Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-indigo-50/50 p-3 sm:p-4 rounded-2xl border border-indigo-100">
                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Guest</span>
                            <div className="font-bold text-slate-800 text-sm sm:text-base truncate">{cancellation.name}</div>
                        </div>
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Hotel</span>
                            <div className="font-bold text-slate-800 text-sm sm:text-base truncate">{cancellation.hotel_name}</div>
                        </div>
                    </div>

                    {/* Stay Dates */}
                    <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl text-white shadow-lg">
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                            <Calendar size={16} className="text-indigo-400" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-[9px] text-slate-400 font-bold uppercase">Check In</span>
                                <span className="font-medium">{new Date(cancellation.check_in).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-700 mx-2" />
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-right">
                            <div className="flex flex-col leading-tight">
                                <span className="text-[9px] text-slate-400 font-bold uppercase">Check Out</span>
                                <span className="font-medium">{new Date(cancellation.check_out).toLocaleDateString()}</span>
                            </div>
                            <Calendar size={16} className="text-rose-400" />
                        </div>
                    </div>

                    {/* Reason Field */}
                    <div>
                        <label className={labelStyle}><FileText size={14} /> Cancellation Reason</label>
                        <textarea
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            className={`${inputStyle} h-24 sm:h-32 resize-none leading-relaxed text-slate-700`}
                            placeholder="Enter the detailed reason..."
                        />
                    </div>

                    {/* Admin Note */}
                    <div>
                        <label className={labelStyle}><Info size={14} /> Admin / Private Note</label>
                        <textarea
                            name="admin_note"
                            value={form.admin_note}
                            onChange={handleChange}
                            className={`${inputStyle} h-20 sm:h-28 resize-none border-amber-100 bg-amber-50/20 focus:bg-white text-slate-700 italic`}
                            placeholder="Notes only visible to staff..."
                        />
                    </div>

                    {/* Status Select */}
                    <div>
                        <label className={labelStyle}><ShieldCheck size={14} /> Decision Status</label>
                        <div className="relative">
                            <select 
                                name="status" 
                                value={form.status} 
                                onChange={handleChange} 
                                className={`${inputStyle} appearance-none font-black cursor-pointer pr-10 ${
                                    form.status === 'approved' ? 'text-green-600 border-green-200 bg-green-50/30' : 
                                    form.status === 'rejected' ? 'text-rose-600 border-rose-200 bg-rose-50/30' : 'text-amber-600 border-amber-200 bg-amber-50/30'
                                }`}
                            >
                                <option value="pending">PENDING </option>
                                <option value="approved">APPROVED </option>
                                <option value="rejected">REJECTED</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 shrink-0">
                    <button 
                        onClick={onClose} 
                        className="order-2 sm:order-1 w-full sm:w-1/3 px-6 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-600 font-black text-xs sm:text-sm hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                    >
                        CLOSE
                    </button>
                    <button 
                        onClick={save} 
                        disabled={loading}
                        className="order-1 sm:order-2 w-full sm:flex-1 px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-950 text-white font-black text-xs sm:text-sm hover:bg-indigo-200 hover:text-slate-900 shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? "SAVING..." : "CONFIRM UPDATE"}
                    </button>
                </div>
            </div>
        </div>
    );
}