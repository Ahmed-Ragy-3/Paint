package Paint.Deadline.models;


import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Rectangle extends Shape {
    public Rectangle(String color , int strokeWidth , boolean draggable , double length , double width )
    {
        super(color, strokeWidth, draggable);
        setLength(length);
        setWidth(width);
        setColor(color);
        setStrokeWidth(strokeWidth);
        setDraggable(draggable);
    }

    private double length;
    private double width;

    public static Rectangle clone(Rectangle rectangle)
    {
        return new Rectangle(rectangle.getColor(),
        rectangle.getStrokeWidth(),
        rectangle.isDraggable(),
        rectangle.getLength(),
        rectangle.getWidth());
    }
}
