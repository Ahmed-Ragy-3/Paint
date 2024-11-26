const triangle = {
   type: 'Triangle',
   id: 0,
   draggable: false,
   points: [0, 0, 0, 0, 0, 0],
   strokeColor: 'black',
   strokeWidth: 2,
   fill: 'transparent',
   opacity: 1,
   moved: false, // Changed from a number to a boolean for clarity

   onMouseMove: function (
      e,
      shapeDone,
      setShapeDone,
      currentShape,
      setCurrentShape,
      initialPoint,
      secondPointDone,
      setSecondPointDone
   ) {
      const { x, y } = e.target.getStage().getPointerPosition();
      this.moved = true; // Mark as moved whenever the mouse moves

      if (!secondPointDone) {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], x, y, prevShape.points[4], prevShape.points[5]],
         }));
         console.log('Updating second point...');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         console.log('Updating third point...');
      }
   },

   onMouseUp: function (
      e,
      shapeDone,
      setShapeDone,
      data,
      setData,
      currentShape,
      setCurrentShape,
      initialPoint,
      secondPointDone,
      setSecondPointDone
   ) {
      const { x, y } = e.target.getStage().getPointerPosition();

      if (shapeDone) {
         this.moved = false; // Reset moved flag
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false);
         setSecondPointDone(false);
      } else if (!secondPointDone) {
         if (!this.moved) {
            console.log('Mouse did not move. No update needed.');
            return; // No action if the mouse didn't move
         }
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], x, y, prevShape.points[4], prevShape.points[5]],
         }));
         setSecondPointDone(true);
         console.log('Second point finalized.');
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
         console.log('Third point finalized.');
      }
   },

   onMouseDown: function (x, y, num) {
      this.points = [x, y, x, y, x, y];
      this.id = num;
      this.moved = false; // Reset moved flag on mouse down
      return this;
   },
};

export default triangle;
