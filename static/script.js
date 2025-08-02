let currentQRCodeUrl = null;

async function generateQRCode() {
    const text = document.getElementById('text').value;
    if (!text) {
        alert('Please enter some text');
        return;
    }

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        if (response.ok) {
            const blob = await response.blob();
            if (currentQRCodeUrl) {
                URL.revokeObjectURL(currentQRCodeUrl);
            }
            currentQRCodeUrl = URL.createObjectURL(blob);
            const qrcodeDiv = document.getElementById('qrcode');
            qrcodeDiv.innerHTML = `<img src="${currentQRCodeUrl}" alt="QR Code">`;
            document.getElementById('download-container').style.display = 'block';
        } else {
            alert('Error generating QR code');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating QR code');
    }
}

function downloadQRCode() {
    if (!currentQRCodeUrl) {
        alert('Please generate a QR code first');
        return;
    }

    const link = document.createElement('a');
    link.href = currentQRCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
