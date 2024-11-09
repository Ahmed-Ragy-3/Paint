package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Circle extends Shape{

    private double radius;
    @Override
    public double area() {
        return Double.valueOf(Math.PI * Math.pow(radius, 2));
    }

}
