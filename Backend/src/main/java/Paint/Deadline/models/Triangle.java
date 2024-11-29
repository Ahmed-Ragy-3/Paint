package Paint.Deadline.models;


import java.util.List;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.helperClasses.Point;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Triangle extends Shape {

    public Triangle(String color , int strokeWidth , boolean draggable ,int opacity, List<Point> points , String fillColor)
    {
        super(color, strokeWidth, draggable, opacity);
        setPoints(points);
        setFill(fillColor);
    }
    private List<Point> points;

    private String fill;

    public static Triangle clone(Triangle triangle)
    {
        return new Triangle(triangle.getStroke(),
        triangle.getStrokeWidth(),
        triangle.isDraggable(),
        triangle.getOpacity(),
        triangle.getPoints(),
        triangle.getFill());
    }
}
