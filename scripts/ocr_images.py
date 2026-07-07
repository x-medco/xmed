import os
from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'

src_dir = '/Users/shikha/Downloads/x-med'

def ocr_all():
    files = sorted([f for f in os.listdir(src_dir) if f.endswith(('.png', '.jpeg', '.jpg'))])
    print(f"Running OCR on {len(files)} files in {src_dir}...")
    
    for f in files:
        if f == '.DS_Store':
            continue
        path = os.path.join(src_dir, f)
        try:
            img = Image.open(path)
            # Perform OCR on the image
            text = pytesseract.image_to_string(img)
            # Clean up the text
            clean_text = " ".join(text.split())
            print(f"File: {f} | Size: {os.path.getsize(path)}")
            print(f"  OCR Text: {clean_text[:200]}")
            print("-" * 50)
        except Exception as e:
            print(f"Error processing {f}: {e}")

if __name__ == '__main__':
    ocr_all()
