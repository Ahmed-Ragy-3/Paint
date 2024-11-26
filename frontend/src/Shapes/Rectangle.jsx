const rectangle = {
   type: 'Rectangle',
   draggable: false,
   id: 0,
   centerX: 0,
   centerY: 0,
   strokeWidth: 2,
   strokeColor: 'black',
   fill: 'blue',
   opacity: 1,
   width: 0,
   height: 0,

   onMouseUp: function(e, shapeDone, setShapeDone, data, setData, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      if(shapeDone) {
         setData([...data, currentShape]);
         setCurrentShape(null);
         setShapeDone(false)
      } else {
         let w = Math.abs(x - initialPoint[0]);
         setCurrentShape((prevShape) => ({
            ...prevShape,
            centerX: (initialPoint[0] + x) / 2,
            centerY: (initialPoint[1] + y) / 2,
            width: w,
            height: e.evt.shiftKey ? w : Math.abs(y - initialPoint[1])
         }));
         setShapeDone(true) 
      }
   },

   onMouseMove: function(e, shapeDone, setShapeDone, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let w = Math.abs(x - initialPoint[0]);
      setCurrentShape((prevShape) => ({
        ...prevShape,
        centerX: (initialPoint[0] + x) / 2,
        centerY: (initialPoint[1] + y) / 2,
        width: w,
        height: e.evt.shiftKey ? w : Math.abs(y - initialPoint[1])
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

export default rectangle