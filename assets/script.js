// ========== GLOBAL STATE MANAGEMENT ==========
const MemoryHub = {
    currentPage: 'home',
    isMobileMenuOpen: false,
    
    // Cache memory state
    cache: {
        basic: ['', '', '', ''],
        l1: ['', '', '', ''],
        l2: ['', '', '', '', '', ''],
        l3: ['', '', '', '', '', '', '', ''],
        hits: 0,
        misses: 0,
        replacement: {
            lru: ['', '', ''],
            fifo: ['', '', ''],
            random: ['', '', ''],
            fifoPointer: 0,
            hits: { lru: 0, fifo: 0, random: 0 },
            accessSequence: ['A', 'B', 'C', 'A', 'D', 'B', 'E', 'A', 'C', 'F'],
            sequenceIndex: 0
        }
    },
    
    // RAM state
    ram: {
        data: Array(64).fill(null),
        operations: 0,
        selectedCell: null,
        memoryAccesses: 0
    },
    
    // ROM state
    rom: {
        bootTimer: null,
        bootTime: 0,
        currentStage: 0
    },
    
    // CPU state
    cpu: {
        step: 0,
        instructions: 0,
        cacheHits: 0,
        cacheMisses: 0,
        clockCycles: 0
    }
};

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Update navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(pageId)) {
            link.classList.add('active');
        }
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        MemoryHub.currentPage = pageId;
        
        // Update page title
        const pageTitles = {
            'home': 'Memory Systems Learning Hub',
            'cache': 'Cache Memory - Learning Hub',
            'ram': 'Random Access Memory (RAM) - Learning Hub',
            'rom': 'ROM & Storage Systems - Learning Hub',
            'cpu': 'CPU-Memory Coordination - Learning Hub'
        };
        document.title = `${pageTitles[pageId]} | Interactive Computer Science Education`;
        
        // Initialize page-specific functionality
        initializePage(pageId);
    }
    
    // Close mobile menu if open
    if (MemoryHub.isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const spans = document.querySelectorAll('.hamburger span');
    
    MemoryHub.isMobileMenuOpen = !MemoryHub.isMobileMenuOpen;
    
    if (MemoryHub.isMobileMenuOpen) {
        menu.classList.add('active');
        menu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        
        // Transform hamburger to X
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        menu.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ========== PAGE INITIALIZATION ==========
function initializePage(pageId) {
    switch(pageId) {
        case 'cache':
            initializeCachePage();
            break;
        case 'ram':
            initializeRAMPage();
            break;
        case 'rom':
            // ROM initialization handled in its own functions
            break;
        case 'cpu':
            initializeCPUPage();
            break;
        default:
            // Initialize any global components
            initializeInteractiveElements();
    }
}

// ========== CACHE PAGE FUNCTIONS ==========
function initializeCachePage() {
    initializeBasicCache();
    initializeMultiCache();
    initializeReplacementCaches();
}

// ... (All cache-related functions from original file go here)
// Note: You'll need to copy all the cache simulation functions from the original

// ========== RAM PAGE FUNCTIONS ==========
function initializeRAMPage() {
    initializeRAMGrid();
    initializeAddressGrid();
}

// ... (All RAM-related functions from original file go here)

// ========== ROM PAGE FUNCTIONS ==========
// ... (All ROM-related functions from original file go here)

// ========== CPU PAGE FUNCTIONS ==========
function initializeCPUPage() {
    // Initialize CPU page elements
}

// ... (All CPU-related functions from original file go here)

// ========== TAB NAVIGATION ==========
function showCacheTab(tabName) {
    document.querySelectorAll('#cache .tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#cache .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`cache-${tabName}`).classList.add('active');
    event.target.classList.add('active');
    
    switch(tabName) {
        case 'basic':
            initializeBasicCache();
            break;
        case 'multi':
            initializeMultiCache();
            break;
        case 'replacement':
            initializeReplacementCaches();
            break;
    }
}

function showRamTab(tabName) {
    document.querySelectorAll('#ram .tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#ram .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`ram-${tabName}`).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'basic') {
        initializeRAMGrid();
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all pages
    initializePage('home');
    
    // Add event listeners for interactive elements
    document.querySelectorAll('.hub-card').forEach(card => {
        card.addEventListener('click', function() {
            const pageMap = {
                'cache-card': 'cache',
                'ram-card': 'ram',
                'rom-card': 'rom',
                'cpu-card': 'cpu'
            };
            
            for (const [className, pageId] of Object.entries(pageMap)) {
                if (this.classList.contains(className)) {
                    showPage(pageId);
                    break;
                }
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && MemoryHub.isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        if (MemoryHub.isMobileMenuOpen && 
            !menu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            toggleMobileMenu();
        }
    });
});

// ========== HELPER FUNCTIONS ==========
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hub-card');
    const levels = document.querySelectorAll('.hierarchy-level');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    levels.forEach(level => {
        level.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        level.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========== EXPORT FOR MODULAR USE ==========
// This allows other scripts to access the MemoryHub object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MemoryHub, showPage, toggleMobileMenu };
}
