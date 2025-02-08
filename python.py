from flask import Flask, render_template, request, send_file
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def resume():
    if request.method == 'POST':
        user_data = {
            'name': request.form['name'],
            'email': request.form['email'],
            'phone': request.form['phone'],
            'location': request.form['location'],
            'experience': request.form['experience'],
            'education': request.form['education'],
            'skills': request.form['skills'],
            'languages': request.form['languages']
        }
        return generate_pdf(user_data)
    return render_template('resume_form.html')

def generate_pdf(data):
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setFont("Helvetica-Bold", 16)
    
    # Header
    pdf.drawString(50, 750, data['name'])
    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, 730, f"{data['email']} | {data['phone']} | {data['location']}")
    pdf.line(50, 720, 550, 720)

    # Sections
    sections = ["EXPERIENCE", "EDUCATION", "SKILLS", "LANGUAGES"]
    y_pos = 700
    for section in sections:
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(50, y_pos, section)
        pdf.setFont("Helvetica", 12)
        pdf.drawString(50, y_pos - 20, data[section.lower()])
        y_pos -= 60

    pdf.save()
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="resume.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
