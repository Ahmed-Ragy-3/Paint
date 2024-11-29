package Paint.Deadline.models;


import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Rectangle extends Shape {
    public Rectangle(String color , int strokeWidth , boolean draggable ,int opacity, double height , double width , double centerX , double centerY,String fillColor)
    {
        super(color, strokeWidth, draggable, opacity);
        setHeight(height);
        setWidth(width);
        setFill(fillColor);
        setCenterX(centerX);
        setCenterY(centerY);
    }

    private double height;
    private double width;
    private String fill;
    private double centerX;
    private double centerY;

    public static Rectangle clone(Rectangle rectangle)
    {
        return new Rectangle(
        rectangle.getStroke(),
        rectangle.getStrokeWidth(),
        rectangle.isDraggable(),
        rectangle.getOpacity(),
        rectangle.getHeight(),
        rectangle.getWidth(),
        rectangle.getCenterX(),
        rectangle.getCenterY(),
        rectangle.getFill());
    }
}
