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
// Blue/Green Jenkinsfile Generator
// ============================================
function initBluegreenGenerator() {
    const form = document.getElementById('bluegreenForm');
    const outputContainer = document.getElementById('bg_outputContainer');
    const generatedCode = document.getElementById('bg_generatedCode');
    const copyBtn = document.getElementById('bg_copyOutput');
    const downloadBtn = document.getElementById('bg_downloadOutput');
    const resetBtn = document.getElementById('resetBluegreenForm');

    if (!form || !outputContainer || !generatedCode) return;

    let generatedJenkinsfile = '';

    // Form submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            dockerImage: document.getElementById('bg_dockerImage').value,
            pythonAgent: document.getElementById('bg_pythonAgent').value,
            coverage: document.getElementById('bg_coverage').value,
            awsRegion: document.getElementById('bg_awsRegion').value,
            ssmPrefix: document.getElementById('bg_ssmPrefix').value,
            albListenerArn: document.getElementById('bg_albListenerArn').value,
            albRuleArn: document.getElementById('bg_albRuleArn').value,
            blueTgArn: document.getElementById('bg_blueTgArn').value,
            greenTgArn: document.getElementById('bg_greenTgArn').value,
            blueIp: document.getElementById('bg_blueIp').value,
            blueInstanceId: document.getElementById('bg_blueInstanceId').value,
            greenIp: document.getElementById('bg_greenIp').value,
            greenInstanceId: document.getElementById('bg_greenInstanceId').value,
            dockerCreds: document.getElementById('bg_dockerCreds').value,
            sshCreds: document.getElementById('bg_sshCreds').value,
            slackCreds: document.getElementById('bg_slackCreds').value,
            albDns: document.getElementById('bg_albDns').value
        };

        generatedJenkinsfile = generateBluegreenJenkinsfile(formData);
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

