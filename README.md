## PDF-Bookmarks-Creator

A Node.js tool to edit PDF metadata and create bookmarks using Sejda API.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Bookmarks.json Format Guide](#bookmarksjson-format-guide)
  - [Explanation](#explanation)
  - [File Structure](#file-structure)
  - [Preview](#preview)
- [Dependencies](#dependencies)
- [License](#license)
- [Contributing](#contributing)

## Features

- Edit PDF metadata (title, author, subject) with ease.
- Create and manage bookmarks for PDFs, including hierarchical structures.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/rohityadav-sas/PDF-Bookmarks-Creator.git
   ```

2. Navigate to the project directory:

   ```sh
   cd PDF-Bookmarks-Creator
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

4. Prepare the configuration files according to the [Usage](#usage) section.

5. Run the program:

   ```sh
   npm start
   ```

## Usage

Place the required files in the input folder:

- **PDF file**: The PDF file for which you want to edit metadata and create bookmarks.
- **metadata.json**: Contains metadata such as title, author, and subject for the PDF. The format is as follows:

  ```json
  {
  	"title": "Sample PDF",
  	"author": "John Doe",
  	"subject": "Sample Subject"
  }
  ```

- **bookmarks.json**: Defines the bookmarks hierarchy (title, page numbers, and parent-child relationships).

## Bookmarks.json Format Guide

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
   - Sub-bookmarks within a child (level 3 or deeper) are not currently supported.

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

## Dependencies

- **axios**: For making HTTP requests to the Sejda API.

- **axios-cookiejar-support**: To handle cookies for the Sejda API.

- **tough-cookie**: To handle cookies for the Sejda API.

- **pdf-lib**: For editing PDF metadata.

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
