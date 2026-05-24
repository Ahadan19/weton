// ===================================================================
// PRIMBON WETON CALCULATOR
// Berdasarkan Kitab Primbon Betaljemur Adammakna
// ===================================================================

// ===== CONSTANTS =====
const HARI_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN_NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

// Referensi: 17 Agustus 1945 = Jumat Legi (terverifikasi secara historis)
const REFERENCE_DATE = new Date(1945, 7, 17); // Aug 17, 1945

// Nilai Neptu Hari (Saptawara)
const NEPTU_HARI = {
  'Minggu': 5,
  'Senin': 4,
  'Selasa': 3,
  'Rabu': 7,
  'Kamis': 8,
  'Jumat': 6,
  'Sabtu': 9
};

// Nilai Neptu Pasaran (Pancawara)
const NEPTU_PASARAN = {
  'Legi': 5,
  'Pahing': 9,
  'Pon': 7,
  'Wage': 4,
  'Kliwon': 8
};

// ===== WATAK / KARAKTER WETON (35 kombinasi) =====
const WATAK_WETON = {
  'Minggu Legi': {
    watak: 'Berjiwa pemimpin yang murah hati',
    desc: 'Memiliki jiwa kepemimpinan alami dan suka menolong sesama. Hatinya dermawan, namun terkadang terlalu percaya pada orang lain. Rezeki datang dari banyak arah berkat kebaikan hatinya. Pandai bergaul dan mudah disenangi oleh lingkungan sekitar.'
  },
  'Minggu Pahing': {
    watak: 'Teguh pendirian dan berwibawa',
    desc: 'Pribadi yang kokoh dan tidak mudah terpengaruh. Memiliki kewibawaan alami yang membuat orang lain segan. Berambisi tinggi dalam mengejar cita-cita dan tidak mudah menyerah. Namun perlu berhati-hati agar tidak terkesan angkuh.'
  },
  'Minggu Pon': {
    watak: 'Cerdas, kreatif, dan penuh ide',
    desc: 'Dianugerahi kecerdasan dan daya cipta yang tinggi. Pandai berbicara dan mampu meyakinkan orang lain. Memiliki banyak ide dan rencana, namun perlu konsistensi dalam menjalankannya. Cocok dalam bidang seni, bisnis, dan komunikasi.'
  },
  'Minggu Wage': {
    watak: 'Sederhana, sabar, dan tekun',
    desc: 'Memiliki kesabaran yang luar biasa dan selalu bersyukur dengan apa yang dimiliki. Hidupnya tenang dan jarang terlibat konflik. Meski lambat dalam meraih sukses, hasilnya akan bertahan lama. Pribadi yang setia dalam persahabatan maupun percintaan.'
  },
  'Minggu Kliwon': {
    watak: 'Batin kuat dan berwawasan luas',
    desc: 'Memiliki kepekaan batin yang tajam dan wawasan spiritual yang mendalam. Sering menjadi tempat bertanya bagi orang-orang di sekitarnya. Dianugerahi kemampuan memahami hal-hal yang tidak kasat mata. Hidupnya penuh dengan pengalaman batin yang bermakna.'
  },
  'Senin Legi': {
    watak: 'Lembut hati dan penyayang',
    desc: 'Pribadi yang halus budi pekertinya dan penuh kasih sayang. Mudah berempati terhadap penderitaan orang lain. Disenangi banyak orang karena ketulusan hatinya. Namun terkadang terlalu sensitif terhadap perkataan orang lain.'
  },
  'Senin Pahing': {
    watak: 'Ambisius dan pekerja keras',
    desc: 'Memiliki semangat juang yang tinggi dan tidak pernah puas dengan pencapaian. Selalu berusaha menjadi yang terbaik dalam segala hal. Pandai mengatur strategi dan berani mengambil risiko. Perlu keseimbangan antara ambisi dan kehidupan pribadi.'
  },
  'Senin Pon': {
    watak: 'Ramah, supel, dan diplomatik',
    desc: 'Pribadi yang sangat pandai bergaul dan mampu menjadi penengah dalam konflik. Memiliki kemampuan komunikasi yang baik dan selalu bisa mencairkan suasana. Rezeki sering datang dari jaringan pertemanan yang luas. Cocok menjadi pemimpin yang merangkul semua pihak.'
  },
  'Senin Wage': {
    watak: 'Pendiam namun bijaksana',
    desc: 'Tidak banyak bicara namun setiap perkataannya penuh makna dan kebijaksanaan. Lebih suka bekerja di belakang layar namun kontribusinya sangat besar. Memiliki ketenangan yang membuat orang lain merasa nyaman. Setia dan dapat diandalkan dalam segala situasi.'
  },
  'Senin Kliwon': {
    watak: 'Peka spiritual dan berkarisma',
    desc: 'Memiliki aura kharisma yang kuat dan sering menjadi pusat perhatian tanpa disengaja. Kepekaan batinnya sangat tajam, mampu merasakan energi di sekitarnya. Sering mengalami firasat yang terbukti benar. Cocok mendalami ilmu kebatinan atau bidang spiritual.'
  },
  'Selasa Legi': {
    watak: 'Berani, tegas, dan berjiwa ksatria',
    desc: 'Memiliki keberanian yang luar biasa dan selalu siap membela kebenaran. Tegas dalam mengambil keputusan dan bertanggung jawab atas setiap tindakannya. Berjiwa ksatria yang melindungi orang-orang yang disayangi. Perlu mengendalikan emosi agar tidak terlalu impulsif.'
  },
  'Selasa Pahing': {
    watak: 'Kuat tekad dan pantang menyerah',
    desc: 'Seperti baja yang ditempa, semakin besar cobaan semakin kuat mentalnya. Memiliki tekad baja yang sulit digoyahkan. Meski sering menghadapi rintangan, selalu bangkit dan menemukan jalan keluar. Sangat cocok menjadi perintis atau wirausahawan.'
  },
  'Selasa Pon': {
    watak: 'Enerjik, aktif, dan serba bisa',
    desc: 'Memiliki energi yang meluap-luap dan selalu ingin mencoba hal baru. Multitalenta dan cepat belajar dalam berbagai bidang. Tidak suka monoton dan selalu mencari tantangan. Perlu fokus agar energinya terarah pada hal yang produktif.'
  },
  'Selasa Wage': {
    watak: 'Tangguh namun rendah hati',
    desc: 'Kekuatannya tersembunyi di balik penampilannya yang sederhana. Tidak suka memamerkan kemampuan namun akan menunjukkannya saat dibutuhkan. Sabar dalam menghadapi cobaan dan bijak dalam bertindak. Rezekinya mengalir dari kerja keras yang tekun.'
  },
  'Selasa Kliwon': {
    watak: 'Pemberani dengan intuisi tajam',
    desc: 'Gabungan antara keberanian fisik dan kekuatan batin yang sempurna. Sering mengambil keputusan berdasarkan intuisi dan jarang salah. Memiliki daya pikat yang misterius bagi orang-orang di sekitarnya. Cocok menjadi pemimpin yang visioner dan inspiratif.'
  },
  'Rabu Legi': {
    watak: 'Cerdik, luwes, dan penuh pesona',
    desc: 'Memiliki kecerdasan yang tajam dan kemampuan beradaptasi yang luar biasa. Pandai membaca situasi dan memanfaatkan peluang. Pesonanya memikat dan mudah mendapatkan simpati orang lain. Rezeki datang dari kemampuan bernegosiasi dan berkreasi.'
  },
  'Rabu Pahing': {
    watak: 'Analitis, kritis, dan perfeksionis',
    desc: 'Memiliki kemampuan analisa yang sangat tajam dan tidak mudah tertipu. Selalu mencari kesempurnaan dalam setiap pekerjaan. Berpikir logis dan sistematis sehingga jarang membuat kesalahan. Namun perlu lebih fleksibel agar tidak terlalu kaku.'
  },
  'Rabu Pon': {
    watak: 'Komunikatif dan berjiwa sosial tinggi',
    desc: 'Sangat pandai berkomunikasi dan memiliki jaringan pertemanan yang sangat luas. Selalu aktif dalam kegiatan sosial dan senang membantu sesama. Memiliki kemampuan memimpin yang baik karena dekat dengan semua kalangan. Rezeki sering datang dari kolaborasi dan kerjasama.'
  },
  'Rabu Wage': {
    watak: 'Bijaksana dan berhati tulus',
    desc: 'Memiliki kebijaksanaan yang melampaui usianya. Berhati tulus dan tidak pernah memiliki niat buruk terhadap siapapun. Sering menjadi penasihat yang dipercaya oleh keluarga dan teman-temannya. Hidupnya sederhana namun penuh kedamaian batin.'
  },
  'Rabu Kliwon': {
    watak: 'Misterius, cerdas, dan berpengaruh',
    desc: 'Memiliki aura misterius yang membuat orang lain penasaran. Kecerdasannya luar biasa dan sering memiliki pemikiran yang visioner. Pengaruhnya sangat besar terhadap lingkungan sekitar meski tidak banyak berbicara. Memiliki hubungan kuat dengan dimensi spiritual.'
  },
  'Kamis Legi': {
    watak: 'Mulia, dermawan, dan berwibawa',
    desc: 'Memiliki sifat kemuliaan yang terpancar dari setiap tindakannya. Dermawan dan senang berbagi ilmu maupun rezeki. Berwibawa di hadapan orang lain dan sering dijadikan panutan. Hidupnya diberkahi dengan kemudahan rezeki dan keluarga yang harmonis.'
  },
  'Kamis Pahing': {
    watak: 'Tegas, disiplin, dan berprinsip',
    desc: 'Pribadi yang sangat teguh pada prinsip dan aturan. Disiplin tinggi dalam menjalankan setiap tanggung jawabnya. Tidak mudah kompromi dalam hal yang diyakininya benar. Cocok menjadi pemimpin yang tegas dan adil dalam segala situasi.'
  },
  'Kamis Pon': {
    watak: 'Murah hati dan banyak relasi',
    desc: 'Memiliki kemurahan hati yang dipadukan dengan kemampuan bersosialisasi yang tinggi. Mudah mendapatkan kepercayaan orang lain dan sering dimintai tolong. Rezekinya berlimpah karena banyaknya jalan yang terbuka melalui relasi. Hidup penuh dengan persahabatan yang bermakna.'
  },
  'Kamis Wage': {
    watak: 'Sabar, tabah, dan penuh pertimbangan',
    desc: 'Tidak pernah terburu-buru dalam mengambil keputusan. Selalu mempertimbangkan segala sesuatu dengan matang sebelum bertindak. Kesabarannya adalah kekuatan terbesarnya dalam menghadapi cobaan hidup. Meski lambat, pencapaiannya selalu kokoh dan bertahan lama.'
  },
  'Kamis Kliwon': {
    watak: 'Agung, berwibawa, dan bersahaja',
    desc: 'Memiliki keagungan jiwa yang terpancar secara alami. Sangat dihormati dan disegani tanpa perlu memaksakan kehendak. Spiritualitasnya tinggi dan sering mendapat bisikan batin yang benar. Hidupnya menjadi teladan bagi banyak orang di sekitarnya.'
  },
  'Jumat Legi': {
    watak: 'Penuh berkah dan disukai banyak orang',
    desc: 'Hidupnya seolah selalu dilimpahi berkah dari segala penjuru. Pribadinya menyenangkan dan mudah disukai oleh semua kalangan. Memiliki rezeki yang datang dengan mudah tanpa perlu bersusah payah. Kehadiranya membawa ketenangan dan kebahagiaan bagi orang-orang di sekitarnya.'
  },
  'Jumat Pahing': {
    watak: 'Berwibawa, tegas, namun adil',
    desc: 'Memiliki wibawa alami yang membuat orang lain hormat dan segan. Tegas dalam setiap keputusan namun selalu mengedepankan keadilan. Dipercaya menjadi pemimpin karena kemampuannya menyeimbangkan ketegasan dan kelembutan. Rezekinya datang dari posisi dan jabatan yang diamanahkan.'
  },
  'Jumat Pon': {
    watak: 'Pandai bicara dan berpengaruh',
    desc: 'Memiliki kemampuan retorika yang sangat baik dan mampu mempengaruhi banyak orang. Setiap perkataannya memiliki bobot dan didengarkan. Pandai bernegosiasi dan sering menjadi penengah yang efektif. Cocok berkarir di bidang politik, hukum, atau diplomasi.'
  },
  'Jumat Wage': {
    watak: 'Tenang, bijak, dan penuh pengertian',
    desc: 'Pribadinya sangat tenang dan tidak mudah terprovokasi. Memiliki kebijaksanaan dalam menyikapi segala masalah kehidupan. Penuh pengertian terhadap pasangan dan keluarga. Hidupnya damai karena selalu mengutamakan keharmonisan di atas segalanya.'
  },
  'Jumat Kliwon': {
    watak: 'Karismatik dan memiliki kekuatan batin',
    desc: 'Hari kelahiran yang sangat istimewa dalam tradisi Jawa. Memiliki kharisma yang sangat kuat dan sering menjadi pemimpin alami. Kekuatan batinnya menonjol dan sering mengalami pengalaman spiritual yang luar biasa. Hidupnya penuh dengan peristiwa-peristiwa yang bermakna mendalam.'
  },
  'Sabtu Legi': {
    watak: 'Gigih, ulet, dan penuh perhitungan',
    desc: 'Tidak pernah setengah-setengah dalam mengerjakan sesuatu. Selalu penuh perhitungan dan jarang mengambil langkah yang ceroboh. Keuletannya menjadi modal utama dalam meraih kesuksesan. Meski prosesnya panjang, hasilnya selalu memuaskan dan berlimpah.'
  },
  'Sabtu Pahing': {
    watak: 'Kuat, tangguh, dan berpendirian kokoh',
    desc: 'Memiliki kekuatan fisik dan mental yang luar biasa. Tidak mudah goyah oleh godaan maupun tekanan dari luar. Berpendirian sangat kokoh dan selalu konsisten dengan apa yang diyakininya. Cocok menjadi benteng pertahanan bagi keluarga dan orang-orang terdekat.'
  },
  'Sabtu Pon': {
    watak: 'Pandai, terampil, dan berdaya cipta',
    desc: 'Memiliki kepandaian yang disertai keterampilan tangan yang baik. Mampu menghasilkan karya-karya yang bernilai tinggi. Kreatif dalam menyelesaikan masalah dan selalu menemukan solusi yang unik. Rezekinya datang dari hasil kreativitas dan keterampilan yang dimilikinya.'
  },
  'Sabtu Wage': {
    watak: 'Hemat, cermat, dan pengelola yang baik',
    desc: 'Sangat pandai mengelola keuangan dan sumber daya yang dimiliki. Hemat namun tidak pelit, tahu kapan harus berhemat dan kapan harus bermurah hati. Cermat dalam menilai situasi dan jarang salah perhitungan. Kehidupan ekonominya stabil karena pengelolaan yang bijaksana.'
  },
  'Sabtu Kliwon': {
    watak: 'Berwibawa, sakti, dan dihormati',
    desc: 'Merupakan salah satu weton yang sangat dihormati dalam tradisi Jawa. Memiliki kewibawaan yang sangat besar dan aura kekuatan yang terasa. Sering memiliki kemampuan-kemampuan khusus yang berhubungan dengan kebatinan. Hidupnya penuh dengan tanggung jawab besar namun juga dengan kehormatan yang tinggi.'
  }
};

