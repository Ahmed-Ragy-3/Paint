# Paint Project 🎨

Welcome to the Paint Project! This is a React-based drawing application that allows users to create various shapes, draw freely, and save or load their artwork. It's an intuitive and fun tool for anyone looking to explore digital creativity.

## Features ✨

### 1. **Drawing Tools**
   - **Free Draw**:
     - Allows users to draw freely on the canvas using a brush or pen tool.
     - Adjustable brush size and color.
   - **Shape Drawing**:
     - **Rectangle**: Draw rectangles with customizable dimensions, stroke, and fill color.
     - **Circle/Ellipse**: Draw perfect circles or ellipses with dynamic radius customization.
     - **Line**: Draw straight lines between two points.
     - **Polygon**: Create multi-sided shapes (e.g., triangle, pentagon).
     - Customizable properties for shapes:
       - Fill color
       - Border (stroke) color
       - Stroke width
     - Draggable and resizable shapes.

### 2. **Save & Load Artwork**
   - Save the current canvas as a JSON file to preserve all drawn shapes, colors, and properties.
   - Load a previously saved file to resume editing or view past projects.
   - Future-proof file format for long-term compatibility.

### 3. **Drag-and-Drop Support**
   - Drag existing shapes or objects around the canvas for repositioning.
   - Resize objects with handles at the edges or corners.

### 4. **Toolbar for Quick Access**
   - Intuitive toolbar UI to:
     - Select tools (free draw, rectangle, line, etc.).
     - Adjust brush size and shape properties (e.g., stroke and fill).
     - Eraser tool for clearing specific areas.
     - Clear the entire canvas with one click.

### 5. **Layer Management**
   - Users can:
     - Select individual objects (shapes or lines) for editing.
     - Change properties of selected objects (e.g., color, size).
     - Delete specific objects without affecting the rest of the drawing.

### 6. **Undo/Redo Functionality**
   - Undo recent actions to correct mistakes.
   - Redo undone actions for flexibility during edits.

### 7. **Export Options**
   - Export the canvas as:
     - JSON file (for project continuity).
     - XML file (for project continuity).

### 8. **Keyboard Shortcuts**
   - Common shortcuts for faster usage:
     - `Ctrl+Z`: Undo
     - `Ctrl+Y`: Redo
     - `Ctrl+S`: Save project
     - `Delete`: Remove selected object

## Installation 🚀

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ahmed-Ragy-3/Paint.git
   cd Paint/frontend
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Technologies Used 🛠️

- **Frontend**: React, react-konva
- **Styling**: CSS
- **State Management**: React state and hooks

## How to Use 🖌️

1. Open the app in your browser.
2. Select a drawing tool from the toolbar.
3. Customize colors, line thickness, and other settings.
4. Start drawing on the canvas!
5. Save your work or load a previously saved file.
