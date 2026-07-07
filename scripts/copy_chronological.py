import os
import re
import shutil

src_dir = '/Users/shikha/Downloads/x-med'
dest_dir = '/Users/shikha/x-med-shop/public/images'
dest_xmed = '/Users/shikha/x-med-shop/x-med'

os.makedirs(dest_dir, exist_ok=True)
os.makedirs(dest_xmed, exist_ok=True)

def parse_time(filename):
    # Extracts "12_40_08 AM" or "01_51_40 AM" from the filename
    match = re.search(r'(\d{2})_(\d{2})_(\d{2})\s*(AM|PM)', filename, re.IGNORECASE)
    if not match:
        # Fallback to secondary pattern if any
        return 0
    
    hh, mm, ss, period = match.groups()
    hh = int(hh)
    mm = int(mm)
    ss = int(ss)
    
    if period.upper() == 'PM' and hh != 12:
        hh += 12
    elif period.upper() == 'AM' and hh == 12:
        hh = 0
        
    return hh * 3600 + mm * 60 + ss

def copy_chronologically():
    png_files = [f for f in os.listdir(src_dir) if f.endswith('.png')]
    # Sort files by their timestamp parsed from the filename
    png_files.sort(key=parse_time)
    
    print(f"Sorted {len(png_files)} png files chronologically:")
    for idx, f in enumerate(png_files):
        time_sec = parse_time(f)
        print(f"  {idx}: {f} -> time={time_sec}s")
        
        src_path = os.path.join(src_dir, f)
        dest_filename = f"xmed{idx + 4}.png"
        
        # Copy to public/images/
        shutil.copy2(src_path, os.path.join(dest_dir, dest_filename))
        # Copy to x-med/
        shutil.copy2(src_path, os.path.join(dest_xmed, dest_filename))
        
    # Copy the JPEGs (x-med1, x-med2, x-med3) as well
    # x-med3 (1).jpeg (size 158248) -> xmed1.jpeg
    # x-med1 (1).jpeg (size 183410) -> xmed2.jpeg
    # x-med2 (1).jpeg (size 178794) -> xmed3.jpeg
    jpeg_mappings = {
        "x-med3 (1).jpeg": "xmed1.jpeg",
        "x-med1 (1).jpeg": "xmed2.jpeg",
        "x-med2 (1).jpeg": "xmed3.jpeg"
    }
    
    for src_name, dest_name in jpeg_mappings.items():
        src_path = os.path.join(src_dir, src_name)
        if os.path.exists(src_path):
            print(f"Copying JPEG: {src_name} -> {dest_name}")
            shutil.copy2(src_path, os.path.join(dest_dir, dest_name))
            shutil.copy2(src_path, os.path.join(dest_xmed, dest_name))
            
    print("Chronological copy completed successfully!")

if __name__ == '__main__':
    copy_chronologically()