// ===== MAKNA KECOCOKAN (Sisa Pembagian 8) =====
const KECOCOKAN = {
  1: {
    nama: 'Pegat',
    level: 'caution',
    persen: 25,
    emoji: '⚠️',
    desc: 'Hubungan ini rentan menghadapi masalah yang bisa berujung pada perpisahan (pegat) atau perceraian. Masalah yang muncul bisa berupa tekanan ekonomi, kehadiran orang ketiga, atau perbedaan prinsip yang sulit dikompromikan. Diperlukan usaha ekstra, keikhlasan, dan komunikasi yang sangat baik dari kedua belah pihak untuk menjaga keutuhan hubungan ini.',
    saran: 'Perbanyak komunikasi terbuka, saling pengertian, dan jangan biarkan masalah kecil menumpuk.'
  },
  2: {
    nama: 'Ratu',
    level: 'excellent',
    persen: 90,
    emoji: '👑',
    desc: 'Pasangan ini sangat harmonis, dihargai, dan disegani oleh lingkungan sekitarnya. Hubungan kalian berdua bagaikan raja dan ratu yang saling melengkapi. Keluarga ini sering dijadikan panutan dan teladan oleh masyarakat. Dipenuhi wibawa, kedamaian, dan kerukunan yang membuat siapa saja kagum.',
    saran: 'Jaga keharmonisan dengan saling menghargai dan tetap rendah hati di hadapan sesama.'
  },
  3: {
    nama: 'Jodoh',
    level: 'excellent',
    persen: 95,
    emoji: '💕',
    desc: 'Sangat cocok dan memang ditakdirkan untuk bersama! Pasangan ini mampu menerima kelebihan dan kekurangan masing-masing dengan lapang dada. Rumah tangga akan berjalan rukun, damai, dan penuh cinta kasih hingga hari tua. Mereka saling melengkapi bagaikan dua keping puzzle yang sempurna.',
    saran: 'Tetap jaga komunikasi dan jangan pernah berhenti saling menghargai meski sudah lama bersama.'
  },
  4: {
    nama: 'Topo',
    level: 'good',
    persen: 65,
    emoji: '🏔️',
    desc: 'Hubungan ini akan mengalami masa-masa sulit di awal, bagaikan orang yang sedang bertapa (topo). Tantangan bisa berupa kesulitan ekonomi, adaptasi, atau cobaan dari luar. Namun, setelah melewati masa "bertapa" tersebut dengan sabar dan tekun, pasangan ini akan menemukan kebahagiaan, kesuksesan, dan kemakmuran yang sejati.',
    saran: 'Bersabar di awal perjalanan, yakinlah bahwa setelah kesulitan pasti ada kemudahan.'
  },
  5: {
    nama: 'Tinari',
    level: 'excellent',
    persen: 85,
    emoji: '💰',
    desc: 'Rumah tangga ini akan dilimpahi kemudahan dalam mencari rezeki. Pintu-pintu keberuntungan seolah selalu terbuka lebar. Pasangan ini jarang mengalami kekurangan finansial dan sering mendapatkan rejeki yang tidak terduga. Kehidupan materiil mereka akan tercukupi dengan baik sepanjang pernikahan.',
    saran: 'Bersyukur atas limpahan rezeki dan jangan lupa berbagi dengan sesama.'
  },
  6: {
    nama: 'Padu',
    level: 'warning',
    persen: 45,
    emoji: '💢',
    desc: 'Pasangan ini akan sering mengalami pertengkaran (padu) atau perdebatan yang dipicu oleh hal-hal sepele. Ego dari kedua pihak sering berbenturan dan sulit untuk saling mengalah. Namun kabar baiknya, pertengkaran ini tidak sampai menyebabkan perceraian—hanya perlu pengendalian emosi yang lebih baik.',
    saran: 'Belajar mengalah bukan berarti kalah. Kendalikan emosi dan utamakan keharmonisan rumah tangga.'
  },
  7: {
    nama: 'Sujanan',
    level: 'caution',
    persen: 30,
    emoji: '💔',
    desc: 'Hubungan ini rentan menghadapi masalah yang dipicu oleh perselingkuhan atau kecemburuan (sujanan) yang berlebihan dari salah satu pihak. Rasa curiga dan ketidakpercayaan bisa meracuni hubungan jika tidak ditangani dengan bijak. Diperlukan kejujuran, keterbukaan, dan komitmen yang kuat dari keduanya.',
    saran: 'Bangun kepercayaan dengan kejujuran total, dan jauhi situasi yang bisa menimbulkan fitnah.'
  },
  8: {
    nama: 'Pesthi',
    level: 'excellent',
    persen: 92,
    emoji: '🕊️',
    desc: 'Pernikahan akan berjalan dengan rukun, damai, dan tenteram bagaikan air yang mengalir tenang. Walaupun ada masalah yang datang silih berganti, hal itu tidak akan mampu merusak keharmonisan keluarga. Pasangan ini memiliki ikatan batin yang sangat kuat dan saling memahami tanpa perlu banyak kata-kata.',
    saran: 'Syukuri keharmonisan ini dan jadikan rumah tangga sebagai surga kecil di dunia.'
  }
};

