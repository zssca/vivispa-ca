#!/usr/bin/env python3
import os
import sys
import argparse
from pathlib import Path
from PIL import Image, ImageOps
import tkinter as tk
from tkinter import filedialog, ttk, messagebox

def convert_to_webp(source_dir, recursive=True, delete_original=False, quality=90, 
                   lossless=False, formats=None, confirm_delete=False, resize=False,
                   target_width=1080, target_height=720, smart_resize=True, debug=False):
    """
    Convert images to WebP format, strip metadata, and optionally resize.
    
    Args:
        source_dir: Directory containing images to convert
        recursive: Whether to search subdirectories
        delete_original: Whether to delete original image files after conversion
        quality: Quality of WebP image (0-100, ignored if lossless is True)
        lossless: Whether to use lossless compression
        formats: List of image formats to convert (None for all supported formats)
        confirm_delete: Whether to confirm before deleting original files
        resize: Whether to resize images
        target_width: Target width for resized images (default: 1080)
        target_height: Target height for resized images (default: 720)
        smart_resize: Whether to use smart resizing (maintain aspect ratio and only resize larger images)
        debug: Whether to print debug messages
    """
    source_path = Path(source_dir)
    
    if not source_path.exists():
        print(f"Error: Directory {source_dir} does not exist")
        return
    
    # Default supported formats
    supported_formats = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff']
    if formats:
        image_formats = formats
    else:
        image_formats = supported_formats
    
    # Create glob patterns for all formats
    patterns = [f"**/*.{fmt}" if recursive else f"*.{fmt}" for fmt in image_formats]
    
    # Find all matching image files
    image_files = []
    for pattern in patterns:
        image_files.extend(list(source_path.glob(pattern)))
    
    if not image_files:
        print(f"No images found in {source_dir} with formats: {', '.join(image_formats)}")
        return
    
    print(f"Found {len(image_files)} image files to convert")
    
    if resize:
        print(f"Resize enabled: Target dimensions {target_width}x{target_height}, Smart resize: {smart_resize}")
    
    converted_count = 0
    error_count = 0
    resized_count = 0
    
    for img_file in image_files:
        try:
            # Try to open the image file to validate it
            with Image.open(img_file) as img:
                # Create webp directory in the same location as the original file
                webp_dir = img_file.parent / "webp"
                webp_dir.mkdir(exist_ok=True)
                
                # Create output path in the webp subfolder with the same name
                webp_path = webp_dir / f"{img_file.stem}.webp"
                
                # Resize image if requested
                original_size = img.size
                resized = False
                
                if debug:
                    print(f"Processing {img_file}: Original size: {original_size}, Resize requested: {resize}")
                
                # Copy the image to avoid modifying the original during processing
                processed_img = img.copy()
                
                if resize:
                    if smart_resize:
                        # Only resize if image is larger than target dimensions
                        if original_size[0] > target_width or original_size[1] > target_height:
                            # Calculate aspect ratios
                            img_aspect = original_size[0] / original_size[1]
                            target_aspect = target_width / target_height
                            
                            if img_aspect > target_aspect:
                                # Image is wider than target aspect ratio
                                new_width = target_width
                                new_height = int(new_width / img_aspect)
                            else:
                                # Image is taller than target aspect ratio
                                new_height = target_height
                                new_width = int(new_height * img_aspect)
                            
                            # Perform resize with high-quality resampling
                            processed_img = processed_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                            resized = True
                            resized_count += 1
                            
                            if debug:
                                print(f"Resized to: {new_width}x{new_height}")
                    else:
                        # Crop to fill target dimensions, maintaining aspect ratio
                        processed_img = ImageOps.fit(processed_img, (target_width, target_height), Image.Resampling.LANCZOS)
                        resized = True
                        resized_count += 1
                        
                        if debug:
                            print(f"Cropped to fit: {target_width}x{target_height}")
                
                # Convert to WebP without metadata
                if lossless:
                    processed_img.save(webp_path, format='WEBP', lossless=True)
                else:
                    processed_img.save(webp_path, format='WEBP', quality=quality)
                
                # Delete original if requested
                if delete_original:
                    if confirm_delete:
                        response = input(f"Delete original file {img_file}? (y/n): ")
                        if response.lower() != 'y':
                            print(f"Keeping original: {img_file}")
                            action = "Converted (kept original)"
                        else:
                            os.remove(img_file)
                            action = "Converted and deleted original"
                    else:
                        os.remove(img_file)
                        action = "Converted and deleted original"
                else:
                    action = "Converted"
                
                if resized:
                    action = f"{action} and resized from {original_size[0]}x{original_size[1]} to {processed_img.size[0]}x{processed_img.size[1]}"
                
                print(f"{action}: {img_file} → {webp_path}")
                converted_count += 1
                
        except Exception as e:
            print(f"Error converting {img_file}: {e}")
            error_count += 1
    
    result = f"Conversion complete: {converted_count} files converted, {resized_count} files resized, {error_count} errors"
    print(result)
    return result

class WebPConverterGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("WebP Converter")
        self.geometry("600x650")
        self.resizable(True, True)
        
        # Create main frame with padding
        main_frame = ttk.Frame(self, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Source directory selection
        dir_frame = ttk.Frame(main_frame)
        dir_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(dir_frame, text="Source Directory:").pack(side=tk.LEFT, padx=5)
        self.source_dir = tk.StringVar()
        ttk.Entry(dir_frame, textvariable=self.source_dir, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        ttk.Button(dir_frame, text="Browse...", command=self.browse_directory).pack(side=tk.LEFT, padx=5)
        
        # Options frame
        options_frame = ttk.LabelFrame(main_frame, text="Conversion Options", padding="10")
        options_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        # Recursive option
        self.recursive = tk.BooleanVar(value=True)
        ttk.Checkbutton(options_frame, text="Search Subdirectories", variable=self.recursive).grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
        
        # Delete original option
        self.delete_original = tk.BooleanVar(value=False)
        ttk.Checkbutton(options_frame, text="Delete Original Files", variable=self.delete_original).grid(row=0, column=1, sticky=tk.W, padx=5, pady=5)
        
        # Confirm delete option
        self.confirm_delete = tk.BooleanVar(value=False)
        ttk.Checkbutton(options_frame, text="Confirm Deletions", variable=self.confirm_delete).grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
        
        # Debug option
        self.debug = tk.BooleanVar(value=False)
        ttk.Checkbutton(options_frame, text="Debug Mode", variable=self.debug).grid(row=1, column=1, sticky=tk.W, padx=5, pady=5)
        
        # Quality option
        quality_frame = ttk.Frame(options_frame)
        quality_frame.grid(row=2, column=0, columnspan=2, sticky=tk.W, padx=5, pady=5)
        
        ttk.Label(quality_frame, text="Quality:").pack(side=tk.LEFT, padx=5)
        self.quality = tk.IntVar(value=90)
        ttk.Spinbox(quality_frame, from_=1, to=100, textvariable=self.quality, width=5).pack(side=tk.LEFT, padx=5)
        
        # Lossless option
        self.lossless = tk.BooleanVar(value=False)
        ttk.Checkbutton(options_frame, text="Lossless Compression", variable=self.lossless).grid(row=3, column=0, sticky=tk.W, padx=5, pady=5)
        
        # Formats option
        formats_frame = ttk.Frame(options_frame)
        formats_frame.grid(row=4, column=0, columnspan=2, sticky=tk.W, padx=5, pady=5)
        
        ttk.Label(formats_frame, text="Formats to Convert:").pack(side=tk.LEFT, padx=5)
        self.formats = tk.StringVar(value="png,jpg,jpeg,gif,bmp,tiff")
        ttk.Entry(formats_frame, textvariable=self.formats, width=30).pack(side=tk.LEFT, padx=5)
        
        # Resize options
        resize_frame = ttk.LabelFrame(options_frame, text="Resize Options", padding="5")
        resize_frame.grid(row=5, column=0, columnspan=2, sticky=tk.EW, padx=5, pady=10)
        
        self.resize = tk.BooleanVar(value=False)
        self.resize_check = ttk.Checkbutton(resize_frame, text="Resize Images", variable=self.resize, command=self.toggle_resize_options)
        self.resize_check.grid(row=0, column=0, sticky=tk.W, padx=5, pady=5)
        
        # Width and height
        self.dimensions_frame = ttk.Frame(resize_frame)
        self.dimensions_frame.grid(row=1, column=0, sticky=tk.W, padx=5, pady=5)
        
        ttk.Label(self.dimensions_frame, text="Width:").pack(side=tk.LEFT, padx=5)
        self.width = tk.IntVar(value=1080)
        ttk.Spinbox(self.dimensions_frame, from_=1, to=10000, textvariable=self.width, width=5).pack(side=tk.LEFT, padx=5)
        
        ttk.Label(self.dimensions_frame, text="Height:").pack(side=tk.LEFT, padx=5)
        self.height = tk.IntVar(value=720)
        ttk.Spinbox(self.dimensions_frame, from_=1, to=10000, textvariable=self.height, width=5).pack(side=tk.LEFT, padx=5)
        
        # Smart resize option
        self.smart_resize = tk.BooleanVar(value=True)
        self.smart_resize_check = ttk.Checkbutton(resize_frame, text="Smart Resize (maintain aspect ratio, only resize larger images)", 
                        variable=self.smart_resize)
        self.smart_resize_check.grid(row=2, column=0, sticky=tk.W, padx=5, pady=5)
        
        # Initialize resize options state
        self.toggle_resize_options()
        
        # Status and progress
        self.status_var = tk.StringVar(value="Ready")
        ttk.Label(main_frame, textvariable=self.status_var, wraplength=580).pack(fill=tk.X, pady=5)
        
        # Log output
        log_frame = ttk.LabelFrame(main_frame, text="Log", padding="5")
        log_frame.pack(fill=tk.BOTH, expand=True, pady=5)
        
        self.log_text = tk.Text(log_frame, height=5, wrap=tk.WORD)
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Add a scrollbar
        scrollbar = ttk.Scrollbar(self.log_text, command=self.log_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.log_text.config(yscrollcommand=scrollbar.set)
        
        # Make log read-only
        self.log_text.config(state=tk.DISABLED)
        
        # Buttons frame
        buttons_frame = ttk.Frame(main_frame)
        buttons_frame.pack(fill=tk.X, pady=10)
        
        ttk.Button(buttons_frame, text="Convert", command=self.start_conversion).pack(side=tk.RIGHT, padx=5)
        ttk.Button(buttons_frame, text="Quit", command=self.quit).pack(side=tk.RIGHT, padx=5)
    
    def toggle_resize_options(self):
        """Enable or disable resize options based on resize checkbox state"""
        if self.resize.get():
            # Enable all resize options
            for child in self.dimensions_frame.winfo_children():
                child.configure(state='normal')
            self.smart_resize_check.configure(state='normal')
        else:
            # Disable all resize options
            for child in self.dimensions_frame.winfo_children():
                child.configure(state='disabled')
            self.smart_resize_check.configure(state='disabled')
    
    def log(self, message):
        """Add a message to the log text widget"""
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)
        self.update_idletasks()
    
    def browse_directory(self):
        directory = filedialog.askdirectory(title="Select Directory Containing Images")
        if directory:
            self.source_dir.set(directory)
    
    def start_conversion(self):
        source_dir = self.source_dir.get()
        if not source_dir:
            messagebox.showerror("Error", "Please select a source directory")
            return
        
        # Clear log
        self.log_text.config(state=tk.NORMAL)
        self.log_text.delete(1.0, tk.END)
        self.log_text.config(state=tk.DISABLED)
        
        # Get formats list
        formats_str = self.formats.get()
        formats_list = [fmt.strip() for fmt in formats_str.split(",")] if formats_str else None
        
        # Show conversion parameters in log
        self.log(f"Source directory: {source_dir}")
        self.log(f"Recursive: {self.recursive.get()}")
        self.log(f"Resize: {self.resize.get()}")
        if self.resize.get():
            self.log(f"Target dimensions: {self.width.get()}x{self.height.get()}")
            self.log(f"Smart resize: {self.smart_resize.get()}")
        
        try:
            self.status_var.set("Converting...")
            self.update_idletasks()
            
            # Redirect stdout to log
            original_stdout = sys.stdout
            sys.stdout = self
            
            result = convert_to_webp(
                source_dir,
                recursive=self.recursive.get(),
                delete_original=self.delete_original.get(),
                quality=self.quality.get(),
                lossless=self.lossless.get(),
                formats=formats_list,
                confirm_delete=self.confirm_delete.get(),
                resize=self.resize.get(),
                target_width=self.width.get(),
                target_height=self.height.get(),
                smart_resize=self.smart_resize.get(),
                debug=self.debug.get()
            )
            
            # Restore stdout
            sys.stdout = original_stdout
            
            self.status_var.set(result)
            messagebox.showinfo("Conversion Complete", result)
            
        except Exception as e:
            # Restore stdout
            sys.stdout = original_stdout
            
            error_msg = f"Error: {e}"
            self.log(error_msg)
            self.status_var.set(error_msg)
            messagebox.showerror("Error", f"An error occurred: {e}")
    
    def write(self, text):
        """Implement write method to redirect stdout to log"""
        self.log(text.rstrip())
        return len(text)
    
    def flush(self):
        """Implement flush method for stdout compatibility"""
        pass

def run_gui():
    app = WebPConverterGUI()
    app.mainloop()

if __name__ == "__main__":
    # Check if any command-line arguments were provided
    if len(sys.argv) > 1:
        # Run in command-line mode
        parser = argparse.ArgumentParser(description='Convert images to WebP format')
        parser.add_argument('directory', help='Directory containing images to convert')
        parser.add_argument('--no-recursive', action='store_true', help='Do not search subdirectories')
        parser.add_argument('--delete-original', action='store_true', help='Delete original image files after conversion')
        parser.add_argument('--confirm-delete', action='store_true', help='Confirm before deleting each original file')
        parser.add_argument('--quality', type=int, default=90, help='WebP quality (0-100, default: 90)')
        parser.add_argument('--lossless', action='store_true', help='Use lossless compression')
        parser.add_argument('--formats', nargs='+', help='Image formats to convert (default: all supported formats)')
        parser.add_argument('--resize', action='store_true', help='Resize images during conversion')
        parser.add_argument('--width', type=int, default=1080, help='Target width for resized images (default: 1080)')
        parser.add_argument('--height', type=int, default=720, help='Target height for resized images (default: 720)')
        parser.add_argument('--no-smart-resize', action='store_true', help='Crop image to fill target dimensions (e.g., 1080x720), maintaining aspect ratio. Default is to fit within dimensions.')
        parser.add_argument('--debug', action='store_true', help='Print debug information')
        
        args = parser.parse_args()
        
        convert_to_webp(
            args.directory, 
            recursive=not args.no_recursive,
            delete_original=args.delete_original,
            quality=args.quality,
            lossless=args.lossless,
            formats=args.formats,
            confirm_delete=args.confirm_delete,
            resize=args.resize,
            target_width=args.width,
            target_height=args.height,
            smart_resize=not args.no_smart_resize,
            debug=args.debug
        )
    else:
        # Run in GUI mode
        run_gui() 