package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Ellipse extends Shape{

    private double radiusX;

    private double radiusY;

    private double centerX;

    private double centerY;

    private String fill;

    public Ellipse(String color, int strokeWidth, boolean draggable, int opacity, double radiusX , double radiusY , double centerX , double centerY , String fillColor) {
        super(color, strokeWidth, draggable, opacity); 
        setCenterX(centerX);
        setCenterY(centerY);
        setRadiusX(radiusX);
        setRadiusY(radiusY);
        setDraggable(draggable);
        setFill(fillColor);
    }

    public static Ellipse clone(Ellipse elipse) {
        return new Ellipse(elipse.getStroke(),
        elipse.getStrokeWidth(),
        elipse.isDraggable(),
        elipse.getOpacity(),
        elipse.getRadiusX(),
        elipse.getRadiusY(),
        elipse.getCenterX(),
        elipse.getCenterY(),
        elipse.getFill());

    }
}
