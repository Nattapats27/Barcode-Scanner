Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#scanner"),
        constraints: {
            width: 300,
            height: 200,
            facingMode: "environment"
        },
    },
    decoder: {
        readers: ["ean_reader"]
    }
}, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

let scannedBarcodes = [];
let barcodeInput = document.getElementById('barcode-input');

Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    console.log("Barcode detected and processed: ", code);
    if (!scannedBarcodes.includes(code)) {
        scannedBarcodes.push(code);
        if (scannedBarcodes.length === 2) {
            checkBarcodes(scannedBarcodes[0], scannedBarcodes[1]);
            scannedBarcodes = [];
        }
    }
});

function checkBarcodes(barcode1, barcode2) {
    // Here you would compare the scanned barcodes
    // For demonstration purpose, let's assume they should match
    if (barcode1 === barcode2) {
        document.getElementById("result").innerHTML = "OK";
    } else {
        document.getElementById("result").innerHTML = "NG";
    }
}
