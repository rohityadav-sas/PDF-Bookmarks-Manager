## PDF-Bookmarks-Manager

This repository provides tools to manage PDF metadata and bookmarks using either **Node.js** or **Python**.

## Table of Contents

- [Overviews](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
  - [Node.js](#nodejs-prerequisites)
  - [Python](#python-prequisites)
- [Configuration](#configuration)
- [Bookmarks Format Guide](#bookmarksjson-format-guide)
  - [Explanation](#explanation)
  - [File Structure](#file-structure)
  - [Preview](#preview)
- [Installation](#installation)
  - [Node.js](#nodejs-implementation)
  - [Python](#python-implementation)
- [Dependencies](#dependencies)
  - [Node.js](#nodejs-dependencies)
  - [Python](#python-dependencies)
- [License](#license)
- [Contributing](#contributing)

## Overview

This repository provides two implementations for managing PDF metadata and bookmarks:

1. **Node.js Implementation**: Uses the Sejda API for processing.
2. **Python Implementation**: Uses the PyPDF2 library for local processing.

## Features

- Edit PDF metadata (title, author, subject) with ease.
- Create and manage bookmarks for PDFs, including hierarchical structures.
- Node.js version leverages Sejda API for robust processing.
- Python version performs all operations locally.

## Prerequisites

### Node.js Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Python Prequisites

- Python (v3.8 or higher)
- pip (v21 or higher)

## Configuration

Place these required files in the input folder:

- **PDF file**: The PDF file for which you want to edit metadata and create bookmarks.
- **metadata.json**: Contains metadata such as title, author, and subject for the PDF. The format is as follows:

  ```json
  {
  	"title": "Sample PDF",
  	"author": "John Doe",
  	"subject": "Sample Subject"
  }
  ```

- **bookmarks.json**: Bookmark hierarchy with title, page numbers, and parent-child relationships. See the [Bookmarks Format Guide](#bookmarks-format-guide) for details.

## Bookmarks Format Guide

### Explanation:

1. **index**: The title and starting page of the section, separated by a /. For example:

   - ```json
     "index": "Table of Contents/2"
     ```
     This means the section **Table of Contents** starts on page **2**.

2. **children**: Defines sub-sections or exercises under a parent bookmark.

   - ```json
     "Exercise 1/3"
     ```
     This indicates a bookmark titled **Exercise 1** starts on page **3**.

3. **Hierarchy**:

   - Parent bookmarks contain a children array with their sub-bookmarks.
   - Sub-bookmarks within a child (level 3 or deeper) are not currently added.

### File Structure:

```json
[
	{
		"index": "Table of Contents/2"
	},
	{
		"index": "Complex Analysis/2",
		"children": [
			"Exercise 1/3",
			"Exercise 2/6",
			"Exercise 3/11",
			"Exercise 4/17"
		]
	},
	{
		"index": "The Z-Transform/51",
		"children": [
			"Exercise 5/43",
			"Exercise 6/52",
			"Exercise 7/70",
			"Exercise 8/85"
		]
	},
	{
		"index": "Partial Differential Equation/108",
		"children": [
			"Exercise 9/113",
			"Exercise 10/119",
			"Exercise 11/126",
			"Exercise 12/136"
		]
	}
]
```

### Preview

This is how the bookmarks will look in the PDF viewer:

![Bookmarks Preview](./assets/preview.png?raw=true)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/rohityadav-sas/PDF-Bookmarks-Creator.git
   ```

2. Navigate to the project directory:

   ```sh
   cd PDF-Bookmarks-Creator
   ```

3. Choose the implementation you want to use:

   - For **Node.js**, see the [Node.js](#nodejs-implementation) section.
   - For **Python**, see the [Python](#python-implementation) section.

### Node.js Implementation

1. Navigate to the nodejs directory:

   ```sh
   cd nodejs
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Prepare the configuration files as described in the [Usage](#usage) section.

4. Run the program:

   ```sh
   npm start
   ```

### Python Implementation

1. Navigate to the python directory:

   ```sh
   cd python
   ```

2. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

3. Prepare the configuration files as described in the [Configuration](#configuration) section.

4. Run the program:

   ```sh
   python main.py
   ```

## Dependencies

### Node.js Dependencies

- **axios**: For making HTTP requests to the Sejda API.

- **axios-cookiejar-support**: To handle cookies for the Sejda API.

- **tough-cookie**: To handle cookies for the Sejda API.

- **pdf-lib**: For editing PDF metadata.

### Python Dependencies

- **PyPDF2**: For interacting with PDF files.

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
