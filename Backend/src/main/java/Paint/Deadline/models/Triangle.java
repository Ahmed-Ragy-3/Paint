package Paint.Deadline.models;


import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.helperClasses.Point;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Triangle extends Shape {

    public Triangle(String color , int strokeWidth , boolean draggable , Point p1 , Point p2 , Point p3)
    {
        super(color, strokeWidth, draggable);
        setP1(p1);
        setP2(p2);
        setP3(p3);
        setColor(color);
        setStrokeWidth(strokeWidth);
        setDraggable(draggable);
    }
    private Point p1;
    
    private Point p2;
    
    private Point p3;

    public static Triangle clone(Triangle triangle)
    {
        return new Triangle(triangle.color,
        triangle.getStrokeWidth(),
        triangle.isDraggable(),
        triangle.getP1(),
        triangle.getP2(),
        triangle.getP3());
    }
}
