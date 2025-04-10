document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('solid');
        } else {
            nav.classList.remove('solid');
        }
    });

    document.querySelector('.hamburger').onclick = function () {
        document.querySelector('.menu').classList.toggle('active');
    };

    document.addEventListener('mousemove', function (e) {
        document.querySelectorAll('.parallax-banner img').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const translateX = (window.innerWidth - e.clientX * 2) / 100 * speed;
            const translateY = (window.innerHeight - e.clientY * 2) / 100 * speed;
            const scale = 1 + (speed / 20);
            layer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        });
    });
});

const nav = document.querySelector('.top-nav');
let isDown = false;
let startX;
let scrollLeft;

nav.addEventListener('mousedown', (e) => {
    isDown = true;
    nav.classList.add('dragging');
    startX = e.pageX - nav.offsetLeft;
    scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mouseleave', () => {
    isDown = false;
    nav.classList.remove('dragging');
});

nav.addEventListener('mouseup', () => {
    isDown = false;
    nav.classList.remove('dragging');
});

nav.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - nav.offsetLeft;
    const walk = (x - startX) * 2;
    nav.scrollLeft = scrollLeft - walk;
});

function toggleSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    sidebar.classList.toggle("active");
}

function toggleChapter(el) {
    const chapterItem = el.parentElement;
    chapterItem.classList.toggle("open");
}

function toggleLessons(element) {
    console.log("hello");
    const chapterItem = element.closest('.chapter-item');
    chapterItem.classList.toggle('open');
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    sidebar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('#mobileSidebar a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileSidebar').classList.remove('active');
        });
    });
});

function toggleMobileSidebar() {
    document.getElementById('mobileSidebar').classList.toggle('active');
}

function goToTopic(element) {
    const url = element.getAttribute('data-topic-url');
    if (url) {
        window.location.href = url;
    }
}

