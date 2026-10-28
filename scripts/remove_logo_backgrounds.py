import os
import glob
from PIL import Image, ImageChops

def convert_to_transparent_png(input_path, output_path, bg_thresh=6, fg_thresh=35):
    im = Image.open(input_path).convert('RGB')
    w, h = im.size
    
    r, g, b = im.split()
    r_d = r.point(lambda p: 255 - p)
    g_d = g.point(lambda p: 255 - p)
    b_d = b.point(lambda p: 255 - p)
    max_diff = ImageChops.lighter(r_d, ImageChops.lighter(g_d, b_d))
    
    lut = [0 if d <= bg_thresh else (255 if d >= fg_thresh else int(255 * (d - bg_thresh) / (fg_thresh - bg_thresh))) for d in range(256)]
    alpha = max_diff.point(lut)
    
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha)
    
    # Save optimized RGBA PNG
    rgba.save(output_path, 'PNG', optimize=True)
    print(f"Processed: {output_path} (size: {w}x{h}, alpha: {alpha.getextrema()})")

def main():
    logos_dir = 'public/images/logos'
    targets = [
        'vaivas-ventures-logo.png',
        'vaivas-ventures-logo-tight.png',
        'vaivas-jobs-logo.png',
        'vaivas-jobs-logo-tight.png',
        'vaivas-ads-logo.png',
        'vaivas-ads-logo-tight.png',
        'vaivas-ads.png',
        'vaivas-ads-tight.png',
    ]
    
    for filename in targets:
        dest_path = os.path.join(logos_dir, filename)
        bak_path = dest_path + '.original.bak'
        source_path = bak_path if os.path.exists(bak_path) else dest_path
        
        if os.path.exists(source_path):
            convert_to_transparent_png(source_path, dest_path)
            
    # Clean up test files
    for temp in glob.glob('public/images/logos/test-*'):
        try:
            os.remove(temp)
            print(f"Removed temp file: {temp}")
        except Exception:
            pass

if __name__ == '__main__':
    main()
