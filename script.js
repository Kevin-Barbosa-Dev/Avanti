document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

// Função para processar a busca
function processSearch(inputId, resultId) {
    const searchInput = document.getElementById(inputId);
    const searchResult = document.getElementById(resultId);

    if (searchInput && searchResult) {
        const searchText = searchInput.value.trim();

        if (searchText) {
            searchResult.textContent = `Você buscou por: "${searchText}"`;
            searchResult.style.display = 'block';
        } else {
            searchResult.style.display = 'none';
        }
    }
}

// Adicionar event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    // Configurar busca desktop
    const desktopSearchButton = document.getElementById('desktop-search-button');
    if (desktopSearchButton) {
        desktopSearchButton.addEventListener('click', function (e) {
            e.preventDefault();
            processSearch('desktop-search-input', 'desktop-search-result');
        });
    }

    // Configurar busca mobile
    const mobileSearchButton = document.getElementById('mobile-search-button');
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', function (e) {
            e.preventDefault();
            processSearch('mobile-search-input', 'mobile-search-result');
        });
    }

    // Adicionar funcionalidade para buscar ao pressionar Enter
    const desktopInput = document.getElementById('desktop-search-input');
    if (desktopInput) {
        desktopInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                processSearch('desktop-search-input', 'desktop-search-result');
            }
        });
    }

    const mobileInput = document.getElementById('mobile-search-input');
    if (mobileInput) {
        mobileInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                processSearch('mobile-search-input', 'mobile-search-result');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const todasCategoriasLink = document.getElementById('todasCategorias');
    const departamentoLinks = document.querySelectorAll('.departamento-link');
    const departamentoDropdown = document.getElementById('departamentoDropdown');
    const todasCategoriasDropdown = document.getElementById('todasCategoriasDropdown');


    if (todasCategoriasLink) {
        todasCategoriasLink.addEventListener('mouseenter', function () {
            departamentoDropdown.style.display = 'none';
            todasCategoriasDropdown.style.display = 'flex';
        });
    }

    departamentoLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            todasCategoriasDropdown.style.display = 'none';
            departamentoDropdown.style.display = 'flex';
        });
    });

    const wrapperMenu = document.querySelector('.wrapper-menu');
    wrapperMenu.addEventListener('mouseleave', function () {
        departamentoDropdown.style.display = 'none';
        todasCategoriasDropdown.style.display = 'none';
    });

    if (todasCategoriasDropdown) {
        todasCategoriasDropdown.addEventListener('mouseenter', function () {
            todasCategoriasDropdown.style.display = 'flex';
        });

        todasCategoriasDropdown.addEventListener('mouseleave', function () {
            todasCategoriasDropdown.style.display = 'none';
        });
    }

    if (departamentoDropdown) {
        departamentoDropdown.addEventListener('mouseenter', function () {
            departamentoDropdown.style.display = 'flex';
        });

        departamentoDropdown.addEventListener('mouseleave', function () {
            departamentoDropdown.style.display = 'none';
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {

    // Carrossel personalizado
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const paginationContainer = document.getElementById('carouselPagination');

    if (!track || !items.length || !prevButton || !nextButton || !paginationContainer) {
        return; // Sai da função se algum elemento não for encontrado
    }

    let currentIndex = 0;
    let itemWidth = 0;
    let itemsPerView = 1;
    let maxIndex = 0;

    // Função para atualizar as variáveis baseadas no tamanho da tela
    function updateCarouselVars() {
        const containerWidth = track.parentElement.clientWidth;

        // Determina quantos itens mostrar por vez baseado na largura da tela
        if (window.innerWidth >= 1200) {
            itemsPerView = 5; // Extra large screens
        } else if (window.innerWidth >= 992) {
            itemsPerView = 4; // Large screens
        } else if (window.innerWidth >= 768) {
            itemsPerView = 3; // Medium screens
        } else if (window.innerWidth >= 576) {
            itemsPerView = 2; // Small screens
        } else {
            itemsPerView = 1; // Extra small screens
        }

        itemWidth = containerWidth / itemsPerView;
        maxIndex = Math.max(0, items.length - itemsPerView);

        // Atualiza a largura de cada item
        items.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });

        // Atualiza a posição do track
        updateCarouselPosition();

        // Atualiza a paginação
        updatePagination();
    }

    // Função para atualizar a posição do carrossel
    function updateCarouselPosition() {
        track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Atualiza os botões de navegação
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;

        // Atualiza a paginação ativa
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Função para criar a paginação
    function updatePagination() {
        paginationContainer.innerHTML = '';

        // Cria um ponto para cada página possível
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarouselPosition();
            });

            paginationContainer.appendChild(dot);
        }
    }

    // Event listeners para os botões de navegação
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
        }
    });

    // Inicializa o carrossel
    updateCarouselVars();

    // Atualiza o carrossel quando a janela é redimensionada
    window.addEventListener('resize', updateCarouselVars);
});
function changeImage() {
    const bannerQuartoDesktop = document.getElementById('bannerQuatro');
    const newImageMobile = document.getElementById('bannerQuatroMobile');

    if (window.innerWidth <= 768) {
        bannerQuartoDesktop.src = newImageMobile.src;
    } else {
        newImageMobile.sr = bannerQuartoDesktop.src;
    }
}




document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".footerMobileSection");

    sections.forEach(section => {
        const summary = section.querySelector("summary");
        const arrow = summary.querySelector("img");

        summary.addEventListener("click", (e) => {
            setTimeout(() => {
                if (section.open) {
                    arrow.classList.add("rotated");
                } else {
                    arrow.classList.remove("rotated");
                }
            }, 10);
        });
    });
});