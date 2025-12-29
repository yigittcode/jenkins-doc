/**
 * Yomu API Documentation - Main JavaScript
 * Sade ve moduler navigasyon ve interaktivite
 */

// ============================================
// DOM Element References
// ============================================
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const navItems = document.querySelectorAll('.nav-item');

// ============================================
// Mobile Menu Toggle
// ============================================
function toggleMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
}

function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
}

menuToggle?.addEventListener('click', toggleMenu);
overlay?.addEventListener('click', closeMenu);

// Close menu on nav item click (mobile)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            closeMenu();
        }
    });
});

// ============================================
// Active Navigation State
// ============================================
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Scroll to Top Button
// ============================================
function toggleScrollTop() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Copy Code Block Functionality
// ============================================
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>Kopyala</span>
        `;
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: #e2e8f0;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
        `;

        block.style.position = 'relative';
        block.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code').textContent;

            try {
                await navigator.clipboard.writeText(code);
                copyBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Kopyalandı!</span>
                `;
                copyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
                copyBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';

                setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        <span>Kopyala</span>
                    `;
                    copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                    copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }, 2000);
            } catch (err) {
                console.error('Kopyalama hatası:', err);
            }
        });

        // Add hover effect for copy button
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        copyBtn.addEventListener('mouseleave', () => {
            if (!copyBtn.querySelector('span').textContent.includes('Kopyalandı')) {
                copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

// ============================================
// Keyboard Navigation
// ============================================
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Press 'M' to toggle mobile menu
        if (e.key === 'm' || e.key === 'M') {
            if (window.innerWidth <= 1024) {
                toggleMenu();
            }
        }

        // Press ESC to close menu
        if (e.key === 'Escape') {
            closeMenu();
        }

        // Press Home to scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ============================================
// Search Functionality
// ============================================
function initSearch() {
    // Create search input in header
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Ara..." class="search-input" id="searchInput">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
        </svg>
    `;

    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-container {
            position: relative;
        }
        .search-input {
            width: 200px;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 0.85rem;
            background: var(--bg-body);
            color: var(--text-main);
            transition: var(--transition);
        }
        .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-light);
            pointer-events: none;
        }
    `;

    document.head.appendChild(searchStyles);
    headerActions.insertBefore(searchContainer, headerActions.firstChild);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const sections = document.querySelectorAll('.section');

    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}

// ============================================
// Jenkinsfile Generator
// ============================================
function initJenkinsfileGenerator() {
    const form = document.getElementById('jenkinsfileForm');
    const outputContainer = document.getElementById('outputContainer');
    const generatedCode = document.getElementById('generatedCode');
    const copyBtn = document.getElementById('copyOutput');
    const downloadBtn = document.getElementById('downloadOutput');
    const resetBtn = document.getElementById('resetForm');

    if (!form || !outputContainer || !generatedCode) return;

    let generatedJenkinsfile = '';

    // Form submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            dockerImage: document.getElementById('dockerImage').value,
            dockerCredsId: document.getElementById('dockerCredsId').value,
            sshCredsId: document.getElementById('sshCredsId').value,
            awsRegion: document.getElementById('awsRegion').value,
            ssmSecretPath: document.getElementById('ssmSecretPath').value,
            ssmConfigPath: document.getElementById('ssmConfigPath').value,
            appDir: document.getElementById('appDir').value,
            logGroupName: document.getElementById('logGroupName').value
        };

        generatedJenkinsfile = generateJenkinsfile(formData);
        generatedCode.textContent = generatedJenkinsfile;
        outputContainer.style.display = 'block';

        // Scroll to output
        outputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Copy button handler
    copyBtn?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedJenkinsfile);

            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                Kopyalandı!
            `;
            copyBtn.style.background = '#10b981';

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Kopyalama hatası:', err);
        }
    });

    // Download button handler
    downloadBtn?.addEventListener('click', () => {
        const blob = new Blob([generatedJenkinsfile], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Jenkinsfile';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Reset button handler
    resetBtn?.addEventListener('click', () => {
        form.reset();
        outputContainer.style.display = 'none';
        generatedJenkinsfile = '';
    });
}

function generateJenkinsfile(data) {
    // Groovy variable placeholder - creates ${name} without JS interpreting it
    const G = (name) => '$' + '{' + name + '}';

    return `pipeline {
    agent any

    environment {
        DOCKER_HUB_IMAGE = "${data.dockerImage}"
        DOCKER_HUB_CREDS_ID = "${data.dockerCredsId}"
        SSH_CREDENTIALS_ID = "${data.sshCredsId}"
        AWS_REGION = "${data.awsRegion}"
        SSM_SECRET_PATH = "${data.ssmSecretPath}"
        SSM_CONFIG_PATH = "${data.ssmConfigPath}"
        YOMU_APP_DIR = "${data.appDir}"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('2. Build & Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo ` + G('DOCKER_PASS') + ` | docker login -u ` + G('DOCKER_USER') + ` --password-stdin"
                    sh "docker build -t ` + G('DOCKER_HUB_IMAGE') + ` ."
                    sh "docker push ` + G('DOCKER_HUB_IMAGE') + `"
                }
            }
        }

        stage('3. Deploy to Server') {
            steps {
                script {
                    echo "Gizli bilgileri (.env) AWS SSM'den çekiyorum..."
                    sh """
                        aws ssm get-parameters-by-path \\
                            --path "` + G('SSM_SECRET_PATH') + `" \\
                            --with-decryption \\
                            --region "` + G('AWS_REGION') + `" \\
                            --query "Parameters[*].{Name:Name,Value:Value}" \\
                            --output json | \\
                        jq -r '.[] | "\\\\?(.Name)=\\\\\\"\\\\\\\\?(.Value)\\\\\\""' | \\
                        sed 's|` + G('SSM_SECRET_PATH') + `||' > .env

                        CLOUDFRONT_DOMAIN=` + G('$(aws') + ` ssm get-parameter --name "` + G('SSM_CONFIG_PATH') + `CLOUDFRONT_DOMAIN" --region "` + G('AWS_REGION') + `" --query 'Parameter.Value' --output text)
                        CLOUDFRONT_KEY_ID=` + G('$(aws') + ` ssm get-parameter --name "` + G('SSM_CONFIG_PATH') + `CLOUDFRONT_KEY_ID" --region "` + G('AWS_REGION') + `" --query 'Parameter.Value' --output text)

                        echo "LOCAL=false" >> .env
                        echo "CLOUDFRONT_DOMAIN=` + G('CLOUDFRONT_DOMAIN') + `" >> .env
                        echo "CLOUDFRONT_KEY_ID=` + G('CLOUDFRONT_KEY_ID') + `" >> .env
                    """

                    echo "CloudWatch Ajan ayar dosyası (cloudwatch-config.json) oluşturuluyor..."
                    sh """
cat << EOF > cloudwatch-config.json
{
  "agent": {
    "run_as_user": "root"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/lib/docker/containers/*/*-json.log",
            "log_group_name": "${data.logGroupName}",
            "log_stream_name": "{instance_id}-build-` + G('env.BUILD_NUMBER') + `-YomuAI",
            "timestamp_format": "%Y-%m-%dT%H:%M:%S.%fZ",
            "multi_line_start_pattern": "%Y-%m-%dT%H:%M:%S"
          }
        ]
      }
    },
    "force_flush_interval": 5
  }
}
EOF
                    """

                    echo "Sunucu IP ve Kullanıcı adını AWS SSM'den çekiyorum..."
                    def serverIp = sh(
                        script: "aws ssm get-parameter --name '` + G('SSM_CONFIG_PATH') + `YOMU_SERVER_IP' --region '` + G('AWS_REGION') + `' --query 'Parameter.Value' --output text",
                        returnStdout: true
                    ).trim()

                    def serverUser = sh(
                        script: "aws ssm get-parameter --name '` + G('SSM_CONFIG_PATH') + `YOMU_SERVER_USER' --region '` + G('AWS_REGION') + `' --query 'Parameter.Value' --output text",
                        returnStdout: true
                    ).trim()

                    echo "Dosyalar ` + G('serverUser') + `@` + G('serverIp') + ` sunucusuna kopyalanıyor..."

                    withCredentials([sshUserPrivateKey(credentialsId: "` + G('SSH_CREDENTIALS_ID') + `", keyFileVariable: 'SSH_KEY')]) {
                        sh "ssh -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` ` + G('serverUser') + `@` + G('serverIp') + ` 'mkdir -p ` + G('YOMU_APP_DIR') + `'"
                        sh "scp -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` .env ` + G('serverUser') + `@` + G('serverIp') + `:` + G('YOMU_APP_DIR') + `/.env"
                        sh "scp -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` docker-compose.prod.yml ` + G('serverUser') + `@` + G('serverIp') + `:` + G('YOMU_APP_DIR') + `/docker-compose.prod.yml"
                        sh "scp -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` gunicorn_conf.py ` + G('serverUser') + `@` + G('serverIp') + `:` + G('YOMU_APP_DIR') + `/gunicorn_conf.py"
                        sh "scp -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` cloudwatch-config.json ` + G('serverUser') + `@` + G('serverIp') + `:/tmp/cloudwatch-config.json"

                        sh """
                            ssh -o StrictHostKeyChecking=no -i ` + G('SSH_KEY') + ` ` + G('serverUser') + `@` + G('serverIp') + ` "
                                echo 'CloudWatch Agent kuruluyor/güncelleniyor...'
                                sudo yum install -y amazon-cloudwatch-agent

                                echo 'CloudWatch Agent (Docker logları için) dosyadan başlatılıyor...'
                                sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/tmp/cloudwatch-config.json -s

                                cd ` + G('YOMU_APP_DIR') + ` && \\
                                echo 'Yeni imajı Docker Hub''dan çekiyorum (pull)...' && \\
                                docker-compose -f docker-compose.prod.yml pull && \\
                                echo 'Servisleri yeniden başlatıyorum (up -d)...' && \\
                                docker-compose -f docker-compose.prod.yml up -d --force-recreate
                            "
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Geçici dosyalar Jenkins'ten siliniyor..."
            sh 'rm -f .env cloudwatch-config.json'
        }
    }
}`;
}

// ============================================
// Initialize
// ============================================
function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCodeBlocks();
            initKeyboardNav();
            initSearch();
            initJenkinsfileGenerator();
        });
    } else {
        initCodeBlocks();
        initKeyboardNav();
        initSearch();
        initJenkinsfileGenerator();
    }

    // Scroll event listeners
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                toggleScrollTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    updateActiveNav();
    toggleScrollTop();
}

// Start the app
init();

// ============================================
// Export for module usage (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        closeMenu,
        updateActiveNav
    };
}
