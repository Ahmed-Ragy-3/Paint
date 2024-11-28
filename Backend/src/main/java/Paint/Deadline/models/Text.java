package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Text extends Shape {
    private String text;

    private String fill;

    private double centerX;

    private double centerY;
    public Text(String color , int strokeWidth , boolean draggable , int opacity , double centerX , double centerY , String fill , String text )
    {   
        super(color, strokeWidth, draggable, opacity);
        setCenterX(centerX);
        setCenterY(centerY);
        setText(text);
        setFill(fill);
    }

    public static Text clone(Text text)
    {
        return new Text(text.getStroke(), 
        text.getStrokeWidth(), 
        text.isDraggable(), 
        text.getOpacity(), 
        text.getCenterX(), 
        text.getCenterY(), 
        text.getFill(),
        text.getText());
    }
}
