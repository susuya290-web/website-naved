// main.js - Di-update

// -- Proteksi Halaman --
(function() {
    if (sessionStorage.getItem('isLoggedIn') !== 'true' && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
})();

// -- Logika Utama (Logout & Dark Mode) --
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Logika Logout ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }

    // --- 2. Sapa Pengguna (Bonus) ---
    if (window.location.pathname.endsWith('home.html') || window.location.pathname.endsWith('/')) {
        const username = sessionStorage.getItem('username');
        if (username) {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                heroTitle.textContent = `Selamat Datang, ${username}!`;
            }
        }
    }

    // --- 3. Logika Dark Mode ---
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Cek tema yang tersimpan di localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggle.checked = true;
    }

    // Event listener untuk toggle
    toggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); // Simpan pilihan
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light'); // Simpan pilihan
        }
    });
});

// ... (kode main.js sebelumnya) ...

/* ==========================================
   LOGIKA JAM DIGITAL
   ========================================== */
function updateClock() {
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    
    // Hanya jalankan jika elemen jam ada di halaman ini (Home)
    if (timeElement && dateElement) {
        const now = new Date();
        
        // Format Waktu (HH:MM:SS)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Format Tanggal (Hari, Tanggal Bulan Tahun)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Gunakan 'id-ID' untuk bahasa Indonesia
        dateElement.textContent = now.toLocaleDateString('id-ID', options);
    }
}

// Jalankan fungsi setiap 1 detik (1000ms)
setInterval(updateClock, 1000);

// Jalankan sekali saat halaman dimuat agar tidak menunggu 1 detik
updateClock();


/* ==========================================
   LOGIKA PEMUTAR MUSIK
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('my-audio');
    const playBtn = document.getElementById('play-pause-btn');
    const coverImg = document.getElementById('music-cover');
    const progressBar = document.getElementById('progress-bar');

    if (audio && playBtn) {
        
        // Fungsi Play/Pause
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
                coverImg.classList.add('rotating'); 
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>'; 
                coverImg.classList.remove('rotating'); 
            }
        });

        // Update Progress Bar
        audio.addEventListener('timeupdate', () => {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        });

        // Saat lagu selesai
        audio.addEventListener('ended', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            coverImg.classList.remove('rotating');
            progressBar.style.width = '0%';
        });
    }
});
