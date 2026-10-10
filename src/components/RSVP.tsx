import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Heart,
  User,
  Phone,
  Users,
  MessageSquare,
  Loader2,
  Download,
  Trash2,
  ListFilter,
  Share2,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  submitRSVP,
  getStoredRSVPs,
  deleteRSVP,
  clearAllRSVPs,
  exportRSVPsToCSV,
  RSVPPayload,
} from '../services/rsvpService';

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPPayload>({
    guestName: '',
    phoneNumber: '',
    numberOfGuests: 1,
    attendance: 'attending',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<RSVPPayload | null>(null);

  // Organizer / Couple Guest List View state
  const [showGuestList, setShowGuestList] = useState(false);
  const [allRSVPs, setAllRSVPs] = useState<RSVPPayload[]>([]);

  useEffect(() => {
    setAllRSVPs(getStoredRSVPs());
  }, [isSubmitted, showGuestList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.phoneNumber.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const result = await submitRSVP(formData);
      setIsSubmitting(false);

      if (result.success) {
        setSubmittedData(result.savedEntry);
        setIsSubmitted(true);
        setResponseMsg(result.message);
        setAllRSVPs(getStoredRSVPs());

        // Festive Gold & Ivory Confetti Animation
        try {
          confetti({
            particleCount: 90,
            spread: 85,
            origin: { y: 0.6 },
            colors: ['#C8A85D', '#E2C779', '#FAF7F2', '#2C2C2C'],
          });
        } catch (e) {
          console.warn('Confetti trigger failed:', e);
        }
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setIsSubmitting(false);
      setErrorMsg('Something went wrong. Please try submitting again.');
    }
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    const updated = deleteRSVP(id);
    setAllRSVPs(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored RSVP records?')) {
      clearAllRSVPs();
      setAllRSVPs([]);
    }
  };

  // WhatsApp share link generator for instantaneous real-world delivery to the couple
  const getWhatsAppShareUrl = () => {
    const data = submittedData || formData;
    const isAttending = data.attendance === 'attending';
    const lines = [
      `💍 *Wedding RSVP for Rania & Omar* 💍`,
      `*Guest Name:* ${data.guestName}`,
      `*Status:* ${isAttending ? '✅ Attending with Joy' : '❌ Regretfully Decline'}`,
      isAttending ? `*Number of Guests:* ${data.numberOfGuests}` : null,
      `*Phone:* ${data.phoneNumber}`,
      data.message ? `*Message:* "${data.message}"` : null,
      `📍 *Venue:* JW Marriott Terrace, Cairo Egypt`,
      `📅 *Date:* Friday, October 30, 2026 at 4:00 PM`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(lines)}`;
  };

  // Compute summary stats
  const totalAttendingGuests = allRSVPs
    .filter((r) => r.attendance === 'attending')
    .reduce((sum, r) => sum + (r.numberOfGuests || 1), 0);
  const totalAttendingParties = allRSVPs.filter((r) => r.attendance === 'attending').length;
  const totalDeclinedParties = allRSVPs.filter((r) => r.attendance === 'declined').length;

  return (
    <section id="rsvp-section" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]">
            <Heart className="w-4 h-4 fill-[#C8A85D]" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
              Kindly Respond
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-4">
            Will You Celebrate With Us?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-md mx-auto leading-relaxed">
            Please respond by October 1st, 2026 so Rania & Omar can prepare for your arrival at the JW Marriott Terrace.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#C8A85D]/30 relative"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-sans tracking-wide border border-red-200 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Attendance Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <label
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.attendance === 'attending'
                        ? 'border-[#C8A85D] bg-[#FAF7F2] shadow-md text-[#2C2C2C]'
                        : 'border-stone-200 bg-white text-[#2C2C2C]/60 hover:border-[#C8A85D]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={formData.attendance === 'attending'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        formData.attendance === 'attending' ? 'text-[#C8A85D]' : 'text-stone-300'
                      }`}
                    />
                    <span className="font-serif text-lg font-medium">Accept with Joy</span>
                  </label>

                  <label
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.attendance === 'declined'
                        ? 'border-[#C8A85D] bg-[#FAF7F2] shadow-md text-[#2C2C2C]'
                        : 'border-stone-200 bg-white text-[#2C2C2C]/60 hover:border-[#C8A85D]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="declined"
                      checked={formData.attendance === 'declined'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.attendance === 'declined' ? 'border-[#C8A85D]' : 'border-stone-300'
                      }`}
                    >
                      {formData.attendance === 'declined' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C8A85D]" />
                      )}
                    </span>
                    <span className="font-serif text-lg font-medium">Regretfully Decline</span>
                  </label>
                </div>

                {/* Guest Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                      Guest Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="guestName"
                        required
                        value={formData.guestName}
                        onChange={handleChange}
                        placeholder="e.g. Youssef & Laila"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+20 10 1234 5678"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Guests */}
                {formData.attendance === 'attending' && (
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                      Number of Guests Attending
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                      <select
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all appearance-none cursor-pointer"
                      >
                        <option value={1}>1 Guest (Just Me)</option>
                        <option value={2}>2 Guests (+ Plus One)</option>
                        <option value={3}>3 Guests (Family)</option>
                        <option value={4}>4 Guests (Family)</option>
                        <option value={5}>5+ Guests</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message for the Couple */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                    Warm Wishes or Dietary Notes
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#C8A85D] absolute left-4 top-4" />
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share a wish for Rania & Omar or dietary preferences..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#2C2C2C] text-[#FAF7F2] font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-500 shadow-xl flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C8A85D]" />
                      <span>Confirming RSVP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send RSVP Response</span>
                      <Send className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 px-4 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border-2 border-[#C8A85D] flex items-center justify-center mb-6 text-[#C8A85D] shadow-lg">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-2">
                  RSVP Confirmed
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#2C2C2C]/80 max-w-md mx-auto mb-6 leading-relaxed">
                  {responseMsg}
                </p>

                {/* Details Summary Pill */}
                {submittedData && (
                  <div className="bg-[#FAF7F2] border border-[#C8A85D]/30 rounded-2xl p-4 mb-6 max-w-md w-full text-left text-xs font-sans text-[#2C2C2C]/80 space-y-1.5">
                    <div className="flex justify-between border-b border-stone-200 pb-1.5">
                      <span className="font-semibold text-[#8A6218]">Guest:</span>
                      <span>{submittedData.guestName}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-1.5">
                      <span className="font-semibold text-[#8A6218]">Status:</span>
                      <span className="capitalize font-medium">
                        {submittedData.attendance === 'attending' ? 'Attending with Joy' : 'Regretfully Declined'}
                      </span>
                    </div>
                    {submittedData.attendance === 'attending' && (
                      <div className="flex justify-between border-b border-stone-200 pb-1.5">
                        <span className="font-semibold text-[#8A6218]">Seats Reserved:</span>
                        <span>{submittedData.numberOfGuests}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#8A6218]">Phone:</span>
                      <span>{submittedData.phoneNumber}</span>
                    </div>
                  </div>
                )}

                {/* Quick WhatsApp Share Action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                  <a
                    href={getWhatsAppShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-[#1EBE5D] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedData(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#C8A85D]/40 text-[#2C2C2C] font-sans text-xs uppercase tracking-widest hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Edit / New RSVP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Discreet Organizer Access Link */}
          <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-center justify-between text-xs text-[#2C2C2C]/60">
            <button
              type="button"
              onClick={() => setShowGuestList(true)}
              className="inline-flex items-center gap-1.5 hover:text-[#C8A85D] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A85D]" />
              <span>Organizer Guest List ({allRSVPs.length} responses)</span>
            </button>

            {allRSVPs.length > 0 && (
              <button
                type="button"
                onClick={exportRSVPsToCSV}
                className="inline-flex items-center gap-1 hover:text-[#C8A85D] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C8A85D]" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Organizer Guest List Modal */}
      <AnimatePresence>
        {showGuestList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGuestList(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#C8A85D]/30 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
                <div>
                  <h3 className="font-serif text-2xl text-[#2C2C2C]">
                    Rania & Omar's Guest List
                  </h3>
                  <p className="font-sans text-xs text-[#2C2C2C]/60 mt-0.5">
                    Saved RSVP responses ({allRSVPs.length} total)
                  </p>
                </div>
                <button
                  onClick={() => setShowGuestList(false)}
                  className="p-2 rounded-full hover:bg-stone-200/60 text-[#2C2C2C] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-4 bg-stone-50 border-b border-stone-100 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">Total Guests</span>
                  <span className="font-serif text-xl font-bold text-[#8A6218]">{totalAttendingGuests}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">Attending Parties</span>
                  <span className="font-serif text-xl font-bold text-emerald-600">{totalAttendingParties}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                  <span className="block text-[10px] text-stone-500 uppercase font-semibold">Declined</span>
                  <span className="font-serif text-xl font-bold text-stone-500">{totalDeclinedParties}</span>
                </div>
              </div>

              {/* Guest Responses Scrollable List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-3">
                {allRSVPs.length === 0 ? (
                  <div className="text-center py-12 text-[#2C2C2C]/50 text-sm">
                    <ListFilter className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#C8A85D]" />
                    <p>No RSVP submissions recorded yet.</p>
                  </div>
                ) : (
                  allRSVPs.map((rsvp) => (
                    <div
                      key={rsvp.id || rsvp.phoneNumber}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-[#C8A85D]/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-[#2C2C2C]">
                            {rsvp.guestName}
                          </span>
                          <span
                            className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-semibold ${
                              rsvp.attendance === 'attending'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-stone-100 text-stone-600 border border-stone-200'
                            }`}
                          >
                            {rsvp.attendance === 'attending' ? `${rsvp.numberOfGuests} Attending` : 'Declined'}
                          </span>
                        </div>
                        <div className="text-xs text-[#2C2C2C]/60 flex items-center gap-2">
                          <span>{rsvp.phoneNumber}</span>
                          {rsvp.createdAt && (
                            <>
                              <span>•</span>
                              <span>{new Date(rsvp.createdAt).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        {rsvp.message && (
                          <p className="text-xs text-stone-600 italic bg-[#FAF7F2] p-2 rounded-lg mt-1 border border-[#C8A85D]/15">
                            "{rsvp.message}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        title="Remove record"
                        className="text-stone-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                {allRSVPs.length > 0 ? (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-red-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                ) : <span />}

                <div className="flex items-center gap-2">
                  {allRSVPs.length > 0 && (
                    <button
                      onClick={exportRSVPsToCSV}
                      className="px-4 py-2 rounded-lg bg-[#2C2C2C] text-[#FAF7F2] text-xs uppercase tracking-wider font-medium hover:bg-[#C8A85D] hover:text-[#1C1815] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download CSV</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowGuestList(false)}
                    className="px-4 py-2 rounded-lg border border-stone-300 text-xs text-[#2C2C2C] hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
