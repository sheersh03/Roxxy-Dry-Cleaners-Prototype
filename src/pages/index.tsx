import Head from "next/head";
import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion as motionPrimitive } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  MessageCircle,
  Droplets,
  Shirt,
  Sparkles,
  Clock,
  Calendar,
  User,
  Home,
  CheckCircle2,
  Star,
} from "lucide-react";

// Temporary cast while framer-motion catches up with React 19 type changes (className missing otherwise).
const motion: any = motionPrimitive;

// const WHATSAPP_NUMBER = "9219636801";
const WHATSAPP_NUMBER = "7464849860";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="flex flex-col items-center text-white">
        <motion.div
          className="relative w-56 h-56 rounded-[28px] bg-white/10 backdrop-blur border border-white/25 shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: [0.95, 1, 0.98, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
          <div className="absolute top-2 left-3 right-3 flex justify-between">
            <span className="w-3 h-3 rounded-full bg-red-400/90" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <span className="w-3 h-3 rounded-full bg-green-400/90" />
          </div>
          <div className="absolute inset-5 rounded-full bg-black/20 p-2">
            <div className="relative w-full h-full rounded-full bg-blue-300/20 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-8 bg-white/80 rounded-md"
                    style={{
                      left: `${50 + 32 * Math.cos((i * Math.PI) / 4)}%`,
                      top: `${50 + 32 * Math.sin((i * Math.PI) / 4)}%`,
                      transform: "translate(-50%, -50%) rotate(15deg)",
                    }}
                    animate={{ rotate: [0, 20, -10, 0] }}
                    transition={{ duration: 2 + i * 0.15, repeat: Infinity }}
                  >
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-transparent border-b-4 border-white/80 rounded-b-md" />
                  </motion.div>
                ))}
                <motion.svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0"
                  preserveAspectRatio="none"
                  animate={{ y: [8, -6, 8] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror" }}
                >
                  <defs>
                    <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.65" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,120 C30,110 50,130 80,120 C110,110 130,130 160,120 C180,115 200,130 200,130 L200,200 L0,200 Z"
                    fill="url(#water)"
                  />
                </motion.svg>
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-white/80"
                    style={{ left: `${10 + i * 9}%`, bottom: `${10 + (i % 3) * 6}%` }}
                    animate={{ y: [0, -20, 0], opacity: [0.9, 0.6, 0.9] }}
                    transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity }}
                  />
                ))}
              </motion.div>
              <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            initial={{ x: -10 }}
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="text-white/90 font-medium tracking-wide"
          >
            Washing, rinsing, and spinning your freshness...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", service: "Laundry", address: "", date: "", time: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackHoverRating, setFeedbackHoverRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const heroWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Roxy Dry Cleaners, I want to book a pickup.")}`;
  const supportWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Roxy team, need help with my booking")}`;
  const directWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const openWhatsAppWithMessage = (message: string) => {
    if (typeof window === "undefined") return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(url, "_blank");
    if (!newWindow) {
      window.location.href = url;
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const services = [
    { icon: <Shirt className="w-12 h-12 text-blue-700" />, title: "Laundry", desc: "Gentle care for everyday wear with expert washing techniques." },
    { icon: <Droplets className="w-12 h-12 text-blue-700" />, title: "Dry Cleaning", desc: "Premium cleaning for delicate fabrics and formal attire." },
    { icon: <Sparkles className="w-12 h-12 text-blue-700" />, title: "Steam & Press", desc: "Crisp, wrinkle-free finish to keep you looking sharp." },
  ];

  const reviews = useMemo(() => [
    { name: "Aarav S.", text: "Super quick pickup and spotless finish. Shirts came back like new!" },
    { name: "Priya K.", text: "Trusted them with my silk saree—perfectly cleaned and pressed." },
    { name: "Rohan M.", text: "On-time delivery, great packaging, and friendly staff. Recommended!" },
    { name: "Ishita D.", text: "Stain removal magic—saved my blazer before an important event." },
  ], []);

  const [reviewIndex, setReviewIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setReviewIndex((i) => (i + 1) % reviews.length), 3000);
    return () => clearInterval(t);
  }, [reviews.length]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const isValidPhone = (v: string) => {
    const digits = (v || "").replace(/[^0-9]/g, "");
    return digits.length >= 8 && digits.length <= 15;
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!isValidPhone(form.phone)) return "Please enter a valid phone number";
    if (!form.address.trim()) return "Please add a pickup address";
    if (!form.date) return "Select a preferred pickup date";
    if (!form.time) return "Select a preferred pickup time";
    return null;
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { alert(err); return; }
    // Submit to mock API
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data?.ok) {
      setServerRef(data.ref || null);
      setSubmitted(true);

      const referenceLine = data.ref ? `📄 Ref: ${data.ref}` : null;
      const messageLines = [
        "👋 Hi Roxy Dry Cleaners, I want to schedule a pickup.",
        referenceLine,
        `🧾 Name: ${form.name || "(not provided)"}`,
        `📞 Phone: ${form.phone || "(not provided)"}`,
        `🧺 Service: ${form.service || "(not selected)"}`,
        form.address ? `📍 Address: ${form.address}` : null,
        form.date ? `📅 Preferred Date: ${form.date}` : null,
        form.time ? `⏰ Preferred Time: ${form.time}` : null,
        form.notes ? `📝 Notes: ${form.notes}` : null,
      ].filter(Boolean).join("\n");

      openWhatsAppWithMessage(messageLines);
    } else {
      alert(data?.error || "Something went wrong");
    }
  };

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const submitFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedbackRating) {
      alert("Please select a star rating before submitting.");
      return;
    }
    setFeedbackSubmitted(true);
    setFeedbackOpen(false);
    setFeedbackText("");
    setFeedbackRating(null);
    setFeedbackHoverRating(null);
  };

  return (
    <>
      <Head>
        <title>Roxy Dry Cleaners</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <AnimatePresence>{isLoading ? <Loader /> : null}</AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoading ? 0 : 1 }} transition={{ delay: 0.05, duration: 0.6 }} className={isLoading ? "pointer-events-none select-none" : ""}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4 sm:px-6 lg:px-0 py-16 md:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 leading-tight tracking-tight">Roxy Dry Cleaners</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Premium Laundry, Washing, and Dry Cleaning. Best-in-class workforce, industry-leading machinery, and highly qualified fabric-care experts.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button onClick={scrollToBooking} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto">Book a Service</Button>
            <a href={heroWhatsAppLink} target="_blank" rel="noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"><MessageCircle className="w-5 h-5" /> WhatsApp Us</Button>
            </a>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-10 py-12">
          {services.map((service, index) => (
            <Card key={index} className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 2 }} className="flex justify-center mb-4">{service.icon}</motion.div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Reviews */}
        <section className="px-4 sm:px-6 lg:px-10 py-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Loved by Customers</h2>
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={reviewIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid gap-6 md:grid-cols-2">
                {[reviews[reviewIndex], reviews[(reviewIndex + 1) % reviews.length]].map((r, i) => (
                  <Card key={i} className="rounded-2xl shadow-lg bg-white/90 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">{r.name.charAt(0)}</div>
                        <div><p className="font-semibold">{r.name}</p><p className="text-xs text-gray-500">Verified Customer</p></div>
                      </div>
                      <p className="text-gray-700">“{r.text}”</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Booking Form */}
        <section ref={bookingRef} className="px-4 sm:px-6 lg:px-10 py-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Book a Pickup</h2>
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            <Card className="rounded-2xl shadow-lg bg-white/90 backdrop-blur">
              <CardContent className="p-5 sm:p-6">
                {!submitted ? (
                  <form onSubmit={submitBooking} className="grid gap-4">
                    <div className="grid gap-1">
                      <label className="font-medium flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
                      <input name="name" value={form.name} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your name" />
                    </div>
                    <div className="grid gap-1">
                      <label className="font-medium flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</label>
                      <input name="phone" value={form.phone} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. 9219636801" />
                    </div>
                    <div className="grid gap-1">
                      <label className="font-medium">Service</label>
                      <select name="service" value={form.service} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400">
                        <option>Laundry</option>
                        <option>Dry Cleaning</option>
                        <option>Steam & Press</option>
                      </select>
                    </div>
                    <div className="grid gap-1">
                      <label className="font-medium flex items-center gap-2"><Home className="w-4 h-4" /> Pickup Address</label>
                      <textarea name="address" value={form.address} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" placeholder="House/Flat No, Street, Locality, City" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-1"><label className="font-medium flex items-center gap-2"><Calendar className="w-4 h-4" /> Preferred Date</label><input type="date" name="date" value={form.date} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" /></div>
                      <div className="grid gap-1"><label className="font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Preferred Time</label><input type="time" name="time" value={form.time} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" /></div>
                    </div>
                    <div className="grid gap-1"><label className="font-medium">Notes (optional)</label><textarea name="notes" value={form.notes} onChange={onChange} className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400" placeholder="Any special instructions (fabric type, stains, etc.)" /></div>
                    <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto">Confirm Booking</Button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <div>
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-lg font-semibold">Thanks, {form.name.split(" ")[0] || "there"}! Your pickup request is in.</p>
                      <p className="text-gray-600">Ref: {serverRef || "pending"} • We’ll call {form.phone || "you"} shortly to confirm.</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setServerRef(null);
                        setForm({ name: "", phone: "", service: "Laundry", address: "", date: "", time: "", notes: "" });
                      }}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto"
                    >
                      Book another pickup
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg bg-blue-800 text-white">
              <CardContent className="p-6 grid gap-4">
                <h3 className="text-2xl font-bold">Why book with Roxy?</h3>
                <ul className="space-y-2 list-disc list-inside text-blue-50 text-sm sm:text-base">
                  <li>Doorstep pickup & on-time delivery</li>
                  <li>Delicate fabric & stain experts</li>
                  <li>Eco-friendly detergents</li>
                  <li>Real-time WhatsApp support</li>
                </ul>
                <a href={supportWhatsAppLink} target="_blank" rel="noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full mt-2 flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5" /> Chat on WhatsApp</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Find Us</h2>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Roxy Dry Cleaners Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3517.5543719931384!2d77.70662877545642!3d28.996768070220437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65a9c276d973%3A0xcd31cdb9021b6db7!2sRoxy%20Dyers%20%26%20Dry%20Cleaners!5e0!3m2!1sen!2sin!4v1733333333333"
              width="100%"
              height="420"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
          <div className="text-center mt-4">
            <a href="https://maps.app.goo.gl/ehakHzYaf2fo6qQr7" target="_blank" rel="noreferrer"><Button>Open in Google Maps</Button></a>
          </div>
        </section>

        {/* Feedback */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Feedback / Rate Us</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              Loved our service or spotted something we can improve? Drop your rating and feedback so we can keep raising the bar for Roxy families.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setFeedbackOpen((open) => !open);
                setFeedbackSubmitted(false);
              }}
              className="px-6 py-3 rounded-xl shadow-lg bg-white text-blue-800 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Share Feedback
            </motion.button>
            <AnimatePresence mode="wait">
              {feedbackOpen ? (
                <motion.form
                  key="feedback-form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={submitFeedback}
                  className="max-w-xl mx-auto mt-8 text-left bg-white/10 border border-white/15 rounded-2xl p-5 sm:p-6 space-y-5 backdrop-blur"
                >
                  <div>
                    <span className="block text-xs sm:text-sm uppercase tracking-wide text-blue-100 mb-2">Your rating</span>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((value) => {
                        const active = value <= (feedbackHoverRating ?? feedbackRating ?? 0);
                        return (
                          <button
                            type="button"
                            key={value}
                            onMouseEnter={() => setFeedbackHoverRating(value)}
                            onMouseLeave={() => setFeedbackHoverRating(null)}
                            onClick={() => setFeedbackRating(value)}
                            className="p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                          >
                            <Star
                              className={`w-8 h-8 ${active ? "text-yellow-300" : "text-blue-200"}`}
                              fill={active ? "currentColor" : "none"}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm uppercase tracking-wide text-blue-100" htmlFor="feedback-notes">
                      Tell us a bit more
                    </label>
                    <textarea
                      id="feedback-notes"
                      rows={4}
                      value={feedbackText}
                      onChange={(event) => setFeedbackText(event.target.value)}
                      placeholder="Share what we did well or how we can improve..."
                      className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-blue-200/70 p-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setFeedbackOpen(false);
                        setFeedbackRating(null);
                        setFeedbackHoverRating(null);
                        setFeedbackText("");
                      }}
                      className="bg-white/10 text-blue-100 border border-white/20 hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-yellow-300 text-blue-900 font-semibold hover:bg-yellow-200">
                      Submit Feedback
                    </Button>
                  </div>
                </motion.form>
              ) : feedbackSubmitted ? (
                <motion.p
                  key="feedback-thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-blue-50 mt-6"
                >
                  Thank you for sharing your feedback! It helps us keep Roxy spotless.
                </motion.p>
              ) : null}
            </AnimatePresence>
        </motion.div>

        {/* Contact */}
        <div className="py-16 px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">Have questions? Reach out via phone, WhatsApp, or email. We’re here to help you 24/7.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="tel:9219636801"
              className="group block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
              aria-label="Call Roxy Dry Cleaners"
            >
              <Card className="rounded-2xl shadow-lg p-6 w-full sm:w-80 bg-white transition transform group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="flex flex-col gap-2 text-left">
                  <span className="font-semibold text-lg text-gray-900 flex items-center gap-2">📞 Phone</span>
                  <span className="text-gray-700 tracking-wide">9219636801</span>
                </div>
              </Card>
            </a>
            <a
              href={directWhatsAppLink}
              className="group block focus:outline-none focus:ring-2 focus:ring-green-500 rounded-2xl"
              aria-label="Chat with Roxy Dry Cleaners on WhatsApp"
            >
              <Card className="rounded-2xl shadow-lg p-6 w-full sm:w-80 bg-white transition transform group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="flex flex-col gap-2 text-left">
                  <span className="font-semibold text-lg text-gray-900 flex items-center gap-2">💬 WhatsApp</span>
                  <span className="text-gray-700 tracking-wide">9219636801</span>
                </div>
              </Card>
            </a>
            <a
              href="mailto:bk.roxy@gmail.com?subject=Roxy%20Dry%20Cleaners%20Feedback"
              className="group block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
              aria-label="Email Roxy Dry Cleaners"
            >
              <Card className="rounded-2xl shadow-lg p-6 w-full sm:w-80 bg-white transition transform group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="flex flex-col gap-2 text-left">
                  <span className="font-semibold text-lg text-gray-900 flex items-center gap-2">📧 Email</span>
                  <span className="text-gray-700 tracking-wide">bk.roxy@gmail.com</span>
                </div>
              </Card>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-blue-900 text-white text-center py-6 mt-12">
          <p>© {new Date().getFullYear()} Roxy Dry Cleaners. Built with ❤️</p>
        </footer>
      </motion.div>
    </div>
    </>
  );
}
