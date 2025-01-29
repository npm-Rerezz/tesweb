const form = document.getElementById('server-form');
const responseMessage = document.getElementById('response-message');
const modal = document.getElementById('serverModal');
const closeModal = document.querySelector('.close');

const ramSelect = document.getElementById('ram');
const keyInput = document.getElementById('key'); 

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const ramSelection = ramSelect.value;
    const key = keyInput.value; 

    let ram = 0, disk = 0, cpu = 0;

    switch (ramSelection) {
        case 'panel1gb':
            ram = 1000;
            disk = 1000;
            cpu = 50;
            break;
        case 'panel2gb':
            ram = 2000;
            disk = 2000;
            cpu = 100;
            break;
        case 'panel3gb':
            ram = 3000;
            disk = 3000;
            cpu = 150;
            break;
        case 'panel4gb':
            ram = 4000;
            disk = 4000;
            cpu = 200;
            break;
        case 'panel5gb':
            ram = 5000;
            disk = 5000;
            cpu = 250;
            break;
        case 'panel6gb':
            ram = 6000;
            disk = 6000;
            cpu = 300;
            break;
        case 'panel7gb':
            ram = 7000;
            disk = 7000;
            cpu = 350;
            break;
        case 'panel8gb':
            ram = 8000;
            disk = 8000;
            cpu = 400;
            break;
        case 'panel9gb':
            ram = 9000;
            disk = 9000;
            cpu = 450;
            break;
        case 'panel10gb':
            ram = 10000;
            disk = 10000;
            cpu = 500;
            break;
        case 'panel11gb':
            ram = 11000;
            disk = 11000;
            cpu = 550;
            break;
        case 'panel12gb':
            ram = 12000;
            disk = 12000;
            cpu = 600;
            break;
        case 'panel13gb':
            ram = 13000;
            disk = 13000;
            cpu = 650;
            break;
        case 'panel14gb':
            ram = 14000;
            disk = 14000;
            cpu = 700;
            break;
        case 'panel15gb':
            ram = 15000;
            disk = 15000;
            cpu = 750;
            break;
        case 'panel16gb':
            ram = 16000;
            disk = 16000;
            cpu = 800;
            break;
        case 'panel17gb':
            ram = 17000;
            disk = 17000;
            cpu = 850;
            break;
        case 'panel18gb':
            ram = 18000;
            disk = 18000;
            cpu = 900;
            break;
        case 'panel19gb':
            ram = 19000;
            disk = 19000;
            cpu = 950;
            break;
        case 'panel20gb':
            ram = 20000;
            disk = 20000;
            cpu = 1000;
            break;
        case 'panelunli':
            ram = 0;
            disk = 0;
            cpu = 0;
            break;
        default:
            return showResponse('❌ Semua input harus diisi!', true);
    }
    if (!username || !key) {
        return showResponse('❌ Semua input harus diisi!', true);
    }
    try {
        const response = await fetch('/create-server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.trim(), ram: ram, disk: disk, cpu: cpu, key: key.trim() })
        });
        const data = await response.json();
        if (response.ok) {
            showResponse(`✅ Server berhasil dibuat! ID Server: ${data.serverInfo.server.id}`, false);
            displayServerInfo(data.serverInfo);
            openModal(); 
        } else {
            showResponse(`❌ Error: ${data.message}`, true);
        }
    } catch (error) {
        console.error(error);
        showResponse('❌ Terjadi kesalahan saat membuat server. Harap coba lagi.', true);
    }
});
function showResponse(message, isError) {
    responseMessage.textContent = message;
    responseMessage.style.color = isError ? 'red' : 'green';
}
function displayServerInfo(serverInfo) {
    document.getElementById('modal-username').textContent = serverInfo.user.username;
    document.getElementById('modal-password').textContent = serverInfo.credentials.password;
    document.getElementById('modal-domain').textContent = serverInfo.credentials.login_url;
    document.getElementById('modal-id').textContent = serverInfo.server.id;
    document.getElementById('modal-ram').textContent = serverInfo.server.memory + ' MB';
    document.getElementById('modal-disk').textContent = serverInfo.server.disk + ' MB';
    document.getElementById('modal-cpu').textContent = serverInfo.server.cpu + ' %';
    document.getElementById('modal-email').textContent = serverInfo.user.email;
}
function openModal() {
    modal.style.display = 'block';
}
closeModal.onclick = function () {
    modal.style.display = 'none';
}