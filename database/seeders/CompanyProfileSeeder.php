<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CompanyProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@constructo.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('adminpassword'),
            ]
        );

        // 2. Seed Services
        $services = [
            [
                'service_id' => 'CE-01',
                'title' => 'Civil Infrastructure',
                'subtitle' => 'Complex Foundations & Mass Earthworks',
                'description' => 'Design and execution of large-scale infrastructure including highways, drainage systems, and structural foundations built for century-long durability.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnma3KgLRZ35vfGPz_aIq9D-AHr3h1D5MTD9NsYAkzSj4A2JO0RmPQdZVOwtzqbr-acNuA-NNErKf7YOvpPPxYkoutNsvTTeSwBBgVKzsZ2NMOSWfEidVVUv-JOdXUIdjEeGjzwRcRqplv4nuQDwSr-kl8kBuecCV8Rp099BuE8UPMKpCuj1yKmI1ILNZFnmUzK3qoTllA1DcPOr70E4sz9Cx4l7Jwq9jagKQG6pfcQhZuW-XjZlRULg',
                'category' => 'Infrastructure',
                'details' => ['Load Analysis', 'Materials Sourcing', 'Geotechnical Reports', 'Hydraulic Structures'],
            ],
            [
                'service_id' => 'CC-04',
                'title' => 'Commercial Construction',
                'subtitle' => 'High-Rise Structural Framing',
                'description' => 'Industrial and high-rise developments delivered with absolute structural integrity, seismic protection, and modern architectural precision.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3CodetbNt2uZc1lcRlKxo2quQrgguFsfz6uTH3DGVo-ZZEsgSZryJumvhwXa2kfE7dOKWrxcdjKJqa_QYZyNin9gq4Kpk6-lYVwTVe_Fu-p3eEHMLkFrWXg6IkFQbpxvokIxcu-dcUdL8RNbl0N2iIxO90U95GyDBu_jsQER26EIqb_rpFeBklIFWKoRphiyh84BUa4jgd4sZ4Vjxzi66_ElZY2Hu34Qciecf0aadwur0fR036-i9Bw',
                'category' => 'Commercial',
                'details' => ['Modular Systems', 'Seismic Retrofitting', 'Glass Panel Installation', 'External Bracing'],
            ],
            [
                'service_id' => 'SP-02',
                'title' => 'Sustainable Power',
                'subtitle' => 'Carbon-Neutral Turbine Bases',
                'description' => 'Pioneering the foundations for the green energy revolution through innovative turbine bases, wind farms, and carbon-neutral raw material mix.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD4zfzvT2vmn2n9pgydrxFqF_v-fo8oPA8a3gkgFNBUz6WVZBNDcfecfHU33rmKpHc7F2b5I4YoV8IxYcZD7epJkqaeBrayZOZ9qtz-JUzp_k1Pr5kbkpQBHFtX99h4m2GqGO_7loqb5A7MzsyA5FPGgv_vg2tnBsj-BI-OQtYwATV3EpuSQugiBIAjmbClMMjmCw2r63_ET8I1HWqXXzlRDgH7Y60L-2tFMh5KinMjDCQaZSEe7gFxg',
                'category' => 'Sustainability',
                'details' => ['Carbon-Neutral Mix', 'Life Cycle Safety', 'Turbine Foundations', 'Environmental Mitigation'],
            ],
            [
                'service_id' => 'PM-09',
                'title' => 'Project Management',
                'subtitle' => 'Safety Audits & Lifecycle Consulting',
                'description' => 'End-to-end lifecycle management ensuring safety compliance (EMR < 0.85), timeline adherence, feasibility studies, and budget optimization.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMP97oovj-nWtqU8mc7fv6E4NDnM8e99Nk1KM73LBXiOBtqvZLe-OOrQob8ZBVaJVmeNhPDFAqtHr3H3c62wgfBlNIV9R5HVi0KcCqHmcQT2ocQ2N2i24jHg_N7w0eMIXnPGk2eo6tbQByoIhSQcpsibKgBJxQsLzt70EFhYTAKaXfMtM2AffRhGDuRivf58j6WdA-QnvEGVvHiKUimf6UGgeaimJzJEvfY7SAEip71RZVfAvoI21PvA',
                'category' => 'Consulting',
                'details' => ['Feasibility Studies', 'Safety Auditing', 'ISO 9001 Compliance', 'Cost Estimation'],
            ]
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['service_id' => $srv['service_id']], $srv);
        }

        // 3. Seed Projects
        $projects = [
            [
                'title' => 'Nexus Refining Complex',
                'client' => 'Nexus Energy Group',
                'category' => 'Industrial',
                'completion_year' => 2024,
                'location' => 'Houston, TX',
                'budget' => '$85M',
                'description' => 'A state-of-the-art desaturated industrial refining facility featuring high-strength steel modular piping grids and storage infrastructure.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCses4KFuGPf0d_wy60TG7ksX8b0rPGFULtQLFU3PEiCyYMLovTwqB2gE1egK5VnJRVya-wfWSm7OxNVZuzuvYFcM12SSQJVw9FWQuEyN91VbvenQLFa_YdqZneYqyeBn-ocDDVnpb8il2S4zE6Un8VHvlA27oC6lkNU-lHT-xyESPq7-DtgNPmIQwXbmQ8DFpreJIyhY8642JwSe5N-QHjJGzlACHQYAbmAO-qaNIvntf2-_Y_VpK4Yg',
                'featured' => true,
            ],
            [
                'title' => 'The Apex HQ Tower',
                'client' => 'Apex Development Corp',
                'category' => 'Commercial',
                'completion_year' => 2023,
                'location' => 'Dubai, UAE',
                'budget' => '$120M',
                'description' => 'A towering glass and steel commercial skyscraper with unique external structural bracing systems and corporate interior layouts.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWikKhHJonAyzC9u9HlpaO_RwWDvZP9bgFHqMgVjkZ7p3uU3TYstczLNnOVV3TW4rcnotZ1EMEAcQvXQMAnfNr-M3ZNuCa-XKQC03D4gezjJthlWQK2rcqUJujSlSW9IPqUtzvs_q4vk-TzOut0amVXyVaNyuRhFEXEpqo1zIOB2xQ7lqq-XHCNF2EDLtw_8IW-Rw4TBJiypjZy77e2I_-CxVWNXeNA0zpOMTrtYoC8M4pw4G8ZtqMWQ',
                'featured' => true,
            ],
            [
                'title' => 'Hydra-II Reservoir Dam',
                'client' => 'Department of Water Resources',
                'category' => 'Civil',
                'completion_year' => 2022,
                'location' => 'Colorado, USA',
                'budget' => '$250M',
                'description' => 'A massive hydroelectric reservoir dam carved into a rugged mountain landscape with deep-seated rock anchors and concrete spillways.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHXDOqROqCqCC2P68DgEmC7NNKpsdqK4Hf76LExQw8NUryMWIWMLnWl-oRwuy0vsB5sXj9fSle8Y0HOyWJ6Gi74_3c3kfnk8Epqpx3OtVXGW3hd-ukc0e8IeIoO7A4cYJIZ7Bx9kSfyOO6Y20xVswjR7s1H9Ntt1UboPLzo6w4EraRAc5ZH_uCEE3L3-OVmvGRkxhT148qrhNcm8Fh-AZcTVrTz5hm_TNGBMCQwUtHDyqutu6Z3I4C1g',
                'featured' => true,
            ],
            [
                'title' => 'Omni Terminal T5',
                'client' => 'Port Authority',
                'category' => 'Commercial',
                'completion_year' => 2024,
                'location' => 'London, UK',
                'budget' => '$175M',
                'description' => 'A modern airport terminal wing featuring wave-like structural wooden ceilings and natural daylight glass panel walls.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2IBiGvd3FoNf-CGhWsWDyvuydzQotD4Yr0jhD-qFyGkMz6TiJNZlyfFYxtsz0C_Mctm-gYIJnc5EC0AdhDszyJdb7p42IJR89McbhrwE3VugquNECcsPzfm__5EY8N3CzzTuLtfW_O6xYm_BTvem6rMf7eYypMd_VgeFBiRVBFT9DXgpNEANP2fj-NaohzqOQ8DnyQt3inWBJQDuk01QZ9N8OliycEixMLWmmoPuz1zYHKOdtQo1Uhg',
                'featured' => false,
            ],
            [
                'title' => 'Alpha Distribution Hub',
                'client' => 'Alpha Logistics Group',
                'category' => 'Industrial',
                'completion_year' => 2023,
                'location' => 'Chicago, IL',
                'budget' => '$45M',
                'description' => 'Detailed warehouse structure built with advanced high-tensile steel frame members and a fully automated sorting floor layout.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWg-YWVj1QZF5qCNFFGPAQ0D3KaCuUsyq0BBGG0k5u2dbv18poFMEfqZPMqE_CTQgdwHQeDzkZJsJEVFaBqOrp05sRET-n0UYfplKY7b1TrFzgkwwQotkFq0ISM0MYz5ajIrTVRriwag73S0RKO4sRQBJ3aVMZLs4F8JEdqqopYmEpTp9F9pwldaAkT0ZCEv8y1aNIEpX1lb6ld5_iFV5z87yr_oj6SksPFUxPntDDE9uYi7DKGpWHBA',
                'featured' => false,
            ],
            [
                'title' => 'Metro Rail Overpass',
                'client' => 'City Transit Authority',
                'category' => 'Civil',
                'completion_year' => 2024,
                'location' => 'Seattle, WA',
                'budget' => '$65M',
                'description' => 'An illuminated high-speed rail overpass system utilizing pre-cast prestressed concrete beams and seismic safety supports.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5t2dU58AWZOza-s3HRxCB00UrlWVQr3KZi66Yj0i7hpBU-npjBPvo2DrJZI4WTkWbhsHMN1KFXsteX4O1Xi6IJRnSSo5LZnhuKQtnmfkQ5iI4x-cw8iQvpDUb2Cqcldbt7sf4CqC3z6N3OnPjGl0CG3N6yXOPU0xckEIy5B8HTjMUirJnUCbMNuCMRk43DvpxsBsOMHESDrPtRq5KtXc7gWa4acI20ZlJePYP-yQOArRlntM7tWzq3Q',
                'featured' => false,
            ]
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['title' => $proj['title']], $proj);
        }
    }
}
