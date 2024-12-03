package Paint.Deadline.models;

import java.util.List;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.helperClasses.Point;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Line extends Shape{
    private List<Object> points;

    public Line(String color , int strokeWidth , boolean draggable, int opacity ,List<Object> points)
    {
        super(color, strokeWidth, draggable, opacity);
        setPoints(points);
        setDraggable(draggable);
    }
    public static Line clone(Line line)
    {
        return new Line(line.getStroke(),
        line.getStrokeWidth(),
        line.isDraggable(),
        line.getOpacity(),
        line.getPoints());
    }
}
