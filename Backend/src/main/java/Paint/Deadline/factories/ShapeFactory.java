package Paint.Deadline.factories;
import java.util.ArrayList;

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
public class ShapeFactory {
    public Shape getInstance(String shapeType)
    {
        // System.out.println(shapeType);
        if (shapeType.equalsIgnoreCase("Rectangle"))
        {
            return new Rectangle("black" , 3 , false ,1, 0 , 0 ,0,0, "black");
        }
        else if (shapeType.equalsIgnoreCase("Ellipse"))
        {
            return new Ellipse("black" , 3 , false , 1,0 , 0 , 0 , 0,  "black");
        }
        else if (shapeType.equalsIgnoreCase("triangle"))
        {   
            return new Triangle("black" , 3 , false , 1,new ArrayList<>(), "black");
        }
        else if (shapeType.equalsIgnoreCase("Line"))
        {
            return new Line("black" , 3 , false,1 ,new ArrayList<>());
        }
        else if (shapeType.equalsIgnoreCase("Free"))
        {
            return new Free("black",3, false,1, new ArrayList<>());
        }
        else if (shapeType.equalsIgnoreCase("Polygon"))
        {
            return new Polygon("black", 3, false, 0, false,"black" ,new ArrayList<>());
        }
        else if (shapeType.equalsIgnoreCase("Text"))
        {
            return new Text("black", 0, false, 0, 0, 0, "black" , "");
        }
        else
        {
            throw new IllegalArgumentException("invalid shape type : " + shapeType); 
        }
        
    }
}
