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


