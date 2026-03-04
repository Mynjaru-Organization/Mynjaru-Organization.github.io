const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const status = params.get("status");

const box = document.getElementById("download-box");

if (status === "transmitting" && file) {
    box.innerHTML = `
        <h2>Receiving file from Mynjaru-Downloader...</h2>
        <p>File: <strong>${file}</strong></p>
        <div class="progress">
            <div class="bar"></div>
        </div>
    `;

    let bar = document.querySelector(".bar");
    let width = 0;

    let interval = setInterval(() => {
        width += 2;
        bar.style.width = width + "%";

        if (width >= 100) {
            clearInterval(interval);

            // ⭐ CREATE A 0-BYTE FILE AND TRIGGER DOWNLOAD ⭐
            const emptyFile = new Blob([], { type: "application/octet-stream" });
            const url = URL.createObjectURL(emptyFile);

            const a = document.createElement("a");
            a.href = url;
            a.download = file; // exact name + extension
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            // Update UI after download
            box.innerHTML = `
                <h2>Download Complete</h2>
                <p><strong>${file}</strong> has been created.</p>
            `;
        }
    }, 50);
}
