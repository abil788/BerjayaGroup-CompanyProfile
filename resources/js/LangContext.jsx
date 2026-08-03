import React, { createContext, useContext, useState } from 'react';

// ─── All translations ─────────────────────────────────────────────────────────
export const TRANSLATIONS = {
    en: {
        // Navbar
        nav: {
            home: 'Home',
            services: 'Services',
            projects: 'Projects',
            projectsRef: 'Project References',
            projectsOngoing: 'Ongoing Projects',
            projectsFacilities: 'Workshop & Equipment',
            about: 'About Us',
            aboutProfile: 'Company Profile',
            aboutIso: 'ISO Certifications',
            contact: 'Contact',
            cta: 'Request a Quote',
        },

        // Home
        home: {
            heroBadge: 'ISO 9001 · 14001 · 45001 · 37001 Certified',
            heroTitle: 'Engineering Excellence At Scale',
            heroDesc: 'Berjaya Group delivers building construction, infrastructure, mechanical & piping, and electrical & instrument works for the oil & gas, oleochemical, and civil sectors across Indonesia.',
            heroViewProjects: 'View Projects',
            heroConsultation: 'Contact Us',
            clientsBadge: 'Trusted By',
            clientsTitle: 'Our Clients',
            servicesBadge: 'Core Solutions',
            servicesTitle: 'Continuous Quality Improvement',
            servicesAll: 'All Services',
            featuredBadge: 'Featured Works',
            featuredTitle: 'Selected Project Highlights',
            featuredCaseStudy: 'View All Projects',
            ctaTitle: 'Ready to Build?',
            ctaDesc: 'Connect with our engineering team to discuss your upcoming construction or industrial project. We serve clients in refinery, oleochemical, biodiesel, and civil infrastructure sectors.',
            ctaConsultation: 'Contact Us',
            ctaPortfolio: 'View Projects',
            completedLabel: 'Completed',
            ongoingLabel: 'Ongoing',
        },

        // Services
        services: {
            badge: 'Our Offerings',
            title: 'Continuous Quality Improvement',
            desc: 'We deliver building construction, infrastructure, mechanical & piping, and electrical & instrument services for industrial and civil sectors across Indonesia.',
            serviceRef: 'SERVICE REF:',
            techSpecs: 'SCOPE OF WORK',
            inquire: 'Inquire for Quote',
            metricsBadge: 'Quality & Compliance',
            metricsTitle: 'ISO-Certified Quality Standards',
            metricsDesc: 'All deployments are executed under ISO 9001, 14001, 45001, and 37001 management systems — covering quality, environment, safety, and anti-bribery governance.',
            fatalities: 'Fatalities Rate',
            emr: 'EMR Standard',
            iso: 'ISO Certified',
            hours: 'Years Operating',
        },

        // Projects
        projects: {
            badge: 'Project Portfolio',
            title: 'Project References',
            desc: 'Explore our portfolio of completed and ongoing projects in the process plant, refinery, oleochemical, biodiesel, and civil infrastructure sectors across Indonesia.',
            filterAll: 'All',
            filterLabels: {
                All: 'All',
                'Process Plant': 'Process Plant',
                'Civil & Architecture': 'Civil & Architecture',
                Ongoing: 'Ongoing',
            },
            noProjects: 'No Projects Found in this category',
            clientLabel: 'CLIENT',
            locationLabel: 'LOCATION',
            budgetLabel: 'CONTRACT:',
            statusCompleted: 'Completed',
            statusOngoing: 'Ongoing',
        },

        // About
        about: {
            badge: 'Corporate Identity',
            title: 'About PT. Berjaya Group',
            desc: 'Experienced general contractor specializing in building construction, infrastructure, mechanical & piping, and electrical & instrument works for industrial and civil sectors in Indonesia.',
            storyBadge: 'Est. 2008',
            storyTitle: 'Delivering Industrial & Civil Construction Across Indonesia',
            storyP1: 'PT. Berjaya Group is an experienced general contractor based in Medan, North Sumatra. Since 2008, we have delivered complex construction projects for leading clients in the oil & gas, oleochemical, refinery, and biodiesel sectors across Sumatera, Kalimantan, and other parts of Indonesia.',
            storyP2: 'Our four core service lines — Building Construction, Infrastructure, Mechanical & Piping, and Electrical & Instrument — are supported by ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, and ISO 37001:2016 certifications, and a fleet of owned heavy equipment operating from our 8,000 m² workshop facilities.',
            valuesBadge: 'Operating Standards',
            valuesTitle: 'Our Pillars of Work',
            values: [
                { title: 'Quality First', desc: 'Every project is executed under ISO 9001:2015 quality management protocols, from planning through commissioning and handover.' },
                { title: 'Safety & Environment', desc: 'We operate under ISO 45001:2018 (occupational safety) and ISO 14001:2015 (environmental management) standards on all project sites.' },
                { title: 'Integrity & Governance', desc: 'Our ISO 37001:2016 Anti-Bribery Management System ensures transparent, ethical procurement and contract execution on every engagement.' },
            ],
            officesBadge: 'Locations',
            officesTitle: 'Office & Workshop',
            addressLabel: 'Address',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            workshopLabel: 'Workshop',
            isoBadge: 'Certifications',
            isoTitle: 'ISO International Certifications',
            isoDesc: 'PT. Berjaya Group is fully audited and certified under international ISO standards, guaranteeing structural quality, environmental management, worker safety, and ethical corporate governance.',
            isoIssuedBy: 'Issued by',
            isoIssuer: 'ARS Assessment Private Limited',
            isoValidUntil: 'Valid Until',
            isoCertNo: 'Certificate No.',
            isoScope: 'Scope',
            isoScopeText: 'Provision of General Construction for Office Building, Industrial Building, Residential Building, Medical Building, Bridge, Flyover, Irrigation and Other Construction Works',
        },

        // Contact
        contact: {
            badge: 'Connect',
            title: 'Contact Us & Inquiries',
            desc: 'Submit a formal project inquiry using our structured multi-step portal. Your inquiry will be sent directly to WhatsApp and securely logged in our management portal.',
            officeInfo: 'Office Information',
            officeAddress: 'Head Office',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            websiteLabel: 'Website',
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
            placeholderFullName: 'Your Full Name',
            labelEmail: 'Corporate Email',
            placeholderEmail: 'email@company.com',
            labelOrg: 'Organization / Entity',
            placeholderOrg: 'Company Name',
            primarySector: 'Primary Sector',
            sectorLabels: ['Civil Works', 'Industrial / Process Plant', 'Mechanical & Piping', 'Electrical & Instrument'],
            budgetOptions: ['< Rp 5 Miliar', 'Rp 5M - Rp 50M', 'Rp 50M - Rp 200M', '> Rp 200 Miliar'],
            timelineOptions: ['Immediate', 'Planning Phase (2025)', 'Planning Phase (2026)', 'Request for Tender'],
            btnContinue: 'Continue',
            labelScope: 'Project Scope / Technical Specifications',
            placeholderScope: 'Describe the project scope, location, timeline, or technical requirements...',
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
`Hello PT. Berjaya Group,

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

        // Facilities
        facilities: {
            badge: 'Assets & Capabilities',
            title: 'Workshop & Equipment',
            desc: 'PT. Berjaya Group operates two owned workshop facilities with a total area of 8,000 m², supported by a comprehensive fleet of construction and heavy lifting equipment.',
            workshopBadge: 'Workshop Facilities',
            workshopTitle: 'Our Workshop',
            workshopDesc: 'Two owned workshop facilities totalling 8,000 m², operational since 2004. Used for equipment maintenance, steel fabrication, and project preparation.',
            workshopNote: '2 Units · 8,000 m² Total Area · Operational Since 2004 · Owned',
            equipmentBadge: 'Equipment Fleet',
            equipmentTitle: 'List of Equipment',
            equipmentDesc: 'All equipment is company-owned and maintained to ensure availability and reliability for every project.',
            colNo: 'No.',
            colName: 'Equipment',
            colQty: 'Qty',
            colCapacity: 'Capacity',
            colBrand: 'Brand / Type',
            colYear: 'Year',
            colStatus: 'Ownership',
        },

        // Footer
        footer: {
            tagline: 'General contractor for building construction, infrastructure, mechanical & piping, and electrical works for the industrial and civil sectors in Indonesia.',
            rights: 'All rights reserved.',
            isoBadge: 'ISO 9001 · 14001 · 45001 · 37001 Certified',
        },
    },

    id: {
        // Navbar
        nav: {
            home: 'Beranda',
            services: 'Layanan',
            projects: 'Proyek',
            projectsRef: 'Referensi Proyek',
            projectsOngoing: 'Proyek Berjalan',
            projectsFacilities: 'Workshop & Peralatan',
            about: 'Tentang Kami',
            aboutProfile: 'Profil Perusahaan',
            aboutIso: 'Sertifikasi ISO',
            contact: 'Kontak',
            cta: 'Minta Penawaran',
        },

        // Home
        home: {
            heroBadge: 'Bersertifikasi ISO 9001 · 14001 · 45001 · 37001',
            heroTitle: 'Keunggulan Konstruksi di Skala Industri',
            heroDesc: 'Berjaya Group mengerjakan building construction, infrastruktur, mechanical & piping, serta electrical & instrument untuk sektor oil & gas, oleokimia, dan sipil di seluruh Indonesia.',
            heroViewProjects: 'Lihat Proyek',
            heroConsultation: 'Hubungi Kami',
            clientsBadge: 'Dipercaya Oleh',
            clientsTitle: 'Klien Kami',
            servicesBadge: 'Layanan Utama',
            servicesTitle: 'Continuous Quality Improvement',
            servicesAll: 'Semua Layanan',
            featuredBadge: 'Karya Unggulan',
            featuredTitle: 'Proyek Pilihan',
            featuredCaseStudy: 'Lihat Semua Proyek',
            ctaTitle: 'Siap Membangun?',
            ctaDesc: 'Hubungi tim engineering kami untuk mendiskusikan proyek konstruksi atau industri Anda. Kami melayani klien di sektor refinery, oleokimia, biodiesel, dan infrastruktur sipil.',
            ctaConsultation: 'Hubungi Kami',
            ctaPortfolio: 'Lihat Proyek',
            completedLabel: 'Selesai',
            ongoingLabel: 'Berjalan',
        },

        // Services
        services: {
            badge: 'Penawaran Kami',
            title: 'Continuous Quality Improvement',
            desc: 'Kami menyediakan layanan building construction, infrastruktur sipil, mechanical & piping, serta electrical & instrument untuk sektor industri dan sipil di Indonesia.',
            serviceRef: 'REF LAYANAN:',
            techSpecs: 'LINGKUP PEKERJAAN',
            inquire: 'Minta Penawaran',
            metricsBadge: 'Kualitas & Kepatuhan',
            metricsTitle: 'Standar Kualitas Bersertifikasi ISO',
            metricsDesc: 'Semua proyek dilaksanakan di bawah sistem manajemen ISO 9001, 14001, 45001, dan 37001 — mencakup kualitas, lingkungan, keselamatan, dan tata kelola anti-penyuapan.',
            fatalities: 'Tingkat Fatalitas',
            emr: 'Standar EMR',
            iso: 'Bersertifikasi ISO',
            hours: 'Tahun Beroperasi',
        },

        // Projects
        projects: {
            badge: 'Portofolio Proyek',
            title: 'Referensi Proyek',
            desc: 'Jelajahi portofolio proyek selesai dan berjalan kami di sektor process plant, refinery, oleokimia, biodiesel, dan infrastruktur sipil di seluruh Indonesia.',
            filterAll: 'Semua',
            filterLabels: {
                All: 'Semua',
                'Process Plant': 'Process Plant',
                'Civil & Architecture': 'Sipil & Arsitektur',
                Ongoing: 'Berjalan',
            },
            noProjects: 'Tidak ada proyek ditemukan dalam kategori ini',
            clientLabel: 'KLIEN',
            locationLabel: 'LOKASI',
            budgetLabel: 'KONTRAK:',
            statusCompleted: 'Selesai',
            statusOngoing: 'Berjalan',
        },

        // About
        about: {
            badge: 'Identitas Perusahaan',
            title: 'Tentang PT. Berjaya Group',
            desc: 'Kontraktor umum berpengalaman yang bergerak di bidang building construction, infrastruktur, mechanical & piping, serta electrical & instrument untuk sektor industri dan sipil di Indonesia.',
            storyBadge: 'Est. 2008',
            storyTitle: 'Melayani Konstruksi Industri & Sipil di Seluruh Indonesia',
            storyP1: 'PT. Berjaya Group adalah kontraktor umum berpengalaman yang berbasis di Medan, Sumatera Utara. Sejak 2008, kami telah menyelesaikan proyek konstruksi kompleks untuk klien-klien terkemuka di sektor oil & gas, oleokimia, refinery, dan biodiesel di Sumatera, Kalimantan, dan wilayah lain di Indonesia.',
            storyP2: 'Empat lini layanan utama kami — Building Construction, Infrastruktur, Mechanical & Piping, dan Electrical & Instrument — didukung oleh sertifikasi ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, dan ISO 37001:2016, serta armada peralatan berat yang beroperasi dari fasilitas workshop seluas 8.000 m².',
            valuesBadge: 'Standar Operasi',
            valuesTitle: 'Pilar Kerja Kami',
            values: [
                { title: 'Kualitas Utama', desc: 'Setiap proyek dilaksanakan di bawah protokol manajemen mutu ISO 9001:2015, dari perencanaan hingga commissioning dan serah terima.' },
                { title: 'Keselamatan & Lingkungan', desc: 'Kami beroperasi di bawah standar ISO 45001:2018 (keselamatan kerja) dan ISO 14001:2015 (manajemen lingkungan) di seluruh lokasi proyek.' },
                { title: 'Integritas & Tata Kelola', desc: 'Sistem Manajemen Anti-Penyuapan ISO 37001:2016 kami memastikan pengadaan dan pelaksanaan kontrak yang transparan dan berintegritas.' },
            ],
            officesBadge: 'Lokasi',
            officesTitle: 'Kantor & Workshop',
            addressLabel: 'Alamat',
            phoneLabel: 'Telepon',
            emailLabel: 'Email',
            workshopLabel: 'Workshop',
            isoBadge: 'Sertifikasi',
            isoTitle: 'Sertifikasi Internasional ISO',
            isoDesc: 'PT. Berjaya Group telah diaudit secara resmi dan bersertifikat ISO internasional, menjamin kualitas struktur, pengelolaan lingkungan, keselamatan kerja, dan tata kelola perusahaan yang berintegritas.',
            isoIssuedBy: 'Diterbitkan oleh',
            isoIssuer: 'ARS Assessment Private Limited',
            isoValidUntil: 'Berlaku s.d.',
            isoCertNo: 'No. Sertifikat',
            isoScope: 'Ruang Lingkup',
            isoScopeText: 'Provision of General Construction for Office Building, Industrial Building, Residential Building, Medical Building, Bridge, Flyover, Irrigation and Other Construction Works',
        },

        // Contact
        contact: {
            badge: 'Hubungi Kami',
            title: 'Kontak & Pengajuan Proyek',
            desc: 'Ajukan inquiry proyek secara formal melalui portal multi-langkah kami. Inquiry Anda akan dikirim langsung ke WhatsApp dan tersimpan aman di portal manajemen kami.',
            officeInfo: 'Informasi Kantor',
            officeAddress: 'Kantor Pusat',
            phoneLabel: 'Telepon',
            emailLabel: 'Email',
            websiteLabel: 'Website',
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
            placeholderFullName: 'Nama Lengkap Anda',
            labelEmail: 'Email Perusahaan',
            placeholderEmail: 'email@perusahaan.com',
            labelOrg: 'Organisasi / Perusahaan',
            placeholderOrg: 'Nama Perusahaan',
            primarySector: 'Sektor Utama',
            sectorLabels: ['Pekerjaan Sipil', 'Industri / Process Plant', 'Mechanical & Piping', 'Electrical & Instrument'],
            budgetOptions: ['< Rp 5 Miliar', 'Rp 5M - Rp 50M', 'Rp 50M - Rp 200M', '> Rp 200 Miliar'],
            timelineOptions: ['Segera', 'Fase Perencanaan (2025)', 'Fase Perencanaan (2026)', 'Permintaan Tender'],
            btnContinue: 'Lanjut',
            labelScope: 'Ruang Lingkup Proyek / Spesifikasi Teknis',
            placeholderScope: 'Jelaskan lingkup proyek, lokasi, timeline, atau kebutuhan teknis...',
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
`Halo PT. Berjaya Group,

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

        // Facilities
        facilities: {
            badge: 'Aset & Kapabilitas',
            title: 'Workshop & Peralatan',
            desc: 'PT. Berjaya Group mengoperasikan dua fasilitas workshop dengan total luas 8.000 m², didukung armada peralatan konstruksi dan alat berat yang lengkap.',
            workshopBadge: 'Fasilitas Workshop',
            workshopTitle: 'Workshop Kami',
            workshopDesc: 'Dua unit workshop milik sendiri dengan total luas 8.000 m², beroperasi sejak 2004. Digunakan untuk perawatan peralatan, fabrikasi baja, dan persiapan proyek.',
            workshopNote: '2 Unit · Total 8.000 m² · Beroperasi Sejak 2004 · Milik Sendiri',
            equipmentBadge: 'Armada Peralatan',
            equipmentTitle: 'Daftar Peralatan',
            equipmentDesc: 'Seluruh peralatan merupakan milik perusahaan sendiri dan dirawat secara berkala untuk menjamin ketersediaan dan keandalan di setiap proyek.',
            colNo: 'No.',
            colName: 'Nama Alat',
            colQty: 'Jml',
            colCapacity: 'Kapasitas',
            colBrand: 'Merek / Type',
            colYear: 'Tahun',
            colStatus: 'Kepemilikan',
        },

        // Footer
        footer: {
            tagline: 'Kontraktor umum untuk building construction, infrastruktur, mechanical & piping, dan pekerjaan elektrikal untuk sektor industri dan sipil di Indonesia.',
            rights: 'Seluruh hak cipta dilindungi.',
            isoBadge: 'Bersertifikasi ISO 9001 · 14001 · 45001 · 37001',
        },
    },
};

// ─── Language Context ─────────────────────────────────────────────────────────
export const LangContext = createContext({ lang: 'en', setLang: () => {}, t: TRANSLATIONS.en });

export function useLang() {
    return useContext(LangContext);
}
