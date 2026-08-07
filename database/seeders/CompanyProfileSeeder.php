<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;

class CompanyProfileSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@berjayagroup.co.id'],
            [
                'name'     => 'Administrator',
                'password' => Hash::make('adminberjaya2024'),
            ]
        );

        // 2. Seed Services — 4 Layanan Riil PT. Berjaya Group
        Service::truncate();
        $services = [
            [
                'service_id'  => 'BC-01',
                'title'       => 'Building Construction',
                'subtitle'    => 'Office, Industrial, Residential & Medical Building',
                'description' => 'Konstruksi bangunan gedung untuk kebutuhan perkantoran, industri, hunian, dan fasilitas medis.',
                'image_url'   => null, // TODO: ganti dengan foto proyek riil dari Company Profile PDF
                'category'    => 'Building',
                'details'     => ['Office Building', 'Industrial Building', 'Residential Building', 'Medical Building'],
            ],
            [
                'service_id'  => 'IC-02',
                'title'       => 'Infrastructure Construction',
                'subtitle'    => 'Roads, Bridges, Flyover & Irrigation',
                'description' => 'Pembangunan infrastruktur sipil skala besar termasuk jalan, jembatan, flyover, dan irigasi.',
                'image_url'   => null, // TODO: ganti dengan foto proyek riil dari Company Profile PDF
                'category'    => 'Infrastructure',
                'details'     => ['Bridge & Flyover', 'Irrigation', 'Road Construction', 'Earthworks'],
            ],
            [
                'service_id'  => 'MP-03',
                'title'       => 'Mechanical & Piping',
                'subtitle'    => 'Process Plant Piping & Equipment Installation',
                'description' => 'Instalasi mekanikal dan perpipaan untuk fasilitas proses industri seperti refinery, biodiesel, dan oleochemical plant.',
                'image_url'   => null, // TODO: ganti dengan foto proyek riil dari Company Profile PDF
                'category'    => 'Mechanical',
                'details'     => ['Piping Installation', 'Equipment Erection', 'Tank Fabrication', 'Storage Tank Construction'],
            ],
            [
                'service_id'  => 'EI-04',
                'title'       => 'Electrical & Instrument',
                'subtitle'    => 'Electrical Works & Instrumentation',
                'description' => 'Instalasi kelistrikan dan instrumentasi untuk gedung dan fasilitas proses industri.',
                'image_url'   => null, // TODO: ganti dengan foto proyek riil dari Company Profile PDF
                'category'    => 'Electrical',
                'details'     => ['Electrical Installation', 'Instrumentation', 'Panel & Control System', 'Testing & Commissioning'],
            ],
        ];

        foreach ($services as $srv) {
            Service::create($srv);
        }

        // 3. Seed Projects — Data Riil PT. Berjaya Group
        //    featured = true untuk 6 proyek highlight di homepage
        //    image_url = null semua (TODO: upload foto asli dari Company Profile PDF)
        Project::truncate();
        $projects = [
            // ── Kategori: Process Plant — Status: completed ──────────────────
            [
                'title'           => 'Pekerjaan Methyl Ester Distilation Plant (Berikut Addendum)',
                'client'          => 'PT. Cemerlang Energi Perkasa',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Kec. Sungai Sembilan, Dumai',
                'budget'          => 'Rp 8.396.500.000',
                'description'     => 'Pekerjaan Methyl Ester Distilation Plant beserta addendum pekerjaan terkait.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pekerjaan Equipment 600MTD Biodiesel Destilation Plant (Berikut Addendum)',
                'client'          => 'PT. Cemerlang Energi Perkasa',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 2.990.000.000',
                'description'     => 'Pekerjaan Equipment 600MTD Biodiesel Destilation Plant beserta addendum pekerjaan terkait.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pekerjaan KCP Expantion for 12 Expeller (Berikut Addendum)',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 4.216.000.000',
                'description'     => 'Pekerjaan KCP Expantion for 12 Expeller beserta addendum pekerjaan terkait.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pekerjaan Relokasi Panel KCP',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 1.000.000.000',
                'description'     => 'Pekerjaan Relokasi Panel KCP.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pekerjaan New Conveyor Panel',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 1.350.000.000',
                'description'     => 'Pekerjaan New Conveyor Panel.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'PK Unloading & Support Conveyor and 7 CPO Unloading Pit for CPO Truck Discharge',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2016,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 35.913.000.000',
                'description'     => 'PK Unloading & Support Conveyor dan 7 CPO Unloading Pit untuk CPO Truck Discharge.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Coal Shed Extension Building',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2017,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 20.500.000.000',
                'description'     => 'Pembangunan perluasan bangunan Coal Shed.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Refinery & Fractination 1500 TPD Phase II',
                'client'          => 'PT. Kutai Refinery Nusantara',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2017,
                'location'        => 'Jl. Teluk Waru, Kariangau, Balikpapan Barat',
                'budget'          => 'Rp 57.750.000.000',
                'description'     => 'Pembangunan Refinery & Fractionation 1500 TPD Phase II.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: proyek refinery besar Balikpapan
            ],
            [
                'title'           => 'Distillation Glycerine Plant Tankfarm, Plant Building and MEI Plant',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2018,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 93.109.000.000',
                'description'     => 'Pembangunan Distillation Glycerine Plant Tankfarm, Plant Building, dan MEI Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: nilai kontrak terbesar 2018
            ],
            [
                'title'           => 'OSBL Piping Works Washing Plant',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2018,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 7.000.000.000',
                'description'     => 'OSBL Piping Works Washing Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'WWTP Upgrading Plant',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2018,
                'location'        => 'Jl. Teluk Waru, Balikpapan Barat',
                'budget'          => 'Rp 10.000.000.000',
                'description'     => 'WWTP Upgrading Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'PRC Refinery Main Building',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2019,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 55.000.000.000',
                'description'     => 'Pembangunan Main Building PRC Refinery.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: proyek refinery Padang
            ],
            [
                'title'           => 'M&EI Installation ISBL & OSBL for Second SG Removal Plant',
                'client'          => 'PT. Cemerlang Energi Perkasa',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2019,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 3.750.000.000',
                'description'     => 'Instalasi M&EI ISBL & OSBL untuk Second SG Removal Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'PRC Biodiesel Main Building',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 46.750.000.000',
                'description'     => 'Pembangunan Main Building PRC Biodiesel.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => '6 Units Storage Tanks',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 4.510.000.000',
                'description'     => 'Fabrikasi dan ereksi 6 unit Storage Tanks.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Insulation Works Storage Tank CL 80',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 10.065.000.000',
                'description'     => 'Insulation Works Storage Tank CL 80.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Rekonstruksi Tangki 3000 SDO',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 5.251.488.000',
                'description'     => 'Rekonstruksi Tangki 3000 SDO.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'TF 87 (3 x 5000 MT MS Tank Fab & Erection)',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 13.970.000.000',
                'description'     => 'Fabrikasi dan ereksi 3 x 5000 MT MS Tank Farm 87.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pekerjaan 1200TPD Fractionation Building',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 27.772.274.860',
                'description'     => 'Pembangunan 1200TPD Fractionation Building.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'HPS Plant Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 10.752.500.000',
                'description'     => 'HPS Plant Construction.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Sludge Recycle System (WWTP)',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 550.000.000',
                'description'     => 'Pembangunan Sludge Recycle System (WWTP).',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Dismantle & Re-build Facilities of Pelindo',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 188.034.000',
                'description'     => 'Pembongkaran dan pembangunan ulang fasilitas Pelindo.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pek 1x6000 MT CS Tank Fab & Erection TF 44',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 2.957.900.000',
                'description'     => 'Fabrikasi dan ereksi 1x6000 MT CS Tank Farm 44.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Insulation for CG-RG Tank CL-87',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 1.790.800.000',
                'description'     => 'Insulation for CG-RG Tank CL-87.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Olein Tank 2x25MT Relocations Packing Plant',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 1.931.600.000',
                'description'     => 'Relokasi Olein Tank 2x25MT untuk Packing Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Oleic Acid Plant Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 15.180.000.000',
                'description'     => 'Pembangunan Oleic Acid Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Construction 201 Batch Hydrogenation Plant and Equipment Unloading',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 22.915.000.000',
                'description'     => 'Pembangunan 201 Batch Hydrogenation Plant dan Equipment Unloading.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Splitting Column Unloading & Erection, and Splitting Plant & Boiler House Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 45.340.000.000',
                'description'     => 'Splitting Column Unloading & Erection, serta pembangunan Splitting Plant & Boiler House.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Civil & MEI Works for 2x5000MT Tanks',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 23.679.000.000',
                'description'     => 'Civil & MEI Works untuk 2x5000MT Tanks.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Civil, Piping, Electrical Works for New Desalination Plant 1x110 m3/hr',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 30.500.000.000',
                'description'     => 'Civil, Piping, Electrical Works untuk New Desalination Plant 1x110 m3/hr.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Drop Tanks of Kumai',
                'client'          => 'PT. Calang Sejati Indah',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Kumai, Pangkalan Bun',
                'budget'          => 'Rp 25.952.000.000',
                'description'     => 'Drop Tanks of Kumai.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => '1000 Dry Fract Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 15.151.500.000',
                'description'     => '1000 Dry Fract Construction.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Steel Fabrication and Erection Tank Farm Cluster A-SDO',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 20.300.000.000',
                'description'     => 'Steel Fabrication and Erection Tank Farm Cluster A-SDO.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Structure and Architectural SCD-CIE Plant - SDO',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 49.250.000.000',
                'description'     => 'Structure and Architectural SCD-CIE Plant - SDO.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Piperack D&E Lauric Ref & Fract Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2023,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 10.872.000.000',
                'description'     => 'Piperack D&E Lauric Ref & Fract Construction.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'H2 Plant Construction',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Process Plant',
                'status'          => 'completed',
                'completion_year' => 2023,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 15.828.000.000',
                'description'     => 'H2 Plant Construction.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],

            // ── Kategori: Civil & Architecture — Status: completed ───────────
            [
                'title'           => 'Main Office Project',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2014,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 12.300.000.000',
                'description'     => 'Pembangunan Main Office Project.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Pembangunan Mess 20 Unit, Add Mess dan Guest House',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2015,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 72.550.000.000',
                'description'     => 'Pembangunan Mess 20 Unit, penambahan Mess, dan Guest House.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: proyek skala besar 2015
            ],
            [
                'title'           => 'Civil & ME Works for Jerry Can',
                'client'          => 'PT. Sari Dumai Sejati',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2020,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 3.520.000.000',
                'description'     => 'Civil & ME Works untuk Jerry Can.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Galian-Timbunan & Retaining Wall, Piling Driving dan Civil & MEI Works',
                'client'          => 'PT. Calang Sejati Indah',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2020,
                'location'        => 'Palangkaraya',
                'budget'          => 'Rp 86.388.350.000',
                'description'     => 'Galian-Timbunan & Retaining Wall, Piling Driving, dan Civil & MEI Works.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: proyek Palangkaraya 2020
            ],
            [
                'title'           => 'Warehouse Extension',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 38.505.499.407',
                'description'     => 'Perluasan Warehouse.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Relocated Bio Diesel Infrastructure & Ancillaries',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 32.010.000.000',
                'description'     => 'Relokasi Bio Diesel Infrastructure & Ancillaries.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Fence & Land Filling for Biodiesel 1000T',
                'client'          => 'PT. Padang Raya Cakrawala',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Teluk Bayur, Padang',
                'budget'          => 'Rp 8.195.000.000',
                'description'     => 'Fence & Land Filling untuk Biodiesel 1000T.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Construction Oleo Warehouse 2',
                'client'          => 'PT. Sari Dumai Oleo',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2021,
                'location'        => 'Desa Lubuk Gaung, Dumai',
                'budget'          => 'Rp 46.200.000.000',
                'description'     => 'Pembangunan Oleo Warehouse 2.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Slope Protection & Civil Infrastructure',
                'client'          => 'PT. Kutai Refinery Nusantara',
                'category'        => 'Civil & Architecture',
                'status'          => 'completed',
                'completion_year' => 2022,
                'location'        => 'Kariangau, Balikpapan Barat',
                'budget'          => 'Rp 32.450.000.000',
                'description'     => 'Slope Protection & Civil Infrastructure.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],

            // ── Proyek Berjalan (Ongoing) — Tahun 2024 ──────────────────────
            [
                'title'           => 'Civil dan Steel Structure untuk Tank SS BSO 1200 MT',
                'client'          => 'PT. Wilmar Bioenergi Indonesia',
                'category'        => 'Process Plant',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Pelintung, Dumai',
                'budget'          => 'Rp 3.639.690.000',
                'description'     => 'Civil dan Steel Structure untuk Tank SS BSO 1200 MT.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Building for the 2000MT Refinery & 1500MT Fractionation Plant',
                'client'          => 'PT. Pacific Bio Industry',
                'category'        => 'Process Plant',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Kijing Port, Mempawah, Kalimantan Barat',
                'budget'          => 'Rp 76.035.000.000',
                'description'     => 'Pembangunan Building untuk 2000MT Refinery & 1500MT Fractionation Plant.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => true,  // Featured: proyek terbaru/ongoing nilai terbesar
            ],
            [
                'title'           => 'Utility Building for 20MT High Pressure & 15MT Low Pressure Boilers and 1500KW',
                'client'          => 'PT. Pacific Bio Industry',
                'category'        => 'Process Plant',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Kijing Port, Mempawah, Kalimantan Barat',
                'budget'          => 'Rp 24.420.000.000',
                'description'     => 'Pembangunan Utility Building untuk 20MT High Pressure & 15MT Low Pressure Boilers dan 1500KW.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Construction of Belasching Earth, Spare Parts & Mechanical Workshop Building',
                'client'          => 'PT. Pacific Bio Industry',
                'category'        => 'Civil & Architecture',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Kijing Port, Mempawah, Kalimantan Barat',
                'budget'          => 'Rp 11.000.000.000',
                'description'     => 'Pembangunan Belasching Earth, Spare Parts & Mechanical Workshop Building.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Construction of Main Office, Canteen, Mosque, Weigh Bridge 60T (2 Unit), Weight Bridge Operator, Security Office, Custom Room and Piperack',
                'client'          => 'PT. Pacific Bio Industry',
                'category'        => 'Civil & Architecture',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Kijing Port, Mempawah, Kalimantan Barat',
                'budget'          => 'Rp 27.417.000.000',
                'description'     => 'Pembangunan Main Office, Canteen, Mosque, Weigh Bridge 60T (2 Unit), Weight Bridge Operator, Security Office, Custom Room, dan Piperack.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
            [
                'title'           => 'Construction of Roads and Drainage',
                'client'          => 'PT. Pacific Bio Industry',
                'category'        => 'Civil & Architecture',
                'status'          => 'ongoing',
                'completion_year' => 2024,
                'location'        => 'Kijing Port, Mempawah, Kalimantan Barat',
                'budget'          => 'Rp 24.495.000.000',
                'description'     => 'Construction of Roads and Drainage.',
                'image_url'       => null, // TODO: ganti foto proyek asli dari Company Profile PDF
                'featured'        => false,
            ],
        ];

        foreach ($projects as $proj) {
            Project::create($proj);
        }

        // Invalidate project cache
        Cache::forget('projects:all');

        // 4. Seed Clients — Data Riil PT. Berjaya Group dengan Logo
        Client::truncate();
        $clients = [
            ['name' => 'Bank Indonesia (BI)',                                                   'logo_url' => '/clients/BI.webp',        'order' => 1],
            ['name' => 'PT Adhi Karya (Persero) Tbk',                                           'logo_url' => '/clients/adhikarya.webp', 'order' => 2],
            ['name' => 'Asian Agri',                                                            'logo_url' => '/clients/asianagri.webp', 'order' => 3],
            ['name' => 'Apical Group',                                                          'logo_url' => '/clients/apical.webp',    'order' => 4],
            ['name' => 'Wilmar International',                                                  'logo_url' => '/clients/wilmar.webp',    'order' => 5],
            ['name' => 'PT Pacific Indopalm Industries',                                        'logo_url' => '/clients/indopalm.webp',  'order' => 6],
            ['name' => 'PT Riau Andalan Pulp and Paper (RAPP)',                                 'logo_url' => '/clients/rapp.webp',      'order' => 7],
            ['name' => 'PT Kutai Refinery Nusantara',                                           'logo_url' => '/clients/kutai.webp',     'order' => 8],
            ['name' => 'Sinar Mas Oleochemical',                                                'logo_url' => '/clients/sinarmas.webp',  'order' => 9],
            ['name' => 'Kuala Lumpur Kepong Berhad (KLK)',                                      'logo_url' => '/clients/klk.webp',       'order' => 10],
            ['name' => 'Yayasan Pendidikan Gajah Mada Indonesia (YPGMI / Sekolah Panca Budi)',  'logo_url' => '/clients/ypgmi.webp',     'order' => 11],
            ['name' => 'Tunas Harapan indo plantations (TH)',                                   'logo_url' => '/clients/TH.webp',        'order' => 12],
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }

        Cache::forget('clients:all');
    }
}
