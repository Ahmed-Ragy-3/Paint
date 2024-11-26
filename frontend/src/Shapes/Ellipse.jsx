const ellipse = {
   type: 'Ellipse',
   draggable: false,
   id: 0,
   centerX: 0,
   centerY: 0,
   strokeWidth: 2,
   strokeColor: 'black',
   fill: 'transparent',
   opacity: 1,
   radiusX: 0,
   radiusY: 0,

   onMouseUp: function(e, shapeDone, setShapeDone, data, setData, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if(shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false)
      } else {
         let radX = Math.abs(x - initialPoint[0]);
         setCurrentShape((prevShape) => ({
            ...prevShape,
            radiusX: radX,
            radiusY: e.evt.shiftKey ? radX : Math.abs(y - initialPoint[1])
         }));
      }
   },

   onMouseMove: function(e, shapeDone, setShapeDone, currentShape, setCurrentShape, initialPoint, secondPointDone, setSecondPointDone) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let radX = Math.abs(x - initialPoint[0]);
      setCurrentShape((prevShape) => ({
         ...prevShape,
         radiusX: radX,
         radiusY: e.evt.shiftKey ? radX : Math.abs(y - initialPoint[1])
      }));
      setShapeDone(true)
   },

   onMouseDown: function(x, y, num) {
      this.centerX = x
      this.centerY = y
      this.id = num

      return this
   }
}

export default ellipse