const line = {
   type: "Line",
   id: 0,
   draggable: false,
   points: [],
   strokeColor: "black",
   strokeWidth: 2,
   opacity: 1,

   onMouseMove: function(e, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [prevShape.points[0], prevShape.points[1], x, y],
      }));
   },

   onMouseDown: function(x, y, num) {
      this.id = num
      this.points = [x, y, x, y]

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
            points: [prevShape.points[0], prevShape.points[1], x, y],
         }));
      }
   }
}

export default line