package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.Data;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Square extends Shape {
    public Square(String color , int strokeWidth , boolean draggable , double side)
    {
        super(color, strokeWidth, draggable);
        setSide(side);
        setColor(color);
        setStrokeWidth(strokeWidth);
        setDraggable(draggable);
    }
    public double side;
    public static Square clone(Square square)
    {
        return new Square(square.getColor(),
        square.getStrokeWidth(),
        square.isDraggable(),
        square.getSide());
    }
}
