package Paint.Deadline.models;

import java.util.List;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.helperClasses.Point;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Polygon extends Shape {
    private List<Point> points;

    private boolean closed;

    private String fill;


    public Polygon(String stroke , int strokeWidth,boolean draggable , int opacity , boolean closed , String fill,  List<Point> points)
    {
        super(stroke, strokeWidth, draggable, opacity);
        setClosed(closed);
        setPoints(points);
        setFill(fill);
    }

    public static Polygon clone(Polygon polygon)
    {
        return new Polygon(
            polygon.getStroke(), 
            polygon.getStrokeWidth(), 
            polygon.isDraggable(), 
            polygon.getOpacity(), 
            polygon.isClosed(),
            polygon.getFill(), 
            polygon.getPoints());
    }
}