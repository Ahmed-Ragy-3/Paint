const triangle = {
   type: 'Triangle',
   id: 0,
   draggable: false,
   points: [0, 0, 0, 0, 0, 0],
   strokeColor: 'black',
   strokeWidth: 2,
   fill: 'transparent',
   opacity: 1,

   onMouseMove: function(e, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [prevShape.points[0], prevShape.points[1], x, y, prevShape.points[4], prevShape.points[5]],
      }));
   },

   onMouseDown: function(x, y, num) {
      this.points[0] = x
      this.points[1] = y
      this.points[2] = x
      this.points[3] = y
      this.points[4] = x
      this.points[5] = y
      this.id = num

      return this
   },

   onMouseUp: function(e, shapeDone, setShapeDone, data, setData, currentShape, setCurrentShape) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if(shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false)
      } else {
         setCurrentShape((prevShape) => ({
            ...prevShape,
            points: [prevShape.points[0], prevShape.points[1], prevShape.points[2], prevShape.points[3], x, y],
         }));
      }
   }
}

export default triangle