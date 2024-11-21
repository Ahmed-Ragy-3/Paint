import { Rect, Text, Line, Ellipse } from 'react-konva';

function createShape(shape) {
   console.log(shape)
   switch (shape.type) {
      case "Ellipse":   return createEllipse(shape);
      case "Rectangle": return createRectangle(shape);
      case "Triangle":  return createTriangle(shape);
      case "Polygon":   return createPolygon(shape);
      case "Line":      return createLine(shape);
      case "Text":      return createText(shape);

      default: return null;
   }
}

export default createShape;

function createEllipse(shape) {
   return <Ellipse
      draggable
      x={shape.centerX}
      y={shape.centerY}
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      radiusX={shape.width}
      radiusY={shape.height}
   />
}
   
function createRectangle(shape) {
   return <Rect
      draggable
      x={shape.centerX}
      y={shape.centerY}
      strokeWidth={shape.strokeWidth}
      stroke={shape.strokeColor}
      fill={shape.fill}
      opacity={shape.opacity}
      height={shape.height}
      width={shape.width}
   />
}

function createTriangle(shape) {
  return<Line
      draggable
      points={shape.points}
      stroke={shape.strokeColor}
      strokeWidth={shape.strokeWidth}
      fill={shape.fill}
      opacity={shape.opacity}
      closed={true}
   />
}

function createText(shape) {
  return <Text
      draggable 
      text={shape.text}
      fontSize={shape.fontSize} 
      fill={shape.fill} 
      x={shape.centerX} 
      y={shape.centerY}
   />
}

function createPolygon(shape) {
  return <Line
      draggable
      points={shape.points}
      fill={shape.fill}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      closed={true}
   />
}

function createLine(shape) {
  return <Line
      draggable
      points={shape.points}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      lineJoin={shape.lineJoin}
      closed={shape.closed}
   />
}

