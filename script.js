document.getElementById("profile-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result;
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function updateResume() {
    document.getElementById("display-name").innerText = document.getElementById("name").value;
    document.getElementById("display-title").innerText = document.getElementById("title").value;
    document.getElementById("display-email").innerText = document.getElementById("email").value;
    document.getElementById("display-phone").innerText = document.getElementById("phone").value;
    document.getElementById("display-address").innerText = document.getElementById("address").value;
    document.getElementById("display-experience").innerText = document.getElementById("experience").value;
    document.getElementById("display-education").innerText = document.getElementById("education").value;
    document.getElementById("display-skills").innerText = document.getElementById("skills").value;
}

function downloadResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const imgData = document.getElementById("profile-pic").src;
    
    doc.addImage(imgData, 'JPEG', 150, 20, 40, 40); // Profile Image in PDF

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(document.getElementById("display-name").innerText, 20, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(document.getElementById("display-title").innerText, 20, 40);
    doc.text("Email: " + document.getElementById("display-email").innerText, 20, 50);
    doc.text("Phone: " + document.getElementById("display-phone").innerText, 20, 60);
    doc.text("Address: " + document.getElementById("display-address").innerText, 20, 70);

    doc.setFont("helvetica", "bold");
    doc.text("------------------------------------------------------", 20, 80); // Separator line
    doc.text("EXPERIENCE", 20, 90);
    doc.setFont("helvetica", "normal");
    doc.text(document.getElementById("display-experience").innerText, 20, 100);

    doc.setFont("helvetica", "bold");
    doc.text("------------------------------------------------------", 20, 120);
    doc.text("EDUCATION", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.text(document.getElementById("display-education").innerText, 20, 140);

    doc.setFont("helvetica", "bold");
    doc.text("------------------------------------------------------", 20, 160);
    doc.text("SKILLS", 20, 170);
    doc.setFont("helvetica", "normal");
    doc.text(document.getElementById("display-skills").innerText, 20, 180);

    doc.save("resume.pdf");
}
