import os
import cv2
import pytesseract
import numpy as np

pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'
src_dir = '/Users/shikha/Downloads/x-med'

def preprocess_image(image_path):
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        return None
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Resize image to make text bigger
    gray = cv2.resize(gray, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    
    # Apply Gaussian blur to smooth out noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Thresholding
    threshold = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    
    return threshold

def ocr_advanced():
    files = sorted([f for f in os.listdir(src_dir) if f.endswith(('.png', '.jpeg', '.jpg'))])
    print("Running advanced OCR pre-processing...")
    
    for f in files:
        if f == '.DS_Store':
            continue
        path = os.path.join(src_dir, f)
        try:
            processed_img = preprocess_image(path)
            if processed_img is None:
                continue
                
            text = pytesseract.image_to_string(processed_img)
            clean_text = " ".join(text.split())
            
            # Print if we find anything useful
            print(f"File: {f}")
            print(f"  Processed OCR: {clean_text[:300]}")
            print("-" * 50)
        except Exception as e:
            print(f"Error processing {f}: {e}")

if __name__ == '__main__':
    ocr_advanced()
