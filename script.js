// ================= NAVIGATION =================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ================= NAVBAR EFFECT =================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 80) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ================= ACTIVE LINK =================
window.addEventListener('scroll', () => {
    let current = "";

    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// ================= EMAILJS =================
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // 🔥 Replace this
})();

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = form.querySelector("button");
        const originalText = btn.textContent;

        const data = {
            from_name: document.getElementById("user_name").value,
            from_email: document.getElementById("user_email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        // Basic validation
        if (!data.from_name || !data.from_email || !data.subject || !data.message) {
            notify("Please fill all fields", "error");
            return;
        }

        btn.textContent = "Sending...";
        btn.disabled = true;

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data)
            .then(() => {
                notify("Message sent successfully!", "success");
                form.reset();
            })
            .catch(() => {
                notify("Failed to send message", "error");
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

// ================= NOTIFICATION =================
function notify(message, type = "success") {
    const div = document.createElement("div");
    div.textContent = message;

    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 18px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: 0.3s;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
    `;

    document.body.appendChild(div);

    setTimeout(() => div.style.transform = "translateX(0)", 100);

    setTimeout(() => {
        div.style.transform = "translateX(100%)";
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// ================= COUNTER =================
function animateCounter(el, target) {
    let count = 0;
    const step = target / 50;

    const update = () => {
        count += step;
        if (count < target) {
            el.textContent = Math.floor(count) + "+";
            requestAnimationFrame(update);
        } else {
            el.textContent = target + "+";
        }
    };
    update();
}

const stats = document.querySelector(".hero-stats");

if (stats) {
    const statObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll(".stat-number").forEach(el => {
                const num = parseInt(el.textContent);
                if (!isNaN(num)) animateCounter(el, num);
            });
            statObserver.disconnect();
        }
    });

    statObserver.observe(stats);
}

// ================= SCROLL TO TOP =================
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";

scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    border: none;
    display: none;
    cursor: pointer;
`;

document.body.appendChild(scrollBtn);

scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

// ================= PAGE LOAD =================
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});