// ===== CORE FUNCTIONS =====

/**
 * Menghitung Pasaran dari tanggal Masehi
 * Referensi: 17 Agustus 1945 = Jumat Legi
 */
function getPasaran(date) {
  const refTime = REFERENCE_DATE.getTime();
  const targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.round((targetTime - refTime) / (1000 * 60 * 60 * 24));
  const index = ((diffDays % 5) + 5) % 5; // Legi = 0 for reference date
  return PASARAN_NAMES[index];
}

/**
 * Mendapatkan nama hari dari tanggal
 */
function getHari(date) {
  return HARI_NAMES[date.getDay()];
}

/**
 * Menghitung total Neptu dari Hari + Pasaran
 */
function getNeptu(hari, pasaran) {
  return NEPTU_HARI[hari] + NEPTU_PASARAN[pasaran];
}

/**
 * Mendapatkan Weton lengkap dari tanggal
 */
function getWeton(date) {
  const hari = getHari(date);
  const pasaran = getPasaran(date);
  const neptuHari = NEPTU_HARI[hari];
  const neptuPasaran = NEPTU_PASARAN[pasaran];
  const neptuTotal = neptuHari + neptuPasaran;
  const key = `${hari} ${pasaran}`;
  const watak = WATAK_WETON[key] || { watak: '-', desc: '-' };

  return {
    hari,
    pasaran,
    weton: key,
    neptuHari,
    neptuPasaran,
    neptuTotal,
    watak: watak.watak,
    desc: watak.desc
  };
}

