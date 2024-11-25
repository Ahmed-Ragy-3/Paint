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

   onMouseMove: function(e, currentShape, setCurrentShape, initialPoint) {
      const { x, y } = e.target.getStage().getPointerPosition();
      let radX = Math.abs(x - initialPoint[0]);
      setCurrentShape((prevShape) => ({
         ...prevShape,
         // centerX: (initialPoint[0] + x) / 2,
         // centerY: (initialPoint[1] + y) / 2,
         radiusX: radX,
         radiusY: e.evt.shiftKey ? radX : Math.abs(y - initialPoint[1])
      }));
   },

   onMouseDown: function(x, y, num) {
      this.centerX = x
      this.centerY = y
      this.id = num

      return this
   }
}

export default ellipse