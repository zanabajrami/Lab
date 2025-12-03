import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "Si funksionon procesi i rezervimit në BookInn?",
            answer:
                "Procesi i rezervimit në BookInn është shumë i thjeshtë dhe i sigurt. Ju filloni duke zgjedhur destinacionin, datat e qëndrimit dhe llojin e akomodimit që preferoni. Më pas plotësoni informacionin tuaj personal, duke përfshirë emrin, mbiemrin, email-in dhe të dhëna të tjera të nevojshme për rezervimin. Pasi të keni dhënë të gjitha informacionet e kërkuara ju merrni menjëherë një konfirmim të rezervimit.",
        },
        {
            question: "A është i sigurt informacioni personal në BookInn?",
            answer:
                "Po, BookInn merr shumë seriozisht sigurinë e të dhënave tuaja personale. Të gjitha informacionet ruhen në servera të sigurta me enkriptim të avancuar dhe nuk ndahen me palë të treta pa lejen tuaj,ato përdoren vetëm për procesimin e rezervimeve ose për të ofruar informacion relevant.",
        },
        {
            question: "A mund ta anuloj rezervimin?",
            answer:
                "Po, shumica e pronave ofrojnë anulim falas deri në një afat të caktuar. Mund të anulloni ose modifikoni rezervimin tuaj direkt nga llogaria juaj BookInn ose përmes suportit tonë.",
        },
        {
            question: "Si mund të ndryshoj datat ose informacionin e rezervimit tim?",
            answer:
                "Mund të ndryshoni rezervimin tuaj direkt nga llogaria BookInn nëse jeni një javë para datës së rezervimit, mund të bëni ndryshime duke kontaktuar suportin tonë drejtpërdrejt për të siguruar që ndryshimet të bëhen në mënyrë të sigurt dhe të saktë.",
        },
        {
            question: "A ofroni mbështetje 24/7?",
            answer:
                "Po, ekipi ynë i suportit është i disponueshëm çdo ditë, çdo orë, për t’ju ndihmuar me çdo problem apo pyetje. Mund të kontaktoni me ne përmes Contact Us.",
        },
        {
            question: "A ka tarifa shtesë?",
            answer:
                "Çmimet janë transparente dhe tregohen qartë gjatë procesit të rezervimit. Disa prona mund të kenë taksa lokale ose tarifa shtesë, të cilat gjithmonë shfaqen para konfirmimit të pagesës.",
        },
        {
            question: "Si mund të kërkoj akomodime në vende të posaçme?",
            answer:
                "Ju mund të përdorni filtrat për të zgjedhur akomodime në vende të posaçme. Gjithashtu mund të shkruani nëse keni kërkesa specifike te informacionet që kërkohen për të rezervuar.",
        },
        {
            question: "A ofroni zbritje ose oferta speciale?",
            answer:
                "Po, BookInn ofron një gamë të gjerë ofertash dhe zbritjesh për përdoruesit e saj. Ju mund të shikoni të gjitha ofertat aktuale në seksionin e ofertave në faqen kryesore dhe të përfitoni nga promocionet speciale për të bërë rezervimin tuaj më të përballueshëm.",
        },
        {
            question: "A mund të rezervoj akomodim për një grup të madh?",
            answer:
                "Po, ju mund të rezervoni villa, apartamente ose hotele për grupe të mëdha. Ju mund të kontaktoni suportin tonë për të siguruar oferta dhe plane të personalizuara.",
        },
        {
            question: "Çfarë shërbimesh zakonisht ofrojnë akomodimet në BookInn?",
            answer:
                "Shumica e akomodimeve ofrojnë Wi-Fi falas, parkim, kuzhinë, lavanderi dhe në disa raste edhe pishinë ose palestër. Informacioni i plotë për shërbimet gjendet në faqen e çdo akomodimi."
        },
        {
            question: "Çfarë ndodh nëse akomodimi nuk përputhet me përshkrimin?",
            answer:
                "Nëse ka ndonjë problem me akomodimin, ju mund të kontaktoni suportin tonë brenda 24 orëve pas mbërritjes për të gjetur një zgjidhje ose për të kërkuar rimbursim.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-8 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-600 mb-10 text-center -mt-5">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function AccordionItem({ faq }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
            >
                <span className="text-lg text-gray-800">{faq.question}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown />
                </motion.div>
            </button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
            >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
        </div>
    );
}
