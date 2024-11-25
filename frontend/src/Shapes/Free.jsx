const free = {
   type: "Free",
   id: 0,
   points: [],
   draggable: true,
   strokeColor: "black",
   strokeWidth: 5,
   opacity: 1,

   onMouseMove: function(e, setCurrentShape) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setCurrentShape((prevShape) => ({
         ...prevShape,
         points: [...prevShape.points, x, y],
      }));
   },

   onMouseDown: function(x, y, num) {
      this.id = num
      this.points = [x, y]

      return this
   }
}

export default free;