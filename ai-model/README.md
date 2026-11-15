# Model AI BONI

Folder ini menyimpan model deteksi sampah dan alat eksperimen YOLO. Layanan Python bersifat opsional untuk aplikasi web. Jalur demo standar berjalan tanpa menjalankan layanan ini. [README utama](../README.md)

## Layanan inferensi lokal

Siapkan Python 3.11 atau 3.12. Jalankan dari folder `ai-model/`. Contoh untuk PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt fastapi uvicorn python-multipart
.\.venv\Scripts\python.exe server.py
```

Di Linux atau macOS, gunakan interpreter `.venv/bin/python` untuk menjalankan perintah yang sama. [server.py](server.py) memuat [best.pt](models/best.pt) dan menggunakan `pacul_waste_yolo11n.pt` bila berkas utama tidak tersedia. Periksa [GET /health](http://127.0.0.1:8000/health). `POST /predict` menerima gambar pada kolom `file` dan mengembalikan deteksi beserta bounding box.

Handler web memeriksa layanan lewat `YOLO_SERVICE_URL`, dengan default `http://127.0.0.1:8000`. Tata cara akses demo web tersedia di [README backend](../backend/README.md).

## Model dan skrip

- [data.yaml](data.yaml) mendefinisikan lima kelas deteksi: sampah plastik, kardus, jelantah, organik, dan kertas.
- [models/](models/) menyimpan bobot `.pt` dan hasil ekspor `.onnx`. Deteksi objek ini memakai kelas tersendiri. Aturan perolehan EcoPoints di website ada di [konfigurasi web](../src/config/eco-points.ts).
- [scripts/](scripts/) memuat alat untuk menyiapkan data, melatih model, menguji gambar, dan mengekspor model. Dataset dan hasil latihan lokal memiliki direktori sendiri sesuai [konfigurasi data](data.yaml) dan [.gitignore](../.gitignore).

Jalankan prediksi atau ekspor dengan bobot yang disertakan:

```bash
python scripts/3_eval_and_predict.py --model models/best.pt --source foto-sampah.jpg
python scripts/4_export_model.py --model models/best.pt --format onnx
```
