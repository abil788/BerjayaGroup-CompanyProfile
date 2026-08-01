import React, { createContext, useContext, useState } from 'react';

// ─── All translations ─────────────────────────────────────────────────────────
export const TRANSLATIONS = {
    en: {
        // Navbar
        nav: {
            home: 'Home',
            services: 'Services',
            projects: 'Projects',
            about: 'About Us',
            contact: 'Contact',
            cta: 'Request a Quote',
        },

        // Home
        home: {
            heroBadge: 'ISO 9001:2015 Certified',
            heroTitle: 'Engineering Excellence At Scale',
            heroDesc: 'Forging the future through technical precision and structural mastery. We deliver critical infrastructure that defines skylines and supports civilizations.',
            heroViewProjects: 'View Projects',
            heroConsultation: 'Schedule Consultation',
            metricProjects: 'Global Projects',
            metricHours: 'Safe Work Hours',
            metricPatents: 'Core Patents',
            metricSafety: 'Safety EMR Rating',
            servicesBadge: 'Core Solutions',
            servicesTitle: 'Structural Solutions',
            servicesAll: 'All Services',
            featuredBadge: 'Featured Works',
            featuredTitle: 'Recent Project Wins',
            featuredCaseStudy: 'Full Case Study',
            ctaTitle: 'Ready to Build?',
            ctaDesc: 'Connect with our engineering experts to discuss your upcoming infrastructure or commercial development. We offer detailed feasibility studies and structural reviews.',
            ctaConsultation: 'Schedule Consultation',
            ctaPortfolio: 'Download Portfolio',
            completedLabel: 'Completed',
        },

        // Services
        services: {
            badge: 'Our Offerings',
            title: 'Technical Solutions & Civil Works',
            desc: 'We deliver a comprehensive suite of civil engineering, commercial construction, modular structures, and safety consulting services designed to withstand decades of use.',
            serviceRef: 'SERVICE REF:',
            techSpecs: 'TECHNICAL SPECIFICATIONS',
            inquire: 'Inquire for Quote',
            metricsBadge: 'Metrics Compliance',
            metricsTitle: 'Safety Auditing & Quality Dashboard',
            metricsDesc: 'Our compliance parameters exceed OSHA guidelines. Every infrastructure deployment executes under direct ISO-standard monitoring audits.',
            fatalities: 'Fatalities Rate',
            emr: 'EMR Standard',
            iso: 'ISO 9001 Audited',
            hours: 'Hours Logged',
        },

        // Projects
        projects: {
            badge: 'Portfolio Showcase',
            title: 'Civil & Industrial Builds',
            desc: 'Explore our engineering execution records. From hydroelectric dams to metropolitan overpasses and commercial sky towers, we build structures that stand the test of time.',
            filterAll: 'All',
            filterLabels: { All: 'All', Industrial: 'Industrial', Civil: 'Civil', Commercial: 'Commercial' },
            noProjects: 'No Projects Found in this category',
            clientLabel: 'CLIENT',
            locationLabel: 'LOCATION',
            budgetLabel: 'BUDGET:',
        },

        // About
        about: {
            badge: 'Corporate Identity',
            title: 'About Constructo Engineering',
            desc: 'Forging heavy civil frameworks and industrial assets globally since 2008. We operate at the intersection of technical design accuracy and massive building scales.',
            storyBadge: '15+ Years Leadership',
            storyTitle: 'Defining structural standards in civil engineering',
            storyP1: 'Established in Houston, Texas, Berjaya Group grew from a local structural design group into a leading international civil works developer. Today, we oversee critical infrastructure projects across three continents, combining advanced WebGL mechanical simulation data with experienced site crews.',
            storyP2: 'Our primary sector deployments are ISO 9001:2015 certified, verifying our commitment to structural durability. From high-rise skeletons to mass earthworks, our team of structural engineers manages the entire asset cycle.',
            valuesBadge: 'Operating Standards',
            valuesTitle: 'Our Pillars of Work',
            values: [
                { title: 'Technical Precision', desc: 'Every calculation, material selection, and structural element is subjected to rigorous safety simulations and peer audits.' },
                { title: 'Absolute Safety', desc: "Our 'Zero-Harm' policy is non-negotiable. We maintain a project site EMR rating of 0.82, well below industry standard average of 1.0." },
                { title: 'Asset Permanence', desc: 'We engineer infrastructure designed to last. Our structural concrete raw material mix is carbon-neutral and rated for a 100-year lifecycle.' }
            ],
            officesBadge: 'Network',
            officesTitle: 'Global Directives',
            addressLabel: 'Address',
            directLabel: 'Direct',
        },

        // Contact
        contact: {
            badge: 'Connect',
            title: 'Contact Us & Inquiries',
            desc: 'Submit a formal project query using our structured multi-step portal. Your inquiry will be sent directly to WhatsApp and securely logged in our management portal.',
            globalOps: 'Global Operations',
            activeZones: 'ACTIVE REGIONAL ZONES',
            dubaiOffice: 'Dubai Office',
            directWa: 'Direct WhatsApp',
            sopTitle: 'S.O.P. Inquiry Protocols',
            sop1Title: 'Instant Response',
            sop1Desc: 'Auto-formatted messages are sent directly to our engineering team via WhatsApp.',
            sop2Title: 'Complete Documentation',
            sop2Desc: 'Full Name, Email, Scope, Budget & Timeline are structured neatly in the message.',
            sop3Title: '24/7 Field Support',
            sop3Desc: 'Our consultants are ready to respond to construction & technical consultation needs.',
            waLine: 'WhatsApp Direct Line',
            formTitle: 'Project Inquiry via WhatsApp',
            formRef: 'DIRECT WA FORM',
            labelFullName: 'Full Name',
            placeholderFullName: 'Johnathan Doe',
            labelEmail: 'Corporate Email',
            placeholderEmail: 'j.doe@company.com',
            labelOrg: 'Organization / Entity',
            placeholderOrg: 'Global Infrastructure Partners',
            primarySector: 'Primary Sector',
            sectorLabels: ['Civil Works', 'Industrial', 'Commercial'],
            budgetOptions: ['$5M - $25M', '$25M - $100M', '$100M+'],
            timelineOptions: ['Immediate (Q1-Q2 2025)', 'Planning Phase (2026 Start)', 'Request for Tender'],
            btnContinue: 'Continue',
            labelScope: 'Project Scope / Technical Specifications',
            placeholderScope: 'Provide geological details, target timelines, framework specs, or materials requirements...',
            labelBudget: 'Estimated Budget',
            labelTimeline: 'Timeline',
            btnBack: 'Back',
            btnSubmit: 'Send via WhatsApp',
            btnSubmitting: 'Processing...',
            errorBasic: 'Please fill in all required fields.',
            errorScope: 'Please describe your project scope and technical requirements.',
            successTitle: 'Inquiry Sent to WhatsApp!',
            successDesc: 'WhatsApp has been opened automatically. If it did not open, click the button below to open the conversation directly.',
            btnOpenWa: 'Open WhatsApp Chat',
            btnNewInquiry: 'Submit New Inquiry',
            waMsg: (name, email, org, sector, scope, budget, timeline) =>
`Hello Berjaya Group / Constructo,

I would like to submit a *Project Inquiry* via your website:

👤 *Contact Information*
• Full Name: ${name}
• Corporate Email: ${email}
• Organization: ${org}
• Sector: ${sector}

🏗️ *Project Specifications*
• Scope / Technical Specs:
${scope}

💰 *Estimated Budget*: ${budget}
⏱️ *Timeline*: ${timeline}

Please respond at your earliest convenience. Thank you!`,
        },

        // Footer (for future use)
        footer: {
            tagline: 'Engineering structures that outlast generations.',
            rights: 'All rights reserved.',
        }
    },

    id: {
        // Navbar
        nav: {
            home: 'Beranda',
            services: 'Layanan',
            projects: 'Proyek',
            about: 'Tentang Kami',
            contact: 'Kontak',
            cta: 'Minta Penawaran',
        },

        // Home
        home: {
            heroBadge: 'Bersertifikasi ISO 9001:2015',
            heroTitle: 'Keunggulan Rekayasa di Skala Besar',
            heroDesc: 'Membangun masa depan melalui presisi teknis dan penguasaan struktural. Kami menghadirkan infrastruktur kritis yang mendefinisikan cakrawala dan menopang peradaban.',
            heroViewProjects: 'Lihat Proyek',
            heroConsultation: 'Jadwalkan Konsultasi',
            metricProjects: 'Proyek Global',
            metricHours: 'Jam Kerja Aman',
            metricPatents: 'Paten Inti',
            metricSafety: 'Rating EMR Keselamatan',
            servicesBadge: 'Solusi Inti',
            servicesTitle: 'Solusi Struktural',
            servicesAll: 'Semua Layanan',
            featuredBadge: 'Karya Unggulan',
            featuredTitle: 'Proyek Terbaru',
            featuredCaseStudy: 'Studi Kasus Lengkap',
            ctaTitle: 'Siap Membangun?',
            ctaDesc: 'Hubungi para ahli teknik kami untuk mendiskusikan infrastruktur atau pembangunan komersial Anda yang akan datang. Kami menawarkan studi kelayakan terperinci dan tinjauan struktural.',
            ctaConsultation: 'Jadwalkan Konsultasi',
            ctaPortfolio: 'Unduh Portofolio',
            completedLabel: 'Selesai',
        },

        // Services
        services: {
            badge: 'Penawaran Kami',
            title: 'Solusi Teknis & Pekerjaan Sipil',
            desc: 'Kami menyediakan rangkaian lengkap layanan rekayasa sipil, konstruksi komersial, struktur modular, dan konsultasi keselamatan yang dirancang untuk bertahan selama beberapa dekade.',
            serviceRef: 'REF LAYANAN:',
            techSpecs: 'SPESIFIKASI TEKNIS',
            inquire: 'Minta Penawaran',
            metricsBadge: 'Kepatuhan Metrik',
            metricsTitle: 'Audit Keselamatan & Dashboard Kualitas',
            metricsDesc: 'Parameter kepatuhan kami melebihi pedoman OSHA. Setiap penerapan infrastruktur dilaksanakan di bawah audit pemantauan standar ISO langsung.',
            fatalities: 'Tingkat Fatalitas',
            emr: 'Standar EMR',
            iso: 'Diaudit ISO 9001',
            hours: 'Jam Tercatat',
        },

        // Projects
        projects: {
            badge: 'Portofolio',
            title: 'Bangunan Sipil & Industri',
            desc: 'Jelajahi rekam jejak eksekusi teknik kami. Dari bendungan pembangkit listrik tenaga air hingga jalan layang metropolitan dan menara komersial, kami membangun struktur yang tahan uji waktu.',
            filterAll: 'Semua',
            filterLabels: { All: 'Semua', Industrial: 'Industri', Civil: 'Sipil', Commercial: 'Komersial' },
            noProjects: 'Tidak ada proyek ditemukan dalam kategori ini',
            clientLabel: 'KLIEN',
            locationLabel: 'LOKASI',
            budgetLabel: 'ANGGARAN:',
        },

        // About
        about: {
            badge: 'Identitas Perusahaan',
            title: 'Tentang Constructo Engineering',
            desc: 'Membangun kerangka sipil berat dan aset industri secara global sejak 2008. Kami beroperasi di persimpangan akurasi desain teknis dan skala bangunan masif.',
            storyBadge: '15+ Tahun Kepemimpinan',
            storyTitle: 'Mendefinisikan standar struktural dalam rekayasa sipil',
            storyP1: 'Didirikan di Houston, Texas, Berjaya Group berkembang dari kelompok desain struktural lokal menjadi pengembang pekerjaan sipil internasional terkemuka. Saat ini, kami mengawasi proyek infrastruktur kritis di tiga benua, menggabungkan data simulasi mekanis WebGL canggih dengan kru lapangan berpengalaman.',
            storyP2: 'Penerapan sektor utama kami telah tersertifikasi ISO 9001:2015, memverifikasi komitmen kami terhadap ketahanan struktural. Dari kerangka gedung pencakar langit hingga pekerjaan tanah masif, tim insinyur struktural kami mengelola seluruh siklus aset.',
            valuesBadge: 'Standar Operasi',
            valuesTitle: 'Pilar Kerja Kami',
            values: [
                { title: 'Presisi Teknis', desc: 'Setiap perhitungan, pemilihan material, dan elemen struktural mengalami simulasi keselamatan yang ketat dan audit sejawat.' },
                { title: 'Keselamatan Mutlak', desc: 'Kebijakan "Zero-Harm" kami tidak dapat dikompromikan. Kami mempertahankan rating EMR lokasi proyek 0,82, jauh di bawah rata-rata standar industri 1,0.' },
                { title: 'Permanensi Aset', desc: 'Kami merancang infrastruktur yang dirancang untuk bertahan lama. Campuran bahan baku beton struktural kami bersifat karbon-netral dan dinilai untuk siklus hidup 100 tahun.' }
            ],
            officesBadge: 'Jaringan',
            officesTitle: 'Direktif Global',
            addressLabel: 'Alamat',
            directLabel: 'Kontak',
        },

        // Contact
        contact: {
            badge: 'Hubungi Kami',
            title: 'Kontak & Pengajuan Proyek',
            desc: 'Ajukan pertanyaan proyek secara formal melalui portal multi-langkah kami. Inquiry Anda akan dikirim langsung ke WhatsApp dan tersimpan aman di portal manajemen kami.',
            globalOps: 'Operasi Global',
            activeZones: 'ZONA REGIONAL AKTIF',
            dubaiOffice: 'Kantor Dubai',
            directWa: 'WhatsApp Langsung',
            sopTitle: 'Protokol Pengajuan Inquiry',
            sop1Title: 'Respon Instan',
            sop1Desc: 'Pesan terformat otomatis dikirim langsung ke WhatsApp tim engineering kami.',
            sop2Title: 'Dokumentasi Lengkap',
            sop2Desc: 'Nama, Email, Scope, Anggaran & Timeline tersusun rapi secara otomatis.',
            sop3Title: 'Dukungan 24/7',
            sop3Desc: 'Tim konsultan kami siap merespons kebutuhan konstruksi & konsultasi teknis kapan saja.',
            waLine: 'Hubungi via WhatsApp',
            formTitle: 'Pengajuan Proyek via WhatsApp',
            formRef: 'FORM INQUIRY LANGSUNG',
            labelFullName: 'Nama Lengkap',
            placeholderFullName: 'Budi Santoso',
            labelEmail: 'Email Perusahaan',
            placeholderEmail: 'budi@perusahaan.com',
            labelOrg: 'Organisasi / Perusahaan',
            placeholderOrg: 'Mitra Infrastruktur Global',
            primarySector: 'Sektor Utama',
            sectorLabels: ['Pekerjaan Sipil', 'Industri', 'Komersial'],
            budgetOptions: ['$5M - $25M', '$25M - $100M', '$100M+'],
            timelineOptions: ['Segera (Q1-Q2 2025)', 'Fase Perencanaan (Mulai 2026)', 'Permintaan Tender'],
            btnContinue: 'Lanjut',
            labelScope: 'Ruang Lingkup Proyek / Spesifikasi Teknis',
            placeholderScope: 'Berikan detail geologi, target waktu, spesifikasi kerangka, atau kebutuhan material...',
            labelBudget: 'Estimasi Anggaran',
            labelTimeline: 'Timeline',
            btnBack: 'Kembali',
            btnSubmit: 'Kirim via WhatsApp',
            btnSubmitting: 'Memproses...',
            errorBasic: 'Mohon isi semua kolom yang diperlukan.',
            errorScope: 'Mohon jelaskan ruang lingkup proyek dan kebutuhan teknis Anda.',
            successTitle: 'Inquiry Terkirim ke WhatsApp!',
            successDesc: 'WhatsApp telah dibuka secara otomatis. Jika belum terbuka, klik tombol di bawah untuk membuka percakapan secara langsung.',
            btnOpenWa: 'Buka WhatsApp Chat',
            btnNewInquiry: 'Ajukan Inquiry Baru',
            waMsg: (name, email, org, sector, scope, budget, timeline) =>
`Halo Berjaya Group / Constructo,

Saya ingin mengajukan *Inquiry Proyek* melalui website Anda:

👤 *Informasi Kontak*
• Nama Lengkap: ${name}
• Email Perusahaan: ${email}
• Organisasi: ${org}
• Sektor: ${sector}

🏗️ *Spesifikasi Proyek*
• Ruang Lingkup / Spesifikasi Teknis:
${scope}

💰 *Estimasi Anggaran*: ${budget}
⏱️ *Timeline*: ${timeline}

Mohon dapat segera direspon. Terima kasih!`,
        },

        footer: {
            tagline: 'Membangun struktur yang bertahan melampaui generasi.',
            rights: 'Seluruh hak cipta dilindungi.',
        }
    }
};

// ─── Language Context ─────────────────────────────────────────────────────────
export const LangContext = createContext({ lang: 'en', setLang: () => {}, t: TRANSLATIONS.en });

export function useLang() {
    return useContext(LangContext);
}