/**
 * Menghitung kecocokan dua pasangan berdasarkan Neptu
 * Sistem Pegat-Pesthi (sisa bagi 8)
 */
function hitungKecocokan(neptu1, neptu2) {
  const total = neptu1 + neptu2;
  let sisa = total % 8;
  if (sisa === 0) sisa = 8;
  return {
    totalNeptu: total,
    sisa,
    ...KECOCOKAN[sisa]
  };
}

/**
 * Format tanggal ke string Indonesia
 */
function formatTanggal(date) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== DOM MANIPULATION =====

document.addEventListener('DOMContentLoaded', () => {
  // Tab Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // ===== CEK WETON =====
  const formWeton = document.getElementById('form-weton');
  const resultWeton = document.getElementById('result-weton');

  formWeton.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dateInput = document.getElementById('tanggal-lahir').value;
    if (!dateInput) return;

    const date = new Date(dateInput + 'T00:00:00');
    const weton = getWeton(date);

    // Populate result
    document.getElementById('weton-name').textContent = weton.weton;
    document.getElementById('weton-date').textContent = formatTanggal(date);
    document.getElementById('neptu-total').textContent = weton.neptuTotal;
    document.getElementById('neptu-breakdown').textContent = 
      `${weton.hari} (${weton.neptuHari}) + ${weton.pasaran} (${weton.neptuPasaran})`;
    
    // Character
    document.getElementById('watak-title').textContent = weton.watak;
    document.getElementById('watak-desc').textContent = weton.desc;
    
    // Hari character
    document.getElementById('char-hari-title').textContent = `Sifat Hari ${weton.hari}`;
    document.getElementById('char-hari-desc').textContent = getHariCharacter(weton.hari);
    
    // Pasaran character
    document.getElementById('char-pasaran-title').textContent = `Sifat Pasaran ${weton.pasaran}`;
    document.getElementById('char-pasaran-desc').textContent = getPasaranCharacter(weton.pasaran);

    resultWeton.classList.add('visible');
    resultWeton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ===== KECOCOKAN PASANGAN =====
  const formCompat = document.getElementById('form-compat');
  const resultCompat = document.getElementById('result-compat');

  formCompat.addEventListener('submit', (e) => {
    e.preventDefault();

    const date1Input = document.getElementById('tanggal-pria').value;
    const date2Input = document.getElementById('tanggal-wanita').value;
    if (!date1Input || !date2Input) return;

    const date1 = new Date(date1Input + 'T00:00:00');
    const date2 = new Date(date2Input + 'T00:00:00');

    const weton1 = getWeton(date1);
    const weton2 = getWeton(date2);
    const compat = hitungKecocokan(weton1.neptuTotal, weton2.neptuTotal);

    // Names
    const namaPria = document.getElementById('nama-pria').value || 'Pria';
    const namaWanita = document.getElementById('nama-wanita').value || 'Wanita';

    // Person 1
    document.getElementById('person1-label').textContent = namaPria;
    document.getElementById('person1-weton').textContent = weton1.weton;
    document.getElementById('person1-neptu').textContent = `Neptu: ${weton1.neptuTotal}`;
    document.getElementById('person1-date').textContent = formatTanggal(date1);

    // Person 2
    document.getElementById('person2-label').textContent = namaWanita;
    document.getElementById('person2-weton').textContent = weton2.weton;
    document.getElementById('person2-neptu').textContent = `Neptu: ${weton2.neptuTotal}`;
    document.getElementById('person2-date').textContent = formatTanggal(date2);

    // Total
    document.getElementById('compat-total-val').textContent = `${weton1.neptuTotal} + ${weton2.neptuTotal} = ${compat.totalNeptu}`;

    // Category
    const catEl = document.getElementById('compat-category');
    catEl.className = `compat-category level-${compat.level}`;
    document.getElementById('compat-sisa-val').textContent = `Sisa ${compat.totalNeptu} ÷ 8 = ${compat.sisa}`;
    document.getElementById('compat-emoji').textContent = compat.emoji;
    document.getElementById('compat-cat-name').textContent = compat.nama;
    document.getElementById('compat-cat-desc').textContent = compat.desc;
    
    // Meter
    document.getElementById('compat-meter-fill').style.width = `${compat.persen}%`;

    // Saran
    document.getElementById('compat-saran').textContent = compat.saran;

    // Calculation steps
    document.getElementById('calc-neptu1').textContent = 
      `Neptu ${namaPria}: ${weton1.hari} (${weton1.neptuHari}) + ${weton1.pasaran} (${weton1.neptuPasaran}) = ${weton1.neptuTotal}`;
    document.getElementById('calc-neptu2').textContent = 
      `Neptu ${namaWanita}: ${weton2.hari} (${weton2.neptuHari}) + ${weton2.pasaran} (${weton2.neptuPasaran}) = ${weton2.neptuTotal}`;
    document.getElementById('calc-total').textContent = 
      `Total: ${weton1.neptuTotal} + ${weton2.neptuTotal} = ${compat.totalNeptu}`;
    document.getElementById('calc-sisa').textContent = 
      `Pembagian: ${compat.totalNeptu} ÷ 8 = ${Math.floor(compat.totalNeptu / 8)}, sisa ${compat.sisa === 8 ? '0 (dianggap 8)' : compat.sisa}`;
    document.getElementById('calc-result').textContent = 
      `Hasil: Sisa ${compat.sisa} → ${compat.nama}`;

    resultCompat.classList.add('visible');
    resultCompat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// ===== HELPER: Karakter per Hari =====
function getHariCharacter(hari) {
  const chars = {
    'Minggu': 'Hari Minggu dipengaruhi oleh Matahari (Surya). Orang yang lahir di hari ini memiliki sifat terang, terbuka, dan berjiwa pemimpin. Mereka cenderung percaya diri dan memiliki ambisi yang tinggi.',
    'Senin': 'Hari Senin dipengaruhi oleh Bulan (Candra). Orang yang lahir di hari ini memiliki sifat lembut, penyayang, dan peka terhadap perasaan orang lain. Mereka memiliki intuisi yang baik dan jiwa yang romantis.',
    'Selasa': 'Hari Selasa dipengaruhi oleh Mars (Anggara). Orang yang lahir di hari ini memiliki sifat berani, tegas, dan penuh semangat. Mereka cenderung berjiwa ksatria dan tidak takut menghadapi tantangan.',
    'Rabu': 'Hari Rabu dipengaruhi oleh Merkurius (Budha). Orang yang lahir di hari ini memiliki sifat cerdas, komunikatif, dan pandai berdiplomasi. Mereka terampil dalam bernegosiasi dan memiliki daya analisa yang tajam.',
    'Kamis': 'Hari Kamis dipengaruhi oleh Jupiter (Respati). Orang yang lahir di hari ini memiliki sifat bijaksana, dermawan, dan berwibawa. Mereka cenderung menjadi pemimpin yang dihormati dan senang berbagi.',
    'Jumat': 'Hari Jumat dipengaruhi oleh Venus (Sukra). Orang yang lahir di hari ini memiliki sifat harmonis, penuh kasih, dan menyukai keindahan. Mereka pandai menjaga hubungan dan memiliki pesona yang memikat.',
    'Sabtu': 'Hari Sabtu dipengaruhi oleh Saturnus (Tumpak). Orang yang lahir di hari ini memiliki sifat kuat, tabah, dan penuh kesabaran. Mereka pekerja keras yang pantang menyerah dan memiliki ketahanan mental yang tinggi.'
  };
  return chars[hari] || '';
}

// ===== HELPER: Karakter per Pasaran =====
function getPasaranCharacter(pasaran) {
  const chars = {
    'Legi': 'Pasaran Legi melambangkan cahaya dan kebaikan. Orang dengan pasaran Legi cenderung berjiwa bersih, jujur, dan tulus. Mereka mudah bergaul dan disenangi banyak orang. Rezekinya cenderung datang dengan mudah.',
    'Pahing': 'Pasaran Pahing melambangkan kekuatan dan ketegasan. Orang dengan pasaran Pahing memiliki tekad yang kuat dan tidak mudah menyerah. Mereka berambisi tinggi dan selalu berusaha menjadi yang terbaik.',
    'Pon': 'Pasaran Pon melambangkan keluwesan dan kecerdasan. Orang dengan pasaran Pon pandai beradaptasi dan memiliki kemampuan sosial yang tinggi. Mereka terampil dalam berkomunikasi dan memiliki banyak relasi.',
    'Wage': 'Pasaran Wage melambangkan kesederhanaan dan kebijaksanaan. Orang dengan pasaran Wage cenderung hidup sederhana namun penuh makna. Mereka sabar, tekun, dan memiliki ketenangan batin yang mendalam.',
    'Kliwon': 'Pasaran Kliwon melambangkan kekuatan spiritual dan misteri. Orang dengan pasaran Kliwon memiliki kepekaan batin yang tajam dan sering mengalami hal-hal di luar nalar. Mereka memiliki aura kharisma yang kuat.'
  };
  return chars[pasaran] || '';
}