function generateBluegreenJenkinsfile(data) {
    // Groovy variable placeholder
    const G = (name) => '$' + '{' + name + '}';

    return `pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        COVERAGE_THRESHOLD = '${data.coverage}'
        DOCKER_IMAGE_NAME  = '${data.dockerImage}'
        DOCKER_TAG         = "${G('env.BUILD_NUMBER')}"
        DOCKER_REGISTRY    = 'docker.io'
        PYTHON_AGENT_IMAGE = '${data.pythonAgent}'
        AWS_REGION         = '${data.awsRegion}'

        ALB_LISTENER_ARN = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/alb_listener_arn --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        ALB_RULE_ARN = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/alb_rule_arn --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        BLUE_TG_ARN = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/blue_tg_arn --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        GREEN_TG_ARN = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/green_tg_arn --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        BLUE_SERVER_IP = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/blue_server_ip --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        GREEN_SERVER_IP = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/green_server_ip --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        ALB_DNS_NAME = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/alb_dns_name --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()

        BLUE_INSTANCE_ID = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/blue_instance_id --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        GREEN_INSTANCE_ID = sh(
            script: "aws ssm get-parameter --name ${data.ssmPrefix}/green_instance_id --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
    }

    options { timestamps() }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from Git...'
                checkout scm
                script {
                    env.GIT_COMMIT = sh(script: 'git log -1 --pretty=format:"%h (%s)"', returnStdout: true).trim()
                    env.GIT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.GIT_AUTHOR = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                    echo "Git Info - Branch: ${G('env.GIT_BRANCH')}, Commit: ${G('env.GIT_COMMIT')}, Author: ${G('env.GIT_AUTHOR')}"
                }
            }
        }

        stage('Quality & Tests') {
            agent { docker { image "${G('env.PYTHON_AGENT_IMAGE')}"; args '-u root' } }
            steps {
                sh """
set -Eeuo pipefail
echo "🧩 uv sync (frozen) running..."
uv sync --frozen --all-extras

echo "✅ Setting test environment variables..."
export TESTING=1
export FIREBASE_ADMIN_SDK_KEY="{}"
export AWS_ACCESS_KEY_ID="DUMMY_KEY_FOR_TESTS"
export AWS_SECRET_ACCESS_KEY="DUMMY_SECRET_FOR_TESTS"
export REDIS_HOST="localhost"
export REDIS_PORT="6379"
export REDIS_DB_BROKER="0"
export REDIS_DB_BACKEND="1"
export REPLICATE_API_TOKEN="DUMMY_TOKEN"
export rapidapi_key="DUMMY_RAPID_API_KEY"
export API_KEY="DUMMY_SIEVE_API_KEY"
export youtube_api_key="DUMMY_YOUTUBE_KEY"
export spotify_client_id="DUMMY_SPOTIFY_ID"
export spotify_client_secret="DUMMY_SPOTIFY_SECRET"
export s3_bucket_name="dummy-s3-bucket"
export openai_api_key="DUMMY_OPENAI_KEY"
export mureka_api_key="DUMMY_MUREKA_KEY"
export mureka_account_id="DUMMY_MUREKA_ID"
export generated_songs_bucket="dummy-gen-songs-bucket"
export cloudfront_domain="dummy.cloudfront.net"

echo "🧪 pytest with coverage..."
uv run pytest tests/ --verbose \\
    --cov=app \\
    --cov-report=html:htmlcov \\
    --cov-report=xml:coverage.xml \\
    --cov-report=term-missing \\
    --junitxml=test-results.xml

echo "✅ Quality & Tests finished."
"""
            }
        }

        stage('Coverage Check') {
            agent { docker { image "${G('env.PYTHON_AGENT_IMAGE')}"; args '-u root' } }
            steps {
                sh """
set -Eeuo pipefail
echo "📊 Checking coverage threshold (${G('COVERAGE_THRESHOLD')}%)..."
uv run python - <<'PY'
import os, sys
import xml.etree.ElementTree as ET
thr = float(os.environ.get('COVERAGE_THRESHOLD', '50'))
if not os.path.exists('coverage.xml'):
    print("HATA: coverage.xml bulunamadı!")
    sys.exit(1)
root = ET.parse('coverage.xml').getroot()
pct = float(root.attrib.get('line-rate', '0')) * 100.0
print(f"Current coverage: {pct:.2f}%")
print(f"Required coverage: {thr}%")
sys.exit(0 if pct >= thr else 2)
PY
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🐳 Building Docker image...'
                    def imageTag = "${G('DOCKER_IMAGE_NAME')}:${G('DOCKER_TAG')}"
                    def imageLatest = "${G('DOCKER_IMAGE_NAME')}:latest"
                    sh 'set -Eeuo pipefail'
                    sh "docker build -t ${G('imageTag')} -t ${G('imageLatest')} ."
                    echo "✅ Docker image built: ${G('imageTag')}, ${G('imageLatest')}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo '📤 Pushing Docker image to Docker Hub...'
                    def imageTag = "${G('DOCKER_IMAGE_NAME')}:${G('DOCKER_TAG')}"
                    def imageLatest = "${G('DOCKER_IMAGE_NAME')}:latest"
                    withCredentials([usernamePassword(credentialsId: '${data.dockerCreds}', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'set -Eeuo pipefail'
                        sh """
echo "🔐 Logging in to Docker Hub..."
echo "${G('DOCKER_PASS')}" | docker login -u ${G('DOCKER_USER')} --password-stdin
echo "📤 Pushing ${G('imageTag')}..."
docker push ${G('imageTag')}
echo "📤 Pushing ${G('imageLatest')}..."
docker push ${G('imageLatest')}
echo "✅ Docker images pushed successfully!"
"""
                    }
                }
            }
        }

        stage('Deploy Blue/Green') {
            steps {
                withCredentials([usernamePassword(credentialsId: '${data.dockerCreds}', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                    sshagent(credentials: ['${data.sshCreds}']) {
                        script {
                            echo '🚀 Starting Blue/Green Deployment with Cost Optimization...'

                            def currentTarget = sh(
                                script: """
aws elbv2 describe-rules \\
    --rule-arn ${G('ALB_RULE_ARN')} \\
    --region ${G('AWS_REGION')} \\
    --query "Rules[0].Actions[0].TargetGroupArn" \\
    --output text
""",
                                returnStdout: true
                            ).trim()

                            echo "DEBUG: Sorgulanan Aktif Target ARN: [${currentTarget}]"
                            if (currentTarget == null || currentTarget.isEmpty() || currentTarget == "None") {
                                error("❌ Aktif Target Group ARN alınamadı! AWS CLI sorgusu 'null' veya boş döndü.")
                            }

                            def isBlueActive = (currentTarget == ${G('ALB_LISTENER_ARN')})

                            def targetServer = isBlueActive ? ${G('GREEN_SERVER_IP')} : ${G('BLUE_SERVER_IP')}
                            def targetTG = isBlueActive ? ${G('GREEN_TG_ARN')} : ${G('BLUE_TG_ARN')}
                            def targetEnv = isBlueActive ? 'GREEN' : 'BLUE'
                            def targetInstanceId = isBlueActive ? ${G('GREEN_INSTANCE_ID')} : ${G('BLUE_INSTANCE_ID')}

                            def currentEnv = isBlueActive ? 'BLUE' : 'GREEN'
                            def oldInstanceId = isBlueActive ? ${G('BLUE_INSTANCE_ID')} : ${G('GREEN_INSTANCE_ID')}

                            env.CURRENT_ENV = currentEnv
                            env.DEPLOYED_ENV = targetEnv
                            env.DEPLOYED_SERVER = targetServer

                            echo "📍 Current active: ${currentEnv} (Instance: ${G('oldInstanceId')})"
                            echo "🎯 Target to deploy: ${targetEnv} (Instance: ${G('targetInstanceId')})"

                            // 1. ADIM: HEDEF INSTANCE'I BAŞLAT
                            echo "🔔 Starting target instance: ${G('targetInstanceId')}..."
                            sh "aws ec2 start-instances --instance-ids ${G('targetInstanceId')} --region ${G('AWS_REGION')}"

                            echo "⏳ Waiting for target instance to be RUNNING..."
                            sh "aws ec2 wait instance-running --instance-ids ${G('targetInstanceId')} --region ${G('AWS_REGION')}"

                            echo "⏳ Waiting for target instance status to be OK..."
                            sh "aws ec2 wait instance-status-ok --instance-ids ${G('targetInstanceId')} --region ${G('AWS_REGION')}"

                            echo "✅ Target instance is UP and READY!"

                            // 2. ADIM: DEPLOY (SSH -> DOCKER)
                            sh(
                                script: """
ssh -o StrictHostKeyChecking=no ec2-user@${G('targetServer')} <<'EOSSH'
set -Eeuo pipefail

echo "🧹 Cleaning up Docker on \\$(hostname)..."
docker rm -f myapp myapp-worker 2>/dev/null || true
docker image prune -af --filter "until=24h"

echo "🔐 Logging in to Docker Hub on remote server..."
echo "${G('DOCKER_PASS')}" | docker login -u ${G('DOCKER_USER')} --password-stdin

echo "📥 Pulling new image..."
docker pull ${G('DOCKER_IMAGE_NAME')}:${G('DOCKER_TAG')}

echo "🔑 Fetching application secrets from SSM Parameter Store..."
FB_ADMIN_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/firebase_admin_sdk_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
APP_ENV_VALUE=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/app_env --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
ACCESS_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/aws_access_key_id --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
SECRET_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/aws_secret_access_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
R_HOST=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/redis_host --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
R_PORT=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/redis_port --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
R_BROKER=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/redis_db_broker --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
R_BACKEND=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/redis_db_backend --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
REPLICATE_TOKEN=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/replicate_api_token --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
RAPIDAPI_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/rapidapi_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
SIEVE_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/sieve_api_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
YOUTUBE_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/youtube_api_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
SPOTIFY_ID=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/spotify_client_id --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
SPOTIFY_SECRET=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/spotify_client_secret --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
S3_BUCKET=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/s3_bucket_name --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
OPENAI_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/openai_api_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
MUREKA_KEY=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/mureka_api_key --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
MUREKA_ID=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/mureka_account_id --with-decryption --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
GEN_BUCKET=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/generated_songs_bucket --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})
CLOUDFRONT_URL=\\$(aws ssm get-parameter --name ${data.ssmPrefix}/cloudfront_domain --query 'Parameter.Value' --output text --region ${G('AWS_REGION')})

echo "✅ Application secrets & config fetched successfully."

FULL_REDIS_URL="redis://\\${R_HOST}:\\${R_PORT}/\\${R_BROKER}"

LOG_GROUP_NAME="/aws/ec2/${G('JOB_NAME')}"

echo "🚀 Starting new container for FastAPI Web Server (myapp)..."
LOG_STREAM_NAME_WEB="${targetEnv}-${G('DOCKER_TAG')}-web"

docker run -d \\
  --name myapp \\
  -p 8001:8001 \\
  --restart unless-stopped \\
  --health-cmd="curl -f http://localhost:8001/health || exit 1" \\
  --health-interval=30s \\
  --health-timeout=10s \\
  --health-retries=3 \\
  --health-start-period=30s \\
  -v sing-ai-uploads:/tmp/uploads \\
  -e BUILD_NUMBER=${G('DOCKER_TAG')} \\
  -e FIREBASE_ADMIN_SDK_KEY="\\$FB_ADMIN_KEY" \\
  -e APP_ENV="\\$APP_ENV_VALUE" \\
  -e AWS_ACCESS_KEY_ID="\\$ACCESS_KEY" \\
  -e AWS_SECRET_ACCESS_KEY="\\$SECRET_KEY" \\
  -e REDIS_URL="\\$FULL_REDIS_URL" \\
  -e REDIS_HOST="\\$R_HOST" \\
  -e REDIS_PORT="\\$R_PORT" \\
  -e REDIS_DB_BROKER="\\$R_BROKER" \\
  -e REDIS_DB_BACKEND="\\$R_BACKEND" \\
  -e REPLICATE_API_TOKEN="\\$REPLICATE_TOKEN" \\
  -e rapidapi_key="\\$RAPIDAPI_KEY" \\
  -e API_KEY="\\$SIEVE_KEY" \\
  -e youtube_api_key="\\$YOUTUBE_KEY" \\
  -e spotify_client_id="\\$SPOTIFY_ID" \\
  -e spotify_client_secret="\\$SPOTIFY_SECRET" \\
  -e s3_bucket_name="\\$S3_BUCKET" \\
  -e openai_api_key="\\$OPENAI_KEY" \\
  -e mureka_api_key="\\$MUREKA_KEY" \\
  -e mureka_account_id="\\$MUREKA_ID" \\
  -e generated_songs_bucket="\\$GEN_BUCKET" \\
  -e cloudfront_domain="\\$CLOUDFRONT_URL" \\
  -e PYTHONPATH=/ \\
  --log-driver=awslogs \\
  --log-opt awslogs-region=${G('AWS_REGION')} \\
  --log-opt awslogs-group=\\$LOG_GROUP_NAME \\
  --log-opt awslogs-stream=\\$LOG_STREAM_NAME_WEB \\
  --log-opt awslogs-create-group=true \\
  ${G('DOCKER_IMAGE_NAME')}:${G('DOCKER_TAG')}

echo "🚀 Starting new container for Celery Worker (myapp-worker)..."
LOG_STREAM_NAME_WORKER="${targetEnv}-${G('DOCKER_TAG')}-worker"

docker run -d \\
  --name myapp-worker \\
  --restart unless-stopped \\
  --no-healthcheck \\
  -v sing-ai-uploads:/tmp/uploads \\
  -e BUILD_NUMBER=${G('DOCKER_TAG')} \\
  -e FIREBASE_ADMIN_SDK_KEY="\\$FB_ADMIN_KEY" \\
  -e APP_ENV="\\$APP_ENV_VALUE" \\
  -e AWS_ACCESS_KEY_ID="\\$ACCESS_KEY" \\
  -e AWS_SECRET_ACCESS_KEY="\\$SECRET_KEY" \\
  -e REDIS_URL="\\$FULL_REDIS_URL" \\
  -e REDIS_HOST="\\$R_HOST" \\
  -e REDIS_PORT="\\$R_PORT" \\
  -e REDIS_DB_BROKER="\\$R_BROKER" \\
  -e REDIS_DB_BACKEND="\\$R_BACKEND" \\
  -e REPLICATE_API_TOKEN="\\$REPLICATE_TOKEN" \\
  -e rapidapi_key="\\$RAPIDAPI_KEY" \\
  -e API_KEY="\\$SIEVE_KEY" \\
  -e youtube_api_key="\\$YOUTUBE_KEY" \\
  -e spotify_client_id="\\$SPOTIFY_ID" \\
  -e spotify_client_secret="\\$SPOTIFY_SECRET" \\
  -e s3_bucket_name="\\$S3_BUCKET" \\
  -e openai_api_key="\\$OPENAI_KEY" \\
  -e mureka_api_key="\\$MUREKA_KEY" \\
  -e mureka_account_id="\\$MUREKA_ID" \\
  -e generated_songs_bucket="\\$GEN_BUCKET" \\
  -e cloudfront_domain="\\$CLOUDFRONT_URL" \\
  -e PYTHONPATH=/ \\
  --log-driver=awslogs \\
  --log-opt awslogs-region=${G('AWS_REGION')} \\
  --log-opt awslogs-group=\\$LOG_GROUP_NAME \\
  --log-opt awslogs-stream=\\$LOG_STREAM_NAME_WORKER \\
  --log-opt awslogs-create-group=true \\
  ${G('DOCKER_IMAGE_NAME')}:${G('DOCKER_TAG')} \\
  /app/.venv/bin/celery -A celery_worker.app worker --loglevel=info -Q chain_queue -c 2

echo "✅ Post-run verify:"
docker ps --filter "name=myapp"
EOSSH
                                """.stripIndent()
                            )

                            // 3. ADIM: HEALTH CHECK
                            echo '🏥 Running health checks on port 8001...'
                            def healthOk = false
                            sleep 10
                            for (int i = 0; i < 60; i++) {
                                def status = sh(
                                    script: """
curl -s -o /dev/null -w '%{http_code}' \\
    --connect-timeout 2 --max-time 5 \\
    http://${G('targetServer')}:8001/health || echo '000'
""",
                                    returnStdout: true
                                ).trim()
                                echo "Health check response: ${status}"
                                if (status == '200') { healthOk = true; break }
                                sleep 2
                            }
                            if (!healthOk) { error("❌ Health check failed after ~130 seconds!") }

                            // 4. ADIM: TRAFFIC SWITCH
                            echo '🔄 Switching traffic to new environment...'
                            sh """
aws elbv2 modify-rule \\
    --rule-arn ${G('ALB_RULE_ARN')} \\
    --actions Type=forward,TargetGroupArn=${G('targetTG')} \\
    --region ${G('AWS_REGION')}
"""
                            echo "✅ Traffic switched to ${targetEnv}!"

                            // 4.1. ADIM: ALARM YÖNETİMİ
                            echo "🔔 Updating CloudWatch Alarms configuration..."
                            sh """
aws cloudwatch enable-alarm-actions \\
    --alarm-names "singai-${targetEnv}-TG-UnHealthyHost-Alarm-Critical" \\
    --region ${G('AWS_REGION')}
"""
                            sh """
aws cloudwatch disable-alarm-actions \\
    --alarm-names "singai-${currentEnv}-TG-UnHealthyHost-Alarm-Critical" \\
    --region ${G('AWS_REGION')}
"""
                            echo "✅ Alarms updated: ${targetEnv} Actions ENABLED, ${currentEnv} Actions DISABLED."

                            // 5. ADIM: ESKİ MAKİNEYİ DURDUR
                            echo "💤 Stopping old instance (${G('oldInstanceId')}) to save costs..."
                            sh "aws ec2 stop-instances --instance-ids ${G('oldInstanceId')} --region ${G('AWS_REGION')}"

                            echo "🎉 Blue-Green deployment completed successfully!"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results.xml', allowEmptyResults: true
            publishHTML(
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'htmlcov',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            )
            archiveArtifacts artifacts: 'test-results.xml, coverage.xml, htmlcov/**', fingerprint: true, allowEmptyArchive: true
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }

        success {
            echo '✅ Pipeline completed successfully!'
            withCredentials([string(credentialsId: '${data.slackCreds}', variable: 'SLACK_URL')]) {
                script {
                    def encodedJobName = java.net.URLEncoder.encode(env.JOB_NAME, 'UTF-8')
                    def logGroupPath = "https://${G('AWS_REGION')}.console.aws.amazon.com/cloudwatch/home?region=${G('AWS_REGION')}#logsV2:log-groups/log-group/%2Faws%2Fec2%2F${encodedJobName}"
                    def text = "*Job:* <${G('BUILD_URL')}|${G('JOB_NAME')}>\\\\n*Build #:* ${G('BUILD_NUMBER')}\\\\n*Git Branch:* ${G('env.GIT_BRANCH')}\\\\n*Commit:* ${G('env.GIT_COMMIT')}\\\\n*Author:* ${G('env.GIT_AUTHOR')}\\\\n*Status:* SUCCESS ✅\\\\n*Traffic Switch:* ${G('env.CURRENT_ENV')} → *${G('env.DEPLOYED_ENV')}* (${G('env.DEPLOYED_SERVER')})\\\\n*Access URL:* http://${G('env.ALB_DNS_NAME')}\\\\n*Logs:* <${logGroupPath}|/aws/ec2/${G('JOB_NAME')}>"
                    def json = '{"username": "jenkins-bot", "icon_emoji": ":rocket:", "attachments": [{"color": "#36a64f", "title": "✅ Build Success", "text": "' + text + '", "footer": "Jenkins • Blue/Green Deployment", "ts": ' + (System.currentTimeMillis()/1000) + '}]}'

                    sh "curl -X POST --data-urlencode 'payload=${json}' ${G('SLACK_URL')}"
                }
            }
        }

        failure {
            echo '❌ Pipeline failed!'
            withCredentials([string(credentialsId: '${data.slackCreds}', variable: 'SLACK_URL')]) {
                script {
                    def encodedJobName = java.net.URLEncoder.encode(env.JOB_NAME, 'UTF-8')
                    def logGroupPath = "https://${G('AWS_REGION')}.console.aws.amazon.com/cloudwatch/home?region=${G('AWS_REGION')}#logsV2:log-groups/log-group/%2Faws%2Fec2%2F${encodedJobName}"
                    def text = "*Job:* <${G('BUILD_URL')}|${G('JOB_NAME')}>\\\\n*Build #:* ${G('BUILD_NUMBER')}\\\\n*Git Branch:* ${G('env.GIT_BRANCH')}\\\\n*Commit:* ${G('env.GIT_COMMIT')}\\\\n*Author:* ${G('env.GIT_AUTHOR')}\\\\n*Status:* FAILED ❌\\\\n*Access URL:* http://${G('env.ALB_DNS_NAME')}\\\\n*Logs:* <${logGroupPath}|/aws/ec2/${G('JOB_NAME')}>\\\\nCheck Jenkins logs for details."
                    def json = '{"username": "jenkins-bot", "icon_emoji": ":x:", "attachments": [{"color": "#ff0000", "title": "❌ Build Failed", "text": "' + text + '", "footer": "Jenkins • Blue/Green Deployment", "ts": ' + (System.currentTimeMillis()/1000) + '}]}'

                    sh "curl -X POST --data-urlencode 'payload=${json}' ${G('SLACK_URL')}"
                }
            }
        }
    }
}`;
}

// ============================================
// Initialize
// ============================================
function init() {
    // Check if landing page (no sidebar/menu elements)
    const isLandingPage = !document.getElementById('sidebar');

    if (isLandingPage) {
        return; // Landing page doesn't need initialization
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCodeBlocks();
            initKeyboardNav();
            initSearch();
            initJenkinsfileGenerator();
            initBluegreenGenerator();
        });
    } else {
        initCodeBlocks();
        initKeyboardNav();
        initSearch();
        initJenkinsfileGenerator();
        initBluegreenGenerator();
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
