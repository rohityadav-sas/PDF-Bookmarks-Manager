import os
import json
from PyPDF2 import PdfReader, PdfWriter

INPUT_PATH, OUTPUT_PATH = "./input", "./output"
METADATA_FILE, BOOKMARKS_FILE = "metadata.json", "bookmarks.json"

def load_file(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")
    with open(path, "r") as f:
        return json.load(f)

def add_metadata(writer, metadata): writer.add_metadata(metadata)

def add_bookmarks(writer, bookmarks, total_pages):
    for i, b in enumerate(bookmarks):
        if "index" not in b or "/" not in b["index"]:
            raise ValueError(f"Invalid bookmark: {b}")
        try:
            title, page = f"{i + 1}. {b['index'].split('/')[0]}", int(b['index'].split('/')[1]) - 1
            if not (0 <= page < total_pages): raise IndexError(f"Page {page + 1} out of range")
            parent = writer.add_outline_item(title, writer.pages[page])
            for j, c in enumerate(b.get("children", [])):
                ct, cp = f"{i + 1}.{j + 1} - {c.split('/')[0]}", int(c.split('/')[1]) - 1
                if not (0 <= cp < total_pages): raise IndexError(f"Child page {cp + 1} out of range")
                writer.add_outline_item(ct, writer.pages[cp], parent=parent)
        except Exception as e:
            raise RuntimeError(f"Error processing bookmark: {e}")

def add_pages(reader, writer): [writer.add_page(p) for p in reader.pages]

def process_pdf(file, metadata, bookmarks):
    in_path, out_path = os.path.join(INPUT_PATH, file), os.path.join(OUTPUT_PATH, file)
    with open(in_path, "rb") as f, open(out_path, "wb") as o:
        writer = PdfWriter()
        add_metadata(writer, metadata)
        add_pages(reader := PdfReader(f), writer)
        add_bookmarks(writer, bookmarks, len(reader.pages))
        os.makedirs(OUTPUT_PATH, exist_ok=True)
        writer.write(o)
    print(f"Processed: {file}")

def main():
    try:
        metadata, bookmarks = load_file(os.path.join(INPUT_PATH, METADATA_FILE)), load_file(os.path.join(INPUT_PATH, BOOKMARKS_FILE))
        [process_pdf(f, metadata, bookmarks) for f in os.listdir(INPUT_PATH) if f.endswith(".pdf")] or print("No PDF files found.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()