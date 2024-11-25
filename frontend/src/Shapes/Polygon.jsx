const polygon = {
   type: 'Polygon',
   draggable: false,
   id: 0,
   points: [0, 0],
   strokeWidth: 4,
   strokeColor: 'black',
   opacity: 1,

   onMouseMove: function(setCurrentShape) {
      setCurrentShape((prevShape) => {
         const updatedPoints = [...prevShape.points];
     
         updatedPoints[updatedPoints.length - 2] = x;
         updatedPoints[updatedPoints.length - 1] = y;
     
         return {...prevShape, points: updatedPoints,};
      });
   },

   onMouseDown: function() {
      setCurrentShape(this)
   }
}