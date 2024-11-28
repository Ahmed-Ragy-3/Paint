package Paint.Deadline.prototypes;

import org.springframework.stereotype.Component;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.models.Ellipse;
import Paint.Deadline.models.Free;
import Paint.Deadline.models.Line;
import Paint.Deadline.models.Polygon;
import Paint.Deadline.models.Rectangle;
import Paint.Deadline.models.Text;
import Paint.Deadline.models.Triangle;

@Component
public class ShapePrototype {
    public Shape clone(Shape shape)
    {
        if (shape instanceof Ellipse)
        {
            return Ellipse.clone((Ellipse)shape);
        }
        if (shape instanceof Rectangle)
        {
            return Rectangle.clone((Rectangle)shape);
        }
        if (shape instanceof Triangle)
        {
            return Triangle.clone((Triangle)shape);
        }
        if (shape instanceof Line)
        {
            return Line.clone((Line)shape);
        }
        if(shape instanceof Free)
        {
            return Free.clone((Free)shape);
        }
        if(shape instanceof Polygon)
        {
            return Polygon.clone((Polygon)shape);
        }
        if(shape instanceof Text)
        {
            return Text.clone((Text)shape);
        }
        else
        {
            throw new IllegalArgumentException("Illegal Object was sent to the prototype");
        }
    }
}
