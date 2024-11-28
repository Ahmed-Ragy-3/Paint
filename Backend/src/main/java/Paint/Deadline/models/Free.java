package Paint.Deadline.models;

import java.util.List;
import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.helperClasses.Point;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Free extends Shape {

    private List<Point> points;

    public Free(String color , int strokewidth ,boolean draggable, int opacity , List<Point> points)
    {
        super(color, strokewidth, draggable , opacity);
        setPoints(points);
    }

    public static Free clone(Free freeDrawing)
    {
        return new Free(freeDrawing.getStroke(), freeDrawing.getStrokeWidth(),freeDrawing.isDraggable(),freeDrawing.getOpacity(),freeDrawing.getPoints());
    }
}
